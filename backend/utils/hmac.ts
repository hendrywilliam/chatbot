import crypto from "node:crypto";
import "dotenv/config";
import { hmacSecretkey } from "./env";

export const createHmac = function (data: string): string {
    const hash = crypto
        .createHmac("sha256", hmacSecretkey)
        .update(data)
        .digest("hex");
    return hash;
};
