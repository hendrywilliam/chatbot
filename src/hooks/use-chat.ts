import * as React from "react";
import type { Message, UseChatHelpers } from "@/types";
import { nanoid } from "nanoid";
import { decode } from "@/lib/utils";
import { OpenAIStreamOutput } from "@/types/open-ai";

export function useChat(): UseChatHelpers {
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const [messages, setMessages] = React.useState<Message[]>([]);

  //this contains messages that are persist between render
  const messagesRef = React.useRef<Message[]>([]);

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [input, setInput] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  //trigger request
  const triggerRequest = React.useCallback(
    async (requestMessage: Message) => {
      //concat latest request into messages[]
      setMessages([...messages, { ...requestMessage }]);

      //we need this to mutate the message content later.
      const responseId = nanoid();

      const now = new Date();

      //create response
      const responseMessage = {
        id: responseId,
        role: "assistant",
        content: "",
        createdAt: now,
      } satisfies Message;

      messagesRef.current = [...messagesRef.current, requestMessage];

      setMessages((messages) => [...messages, { ...responseMessage }]);

      setIsLoading(true);

      //attach controller
      abortControllerRef.current = new AbortController();

      startTransition(async () => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: messagesRef.current.map((item) => {
                return {
                  role: item.role,
                  content: item.content,
                };
              }),
              temperature: 0,
              stream: true,
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
                })
              );
            }
          }
        } catch (err) {
          switch (err) {
            case err instanceof Error && err.name === "AbortError": {
              setIsLoading(false);
            }
          }
        }
      });
    },
    //eslint-disable-next-line
    [input, messages]
  );

  //append
  const append = React.useCallback(
    (requestMessage: Message) => {
      if (!requestMessage.id) {
        requestMessage.id = nanoid();
      }

      triggerRequest(requestMessage);
    },
    //eslint-disable-next-line
    [messages, triggerRequest]
  );

  const handleSubmit = React.useCallback(
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
    [input, setInput, append]
  );

  //trigger stop
  const triggerStop = React.useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    return;
  }, []);

  const clearChats = React.useCallback(() => {
    if (isLoading) {
      triggerStop();
    }
    setMessages([]);
    return;
  }, [isLoading, triggerStop]);

  const regenerateResponse = React.useCallback(() => {
    if (messagesRef.current.length === 0) return;

    const lmAssistant = messagesRef.current[messagesRef.current.length - 1];

    if (lmAssistant.role === "assistant") {
      messagesRef.current = messagesRef.current.slice(0, -1);
    }

    const lmUser = messagesRef.current[messagesRef.current.length - 1];
    if (lmUser.role === "user") {
      //create a new request with different id
      //no need to duplicate
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
  };
}
