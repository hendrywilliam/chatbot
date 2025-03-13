import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIApiKey } from "./env";

export const genAI = new GoogleGenerativeAI(AIApiKey);
