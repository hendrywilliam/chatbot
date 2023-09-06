import * as React from "react";

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

export interface UseChatHelpers {
  //use this to trigger request (fetch)
  triggerRequest: (requestMessage: Message) => Promise<void>;

  //messages is a list of message, each of it contains role, id, content, and the time
  //that it was created.
  messages: Message[];

  //setter function for isLoading
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  //this indicates whether the fetching or streaming is processing or not.
  //this also an indicator to show regenerate button and stop button in chat panel.
  isLoading: boolean;

  //handler for submit
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, input: string) => void;

  //user prompt
  input: string;

  //setter function for input
  setInput: React.Dispatch<React.SetStateAction<string>>;

  //this is a handler to stop current connection
  triggerStop: () => void;
}
