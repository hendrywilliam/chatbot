import type { Request, Response } from "express";
import { getUserById } from "../db/queries/users";
import type { ChatbotJWTClaims } from "../utils/jwt";
import { redisClient } from "../utils/redis";
import type { User } from "../db/schema";

export const getUserProfile = async function (req: Request, res: Response) {
    try {
        // @ts-expect-error: no "user" in req properties. its user defined property.
        const localUser = req.user as ChatbotJWTClaims | undefined;
        if (!localUser) {
            throw new Error("no data");
        }
        // Check in redis.
        let user: User | null = null;
        const userCache = await redisClient.get(`user:${localUser.sub}`);
        if (userCache) {
            user = JSON.parse(userCache) as User;
        } else {
            user = await getUserById(parseInt(localUser.sub, 10));
            if (!user) {
                throw new Error("user not found");
            }
            await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
                EX: 3600,
            });
        }
        res.status(200).json({
            message: "user profile found",
            data: {
                email: user?.email || "",
                image_url: user?.image_url || "",
                fullname: user?.fullname || "",
            },
        });
    } catch (error: unknown) {
        req.log.error(error);
        res.status(400).json({
            message: "internal server error",
        });
    }
};
