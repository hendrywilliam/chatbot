import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export type CompletionRequest = {
    messages: Array<ChatCompletionMessageParam>;
};
