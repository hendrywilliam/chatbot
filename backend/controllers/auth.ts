import "dotenv/config";
import url from "node:url";
import { User } from "../db/schema";
import type { Request, Response } from "express";
import { insertUser, getUserBySubID } from "../db/queries/users";
import { oauth2Client, OAuthScopes, generateRandomState } from "../utils/oauth";

export const oauthLogin = async function (req: Request, res: Response) {
    try {
        const state = generateRandomState();
        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: "online",
            scope: OAuthScopes,
            include_granted_scopes: true,
            state,
        });
        res.cookie("state", state, {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 10, // 10 mins.
        });
        res.redirect(authorizationUrl);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "internal server error",
        });
    }
};

export const oauthCallback = async function (req: Request, res: Response) {
    try {
        const q = url.parse(req.url, true).query;
        const _url = new URL(`${process.env.FRONTEND_BASE_URL!}`);
        if (q.error) {
            req.log.error("oauth error:", q.error);
            // Redirect back to login with error state.
            _url.searchParams.set("error", "true");
            _url.searchParams.set("error_description", "access_denied");
            return res.redirect(_url.toString());
        }
        // Check state
        const state = req.cookies.state;
        if (!q.state || !state || state !== q.state) {
            req.log.error("oauth error: invalid state.");
            _url.searchParams.set("error", "true");
            _url.searchParams.set("error_description", "internal_error");
            return res.redirect(_url.toString());
        }
        const { tokens } = await oauth2Client.getToken(q.code as string);
        oauth2Client.setCredentials(tokens);
        // Verify id token.
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
        });
        if (!ticket) {
            req.log.error("oauth error: no ticket.");
            _url.searchParams.set("error", "true");
            _url.searchParams.set("error_description", "internal_error");
            return res.redirect(_url.toString());
        }
        const payload = ticket.getPayload();
        if (!payload) {
            req.log.error("oauth error: no payload.");
            _url.searchParams.set("error", "true");
            _url.searchParams.set("error_description", "internal_error");
            return res.redirect(_url.toString());
        }
        let user: User | null;
        // Check user with sub as it is unique for a user.
        user = await getUserBySubID(payload.sub);
        if (!user) {
            user = await insertUser({
                email: payload.email || "",
                fullname: payload.name || "",
                image_url: payload.picture || "",
                sub: payload.sub,
            });
        }
        // Clear "cookie" state after verification.
        res.clearCookie("state");
        req.log.info(payload);
        return res.redirect(_url.toString());
    } catch (error) {
        req.log.error(error);
        res.end();
    }
};
