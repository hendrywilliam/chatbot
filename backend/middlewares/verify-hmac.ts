import type { Request, Response, NextFunction } from "express";
import { createHmac } from "../utils/hmac";
import crypto from "node:crypto";

export const thouShallVerifyHMAC = function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const auth = req.headers["x-auth"];
        if (!auth) {
            throw new Error("No auth provided");
        }
        const mac = createHmac(
            `${req.method.toUpperCase()}|${req.originalUrl}|${JSON.stringify(
                req.body
            )}`
        );
        const equal = crypto.timingSafeEqual(
            Buffer.from(mac),
            Buffer.from(auth as string)
        );
        if (!equal) {
            throw new Error("Mac is not equal.");
        }
        console.log("is equal");
        next();
    } catch (error: unknown) {
        req.log.error((error as Error).message ?? "Something went wrong.");
        res.status(403).json({
            message: "Not authenticated.",
        });
    }
};
