import type { ChatCompletionCreateParams } from "openai/resources/index.mjs";
import type { Dispatch, FormEvent, SVGProps, SetStateAction } from "react";

export type Message = {
  id: string;
  createdAt?: Date;
  content: string;
  role: "system" | "user" | "assistant" | "function";
};

export interface UseChatOptions {
  api: string;
}

export interface ChatRequest {
  messages: Message[];
  body: object;
  headers: Record<string, string>;
}

export interface Models {
  label: string;
  value: string;
  author: string;
  description: string;
  href: string[];
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface ChatCompletionModelSettings
  extends Omit<ChatCompletionCreateParams, "messages"> {}

export interface UseChatHelpers {
  /** Is basically a fetch. */
  triggerRequest: (requestMessage: Message) => Promise<void>;

  /** Array of objects, each message contain role, content, date, and its id. */
  messages: Message[];

  /** Setter function for isLoading. */
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;

  /** This is indicates whether the fetching/streaming is processing or not. */
  isLoading: boolean;

  /** Handler for trigger fetching from network. */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;

  /** Value from prompt form. */
  input: string;

  /** Setter function for form input. */
  setInput: Dispatch<SetStateAction<string>>;

  /** Handler to stop asynchronous process (fetching data from network and stop the stream). */
  triggerStop: () => void;

  /** Clear recent chats. */
  clearChats: () => void;

  /** Re-generate last response, including the request message. */
  regenerateResponse: () => void;

  /** Setter function for llm settings. */
  setModelSettings: Dispatch<SetStateAction<ChatCompletionModelSettings>>;

  /** Value for llm settings. */
  modelSettings: ChatCompletionModelSettings;
}

export interface UsePdfChatHelpers {
  /** Setter function for pdf file input. */
  setFile: Dispatch<SetStateAction<File | null>>;

  /** Corresponding pdf file. */
  file: File | null;

  /** Setter function for prompt value. */
  setPrompt: Dispatch<SetStateAction<string>>;

  /** Value for prompt form. */
  prompt: string;

  /** Submit form data handler. */
  triggerRequest: ({
    requestMessage,
  }: {
    requestMessage: Message;
  }) => Promise<void>;

  /** A setter function to clear prompt input value. */
  clearPromptInput: () => void;

  /** A trigger to handle submit, this will trigger sequence functions call. */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;

  /** Collection of message from user or assistant. */
  messages: Message[];

  setMessages: Dispatch<SetStateAction<Message[]>>;
}
