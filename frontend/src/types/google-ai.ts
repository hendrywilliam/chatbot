import type { Part } from "@google/generative-ai"

type POSSIBLE_ROLES = "user" | "model" | "function" | "system"

export type CompletionMessageContent = {
    role: POSSIBLE_ROLES,
    parts: Part[]
}

export type CompletionMessage = {
    contents: CompletionMessageContent[]
}