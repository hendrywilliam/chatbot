import { useRef, useTransition, useState, useEffect, useCallback } from "react";
import type {
  ChatCompletionModelSettings,
  Message,
  UseChatHelpers,
} from "@/types";
import { nanoid } from "nanoid";
import { decode } from "@/lib/utils";
import { OpenAIStreamOutput } from "@/types/open-ai";

export function useChat(): UseChatHelpers {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isPending, startTransition] = useTransition();

  const [modelSettings, setModelSettings] =
    useState<ChatCompletionModelSettings>({
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 500,
      top_p: 1,
      presence_penalty: 0,
    });

  const [messages, setMessages] = useState<Message[]>([]);

  /** Contains messages that are persist between render snapshots. */
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const triggerRequest = useCallback(
    async (requestMessage: Message) => {
      /** Append new messages into message[]. */
      setMessages([...messages, { ...requestMessage }]);

      /** Response identifier for mutation. */
      const responseId = nanoid();

      const now = new Date();

      /** Construct response message object. */
      const responseMessage = {
        id: responseId,
        role: "assistant",
        content: "",
        createdAt: now,
      } satisfies Message;

      messagesRef.current = [...messagesRef.current, requestMessage];

      setMessages((messages) => [...messages, { ...responseMessage }]);

      setIsLoading(true);

      /** Attach controller to control the fetching process. */
      abortControllerRef.current = new AbortController();

      startTransition(async () => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({
              model: modelSettings.model ?? "gpt-3.5-turbo",
              messages: messagesRef.current.map((item) => {
                return {
                  role: item.role,
                  content: item.content,
                };
              }),
              temperature: modelSettings.temperature ?? 1,
              stream: true,
              max_tokens: modelSettings.max_tokens ?? 500,
              top_p: modelSettings.top_p ?? 1,
              presence_penaly: modelSettings.presence_penalty ?? 0,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            signal: abortControllerRef.current?.signal,
          });

          const decoder = decode();

          if (!response.ok) {
            setIsLoading(false);
          }

          const body = response.body as ReadableStream;
          const reader = body.getReader();
          let responseText = "";

          while (true) {
            if (reader) {
              const { done, value } = await reader.read();
              if (done) {
                setIsLoading(false);
                break;
              }

              const decodedValue = decoder(value) as string;

              decodedValue
                .split("\n")
                /** There is an empty string appended after splitting. Need to get rid of it.*/
                .filter((value) => Boolean(value))
                .map((item) => JSON.parse(item))
                .forEach((item: OpenAIStreamOutput) => {
                  if ("content" in item.choices[0].delta) {
                    responseText += item.choices[0].delta.content;
                  }
                  return;
                });
              setMessages(
                messagesRef.current.map((item) => {
                  if (item.id == responseId) {
                    item.content = responseText;
                    return item;
                  }
                  return item;
                }),
              );
            }
          }
        } catch (error) {
          switch (true) {
            case error instanceof DOMException && error.name === "AbortError":
              setIsLoading(false);
              break;
            default:
              setIsLoading(false);
          }
        }
      });
    },
    //eslint-disable-next-line
    [input, messages],
  );

  /** Trigger Fetch and append a message to Message[] */
  const append = useCallback(
    (requestMessage: Message) => {
      if (!requestMessage.id) {
        requestMessage.id = nanoid();
      }

      triggerRequest(requestMessage);
    },
    // eslint-disable-next-line
    [messages, triggerRequest],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, input: string) => {
      e.preventDefault();
      const id = nanoid();
      const now = new Date();
      const requestMessage = {
        id,
        content: input,
        role: "user",
        createdAt: now,
      } satisfies Message;

      append(requestMessage);

      setInput("");
    },
    //eslint-disable-next-line
    [input, setInput, append],
  );

  /** A trigger to stop stream. It will gives a signal to server, then stop streaming. */
  const triggerStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("Stream request aborted by user.");
    }
    return;
  }, []);

  const clearChats = useCallback(() => {
    if (isLoading) {
      triggerStop();
    }
    setMessages([]);
    return;
  }, [isLoading, triggerStop]);

  const regenerateResponse = useCallback(() => {
    if (messagesRef.current.length === 0) return;

    const lmAssistant = messagesRef.current[messagesRef.current.length - 1];

    if (lmAssistant.role === "assistant") {
      messagesRef.current = messagesRef.current.slice(0, -1);
    }

    const lmUser = messagesRef.current[messagesRef.current.length - 1];
    if (lmUser.role === "user") {
      /** Create a new request message and append. */
      const now = new Date();
      const id = nanoid();

      const requestMessage = {
        id,
        role: "user",
        content: lmUser.content,
        createdAt: now,
      } satisfies Message;

      triggerRequest(requestMessage);
    }
    return;
  }, [triggerRequest]);

  return {
    triggerRequest,
    messages,
    isLoading,
    setIsLoading,
    handleSubmit,
    input,
    setInput,
    triggerStop,
    clearChats,
    regenerateResponse,
    modelSettings,
    setModelSettings,
  };
}
