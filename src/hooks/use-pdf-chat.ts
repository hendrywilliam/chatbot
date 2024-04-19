/* eslint-disable react-hooks/exhaustive-deps */

import { Message, UsePdfChatHelpers } from "@/types";
import { nanoid } from "nanoid";
import { FormEvent, useCallback, useRef, useState, useEffect } from "react";
import { decode } from "@/lib/utils";

export function usePdfChat(): UsePdfChatHelpers {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;

    return () => {};
  }, [messages]);

  const triggerRequest = async function () {
    const formData = constructFormData();
    const now = new Date();
    const responseId = nanoid();

    const responseMessage = {
      content: "",
      id: responseId,
      role: "assistant",
      createdAt: now,
    } satisfies Message;

    messagesRef.current = [...messages, { ...responseMessage }];

    setMessages((messages) => [...messages, { ...responseMessage }]);

    try {
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      const response = await fetch("/api/chat-pdf", {
        body: formData,
        method: "POST",
        signal: abortControllerRef.current.signal,
      });

      const decoder = decode();
      const body = response.body as ReadableStream;
      const reader = body.getReader();

      let accumulatedText = "";

      while (true) {
        if (reader) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          const decodedValue = decoder(value) as string;
          decodedValue
            .split("\n")
            .filter((item) => Boolean(item))
            .map((item) => {
              const parsedItem = JSON.parse(item);
              return parsedItem.answer;
            })
            .forEach((item) => {
              accumulatedText += item;
            });

          setMessages((messages) => {
            return messages.map((message) => {
              if (message.id === responseId) {
                message.content = accumulatedText;
                return message;
              }
              return message;
            });
          });
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const constructFormData = useCallback(() => {
    const formData = new FormData();

    if (!prompt) {
      throw new Error("Prompt is not provided.");
    }
    formData.append("prompt", prompt);
    formData.append("messages", JSON.stringify(messagesRef.current ?? []));

    return formData;
  }, [prompt]);

  const appendMessage = function (requestMessage: Message) {
    if (!requestMessage.id) {
      requestMessage.id = nanoid();
    }
    messagesRef.current = [...messages, { ...requestMessage }];
    setMessages((message) => [...message, { ...requestMessage }]);

    triggerRequest();
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const now = new Date();
      const id = nanoid();
      const incomingRequestMessage = {
        content: prompt,
        id,
        role: "user",
        createdAt: now,
      } satisfies Message;

      appendMessage(incomingRequestMessage);

      clearPromptInput();
    },
    // eslint-disable-next-line
    [prompt],
  );

  const clearPromptInput = () => {
    setPrompt("");
  };

  const clearRecentChats = useCallback(() => {
    setMessages([]);
  }, [messages]);

  const triggerStop = useCallback(() => {
    if (isLoading) {
      abortControllerRef.current?.abort("Request aborted by user.");
    }
  }, [isLoading]);

  return {
    setPrompt,
    triggerRequest,
    prompt,
    clearPromptInput,
    handleSubmit,
    messages,
    setMessages,
    clearRecentChats,
    isLoading,
    triggerStop,
  };
}
