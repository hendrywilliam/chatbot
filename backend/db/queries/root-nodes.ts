import { sql, eq } from "drizzle-orm";
import { db } from "../../utils/db";
import { NewRootNode, nodes, rootNodes, users } from "../schema";

export const insertRootNode = async function (rootNode: NewRootNode) {
    try {
        return await db.insert(rootNodes).values(rootNode).returning();
    } catch (error) {
        throw error;
    }
};

export const updateRootNode = async function (rootNode: Partial<NewRootNode>) {
    try {
        return (
            await db
                .update(rootNodes)
                .set({
                    ...(rootNode.user_id && {
                        user_id: rootNode.user_id,
                    }),
                    ...(rootNode.is_public && {
                        is_public: rootNode.is_public,
                    }),
                    updated_at: sql`NOW()`,
                })
                .returning()
        )[0];
    } catch (error) {
        throw error;
    }
};

// Page size is limit row returned. (e.g. [10, 20, 30, 40, 50])
// Page is offset. (e.g. 1 -> 0 to 10)
export const getRootNode = async function (
    id: number,
    pageSize: number = 10,
    page: number = 1
) {
    try {
        return await db
            .select() // @todo: return partial fields.
            .from(rootNodes)
            .leftJoin(nodes, eq(rootNodes.id, nodes.root_id))
            .where(eq(rootNodes.id, id))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    } catch (error) {
        throw error;
    }
};
