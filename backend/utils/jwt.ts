import jwt from "jsonwebtoken";
import "dotenv/config";

const PUBLIC_KEY = process.env.PUBLIC_KEY!.replace(/\\n/g, "\n");
const PRIVATE_KEY = process.env.PRIVATE_KEY!.replace(/\\n/g, "\n");

export const sign = function (payload: Record<string, string>) {
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

export const verify = function (signedToken: string) {
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
