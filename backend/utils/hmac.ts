import crypto from "node:crypto";
import "dotenv/config";

export const createHmac = function (data: string): string {
    const hash = crypto
        .createHmac("sha256", process.env.HMAC_SECRET_KEY as string)
        .update(data)
        .digest("hex");
    return hash;
};
