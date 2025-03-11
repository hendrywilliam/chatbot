import { relations } from "drizzle-orm";
import {
    pgTable,
    integer,
    varchar,
    text,
    timestamp,
    boolean,
    uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    sub: varchar({ length: 100 }),
    fullname: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    image_url: text().default(""),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ many }) => ({
    rootNode: many(rootNodes),
}));

export const rootNodes = pgTable("root_nodes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: uuid().defaultRandom(),
    is_public: boolean().default(false),
    user_id: integer(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
});

export type RootNode = typeof rootNodes.$inferSelect;
export type NewRootNode = typeof rootNodes.$inferInsert;

export const rootNodesRelations = relations(rootNodes, ({ one, many }) => ({
    user: one(users, {
        fields: [rootNodes.user_id],
        references: [users.id],
    }),
    node: many(nodes),
}));

export const nodes = pgTable("nodes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: uuid().defaultRandom(),
    root_id: integer(),
    content: text().default(""),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
});

export type Node = typeof nodes.$inferSelect;
export type NewNode = typeof nodes.$inferInsert;

export const nodesRelations = relations(nodes, ({ one }) => ({
    rootNode: one(rootNodes, {
        fields: [nodes.root_id],
        references: [rootNodes.id],
    }),
}));
