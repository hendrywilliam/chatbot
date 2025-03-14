import type { Request, Response, NextFunction, RequestHandler } from "express";

type _options = {
    "Access-Control-Allow-Origin": string[] | string;
    "Access-Control-Allow-Methods": string[] | string;
    "Access-Control-Allow-Headers": string[] | string;
    "Access-Control-Allow-Credentials": string;
};

/**
 * Accept pre-flighted request from any origin.
 * Source: https://fetch.spec.whatwg.org/#http-cors-protocol
 */

export const cors = function (options?: _options): RequestHandler {
    const allowedMethods = new Map([
        ["DELETE", true],
        ["GET", true],
        ["OPTIONS", true],
        ["POST", true],
    ]);
    const allowedOrigins = new Map([["http://localhost:3001", true]]);
    if (!options || Object.entries(options).length === 0) {
        /** Set default value */
        options = {
            /**
             * Indicates whether the response can be shared, via returning the literal
             * value of the "Origin" request header (which can be null) or "*" / wildcard in a response
             * NOTE: Any preflighted request will be blocked by the browser.
             */
            "Access-Control-Allow-Origin": Array.from(allowedOrigins.keys()),
            /**
             * Indicates which methods are supported by the response URL
             * for the purposes of the CORS protocol.
             */
            "Access-Control-Allow-Methods": Array.from(allowedMethods.keys()),
            /**
             * Indicate which headers are supported by the response's URL for the purposes of the CORS protocol.
             */
            "Access-Control-Allow-Headers": [
                "Content-Type",
                "Authorization",
                "X-Requested-With",
            ],
            /**
             * Indicates whether or not the actual request can be made using credentials.
             * (e.g. HTTPCookie, Authentication Header.)
             * Value: "true" | "false"
             */
            "Access-Control-Allow-Credentials": "true",
        };
    }
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            /**
             * Response to pre-flight request.
             * NOTE: Preflighted request always include: OPTIONS, real request headers and real request method.
             */
            const actualReqMethod = req.headers[
                "access-control-request-method"
            ] as string | undefined;
            const actualOrigin = req.headers.origin;
            if (req.method === "OPTIONS") {
                if (!actualReqMethod || !allowedMethods.has(actualReqMethod)) {
                    throw new Error(
                        "method is not allowed. rejecting pre-flight request."
                    );
                }
                if (!actualOrigin || !allowedOrigins.has(actualOrigin)) {
                    throw new Error(
                        "origin is not allowed. rejecting pre-flight request."
                    );
                }
                Object.entries(options).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        res.setHeader(key, value.join(", "));
                        return;
                    }
                    res.setHeader(key, value);
                    return;
                });
                res.sendStatus(204);
                return;
            }
            next();
        } catch (error: unknown) {
            if (error) {
                res.log.error(error);
            }
            res.sendStatus(403);
        }
    };
};
