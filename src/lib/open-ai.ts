import OpenAI from "openai";
import "dotenv/config";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

/** Plain lib from OpenAI */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/** Abstractions from LangChain */
export const embeddings = new OpenAIEmbeddings();
export const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
