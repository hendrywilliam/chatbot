import "dotenv/config";

export const hmacSecretkey = process.env.HMAC_SECRET_KEY!;
export const AIApiKey = process.env.AI_API_KEY!;
export const databaseURL = process.env.DATABASE_URL!;
export const googleOAuthClientID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
export const googleOAuthClientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;
export const googleOAuthClientRedirectURI =
    process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI!;
export const frontendBaseURL = process.env.FRONTEND_BASE_URL!;
export const publicKey = process.env.PUBLIC_KEY!;
export const privateKey = process.env.PRIVATE_KEY!;
