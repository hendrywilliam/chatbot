import "dotenv/config";
import url from "node:url";
import { User } from "../db/schema";
import { sign } from "../utils/jwt";
import { addSearchParams } from "../utils/url";
import type { Request, Response } from "express";
import { insertUser, getUserById, getUserBySub } from "../db/queries/users";
import { frontendBaseURL, googleOAuthClientID } from "../utils/env";
import { oauth2Client, OAuthScopes, generateRandomState } from "../utils/oauth";
import { verify } from "../utils/jwt";

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

export const validateAuth = async function (req: Request, res: Response) {
    try {
        const signedToken = req.cookies.token;
        if (!signedToken) {
            throw new Error("invalid auth: no token provided");
        }
        await verify(signedToken);
        res.cookie("isLoggedIn", 1, {
            secure: false,
            httpOnly: true,
        });
    } catch (error) {
        req.log.error(error);
        res.cookie("isLoggedIn", 0, {
            secure: false,
            httpOnly: true,
        });
        res.status(401).json({
            code: 401,
            message: "Not authorized.",
        });
    }
};

export const oauthCallback = async function (req: Request, res: Response) {
    try {
        const q = url.parse(req.url, true).query;
        const _url = new URL(`${frontendBaseURL}`);
        if (q.error) {
            res.clearCookie("state");
            req.log.error("oauth error:", q.error);
            // Redirect back to login with error state.
            addSearchParams(_url, {
                error: "true",
                error_description: "access_denied",
            });
            return res.redirect(_url.toString());
        }
        // Check state
        const state = req.cookies.state;
        if (!q.state || !state || state !== q.state) {
            res.clearCookie("state");
            req.log.error("oauth error: invalid state.");
            addSearchParams(_url, {
                error: "true",
                error_description: "internal_error",
            });
            return res.redirect(_url.toString());
        }
        const { tokens } = await oauth2Client.getToken(q.code as string);
        oauth2Client.setCredentials(tokens);
        // Verify id token.
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: googleOAuthClientID,
        });
        if (!ticket) {
            req.log.error("oauth error: no ticket.");
            res.clearCookie("state");
            addSearchParams(_url, {
                error: "true",
                error_description: "internal_error",
            });
            return res.redirect(_url.toString());
        }
        const payload = ticket.getPayload();
        if (!payload) {
            req.log.error("oauth error: no payload.");
            res.clearCookie("state");
            addSearchParams(_url, {
                error: "true",
                error_description: "internal_error",
            });
            return res.redirect(_url.toString());
        }
        let user: User | null;
        // Check user with sub as it is unique for a user.
        user = await getUserBySub(payload.sub);
        if (!user) {
            user = await insertUser({
                email: payload.email || "",
                fullname: payload.name || "",
                image_url: payload.picture || "",
                sub: payload.sub,
            });
        }
        // Clear "state" cookie after verification.
        res.clearCookie("state");
        // Sign jwt token with some claims including sub claim that refer to end-user.
        const token = await sign({
            sub: user.id.toString(),
            email: user.email,
            fullname: user.fullname,
        });
        res.cookie("isLoggedIn", 1, {
            secure: false,
            httpOnly: true,
        });
        res.cookie("token", token, {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 24 hours.
        });
        return res.redirect(_url.toString());
    } catch (error) {
        req.log.error(error);
        res.end();
    }
};
