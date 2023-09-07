import * as React from "react";
import type { Message, UseChatHelpers } from "@/types";
import { nanoid } from "nanoid";
import { decode } from "@/lib/utils";

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
      //every day above ground is a great day, remember that :)
      const now = new Date();

      //create response
      const responseMessage = {
        id: responseId,
        role: "assistant",
        content: "",
        createdAt: now,
      } satisfies Message;

      setMessages((messages) => [...messages, { ...responseMessage }]);

      setIsLoading(true);

      //attach controller
      abortControllerRef.current = new AbortController();

      startTransition(async () => {
        try {
          const request = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: requestMessage.content,
                  },
                ],
                temperature: 0,
                stream: true,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              },
              signal: abortControllerRef.current?.signal,
            }
          );
          const decoder = decode();

          if (!request.ok) {
            setIsLoading(false);
          }

          const response = request.body as ReadableStream;

          const reader = response.getReader();

          let responseText = "";

          while (true) {
            if (reader) {
              const { done, value } = await reader?.read();
              if (done) {
                setIsLoading(false);
                break;
              }

              const decodedValue = decoder(value) as string;
              decodedValue
                .replace(/^data: /gm, "")
                .split("\n\n")
                .filter((item) => item !== "" && item !== "[DONE]")
                .map((item) => JSON.parse(item))
                .forEach((item) => {
                  if ("content" in item.choices[0].delta) {
                    responseText += item.choices[0].delta?.content as string;
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
          if (err instanceof Error) {
            if (err.name === "AbortError") {
              //abort a signal will cause an error.
              //not necessary to show it in client
              //since it doesnt give an impact to any aspect.
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
    if (messagesRef.current.length < 0) return;

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
