import { google } from "googleapis";
import crypto from "node:crypto";
import "dotenv/config";
import {
    googleOAuthClientID,
    googleOAuthClientRedirectURI,
    googleOAuthClientSecret,
} from "./env";

// Mitigating cross-site request forgery using random state.
export const generateRandomState = function (): string {
    return crypto.randomBytes(32).toString("hex");
};

export const oauth2Client = new google.auth.OAuth2(
    googleOAuthClientID,
    googleOAuthClientSecret,
    googleOAuthClientRedirectURI
);

export const OAuthScopes = ["email", "openid", "profile"];
