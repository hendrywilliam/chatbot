import { Message, UsePdfChatHelpers } from "@/types";
import { nanoid } from "nanoid";
import { FormEvent, useCallback, useRef, useState } from "react";
import { decode } from "@/lib/utils";

export function usePdfChat(): UsePdfChatHelpers {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesRef = useRef<Message[]>([]);

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

    const response = await fetch("/api/chat-pdf", {
      body: formData,
      method: "POST",
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
  };

  const constructFormData = useCallback(() => {
    const formData = new FormData();
    if (!file) {
      throw new Error("Pdf file is not provided.");
    }
    formData.append("file", file);

    if (!prompt) {
      throw new Error("Prompt is not provided.");
    }
    formData.append("prompt", prompt);
    return formData;
  }, [prompt, file]);

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

  return {
    setFile,
    file,
    setPrompt,
    triggerRequest,
    prompt,
    clearPromptInput,
    handleSubmit,
    messages,
    setMessages,
  };
}
