import { NewUser, User, users } from "../schema";
import { db } from "../../utils/db";
import { eq } from "drizzle-orm";

export const insertUser = async function (newUser: NewUser): Promise<User> {
    try {
        return (await db.insert(users).values(newUser).returning())[0];
    } catch (error) {
        throw error;
    }
};

export const getUserBySubID = async function (
    sub: string
): Promise<User | null> {
    try {
        return (
            await db.select().from(users).limit(1).where(eq(users.sub, sub))
        )[0];
    } catch (error) {
        throw error;
    }
};
