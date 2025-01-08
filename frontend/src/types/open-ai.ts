import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export interface ChoicesObject {
  index: number;
  delta: DeltaObject[];
}

export interface DeltaObject {
  content: string;
}

export interface OpenAIStreamOutput {
  id: string;
  object: string;
  created: number;
  model:
    | "gpt-4"
    | "gpt-4-0314"
    | "gpt-4-32k"
    | "gpt-4-0613"
    | "gpt-4-0125-preview"
    | "gpt-4-turbo-preview"
    | "gpt-4-1106-preview"
    | "gpt-4-vision-preview"
    | "gpt-4-32k-0314"
    | "gpt-4-32k-0613"
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-16k"
    | "gpt-3.5-turbo-0301"
    | "gpt-3.5-turbo-0613"
    | "gpt-3.5-turbo-1106"
    | "gpt-3.5-turbo-0125"
    | "gpt-3.5-turbo-16k-0613";
  choices: ChoicesObject[];
  system_fingerprint: string;
  logprobs: unknown;
  finish_reason: null | string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "function";
  content: string;
}

export interface ChatRequestBody {
  model: OpenAIStreamOutput["model"];
  messages: ChatCompletionMessageParam[];
  temperature: number;
  stream: boolean;
  max_tokens: number;
  top_p: number;
  presence_penalty: number;
}
