import { prisma } from "./prisma";
import { embeddings } from "./open-ai";
import { Prisma, Document } from "@prisma/client";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";

export const vectorStore = PrismaVectorStore.withModel<Document>(prisma).create(
  embeddings,
  {
    prisma: Prisma,
    tableName: "Document",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  },
);
