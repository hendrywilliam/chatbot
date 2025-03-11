import { db } from "../../utils/db";
import { NewNode, nodes } from "../schema";

export const insertNode = async function (newNode: NewNode) {
    try {
        return (await db.insert(nodes).values(newNode).returning())[0];
    } catch (error) {
        throw error;
    }
};
