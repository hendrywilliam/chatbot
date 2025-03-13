import type { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const verifyJWTTokenMiddleware = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const signedToken = req.cookies.token;
        if (!signedToken) {
            throw new Error("no token provided.");
        }
        const decodedToken = (await verify(signedToken)) as JwtPayload;
        // @ts-expect-error: no "user" property in req object.
        req.user = decodedToken;
        next();
    } catch (error) {
        req.log.error(error);
        res.status(401).json({
            message: "Not authenticated.",
        });
    }
};
