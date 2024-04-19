import { type ClassValue, clsx } from "clsx";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { Message } from "@/types";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decode() {
  const decoder = new TextDecoder("utf8");
  return function (chunk: Uint8Array | undefined) {
    if (typeof chunk === "undefined") return;
    return decoder.decode(chunk);
  };
}

export function getEntriesFormData<T = Record<string, any>>(
  formData: FormData,
): T {
  const keyValuePair: Record<string, any> = {};
  for (const pair of formData.entries()) {
    keyValuePair[pair[0]] = pair[1];
  }
  return keyValuePair as T;
}

export function truncate(text: string, threshold: number = 10) {
  return text.length > threshold
    ? text.substring(0, threshold + 1) + "..."
    : text;
}

/** Generate chat history that uses appropriate format for the chain. */
export function generateChatHistory(messages: Message[]): BaseMessage[] {
  if (messages.length === 0) {
    return [];
  }

  return messages.map((message) => {
    return message.role === "user"
      ? new HumanMessage(message.content)
      : new AIMessage(message.content);
  });
}

export function catchError(err: unknown) {
  const unknownError = "Something went wrong please try again later.";
  if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0].longMessage ?? unknownError);
  }
  if (err instanceof z.ZodError) {
    return toast.error(err.issues[0].message);
  }
  if (err instanceof Error) {
    return toast.error(err.message);
  }
  return toast.error(unknownError);
}
