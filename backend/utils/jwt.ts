import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { publicKey, privateKey } from "./env";

const PUBLIC_KEY = publicKey.replace(/\\n/g, "\n");
const PRIVATE_KEY = privateKey.replace(/\\n/g, "\n");

// Extending default jwt claims.
export interface ChatbotJWTClaims extends JwtPayload {
    email: string;
    fullname: string;
    image_url: string;
    sub: string;
}

export const sign = async function (payload: Record<string, string>) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            payload,
            PRIVATE_KEY,
            { algorithm: "RS256", expiresIn: "24h" },
            (error, encoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(encoded);
                }
            }
        );
    });
};

export const verify = async function (signedToken: string) {
    return new Promise(function (resolve, reject) {
        jwt.verify(
            signedToken,
            PUBLIC_KEY,
            { algorithms: ["RS256"] },
            (err, decode) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decode);
                }
            }
        );
    });
};
