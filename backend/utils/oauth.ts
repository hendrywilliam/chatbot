import { google } from "googleapis";
import crypto from "node:crypto";
import "dotenv/config";

// Mitigating cross-site request forgery using random state.
export const generateRandomState = function (): string {
    return crypto.randomBytes(32).toString("hex");
};

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID!,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI!
);

export const OAuthScopes = ["email", "openid", "profile"];
