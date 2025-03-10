import {
    useRef,
    useTransition,
    useState,
    useEffect,
    useCallback,
    MouseEvent,
} from "react";
import type { Message, UseChatHelpers } from "@/types";
import { nanoid } from "nanoid";
import { decode } from "@/utils/text-decoder";
import { GenerateContentResponse } from "@google/generative-ai";

export function useChat(): UseChatHelpers {
    const abortControllerRef = useRef<AbortController | null>(null);
    const [isPending, startTransition] = useTransition();
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = useRef<Message[]>([]);
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const triggerRequest = useCallback(
        async (requestMessage: Message) => {
            setMessages([...messages, { ...requestMessage }]);

            const responseId = nanoid();

            const now = new Date();
            const responseMessage = {
                id: responseId,
                role: "assistant",
                content: "",
                createdAt: now,
            } satisfies Message;

            messagesRef.current = [...messagesRef.current, requestMessage];
            setMessages((messages) => [...messages, { ...responseMessage }]);
            setIsLoading(true);
            abortControllerRef.current = new AbortController();

            startTransition(async () => {
                try {
                    const response = await fetch("/api/chat", {
                        method: "POST",
                        body: JSON.stringify({
                            contents: messagesRef.current.map((item) => {
                                return {
                                    role: item.role,
                                    parts: [
                                        {
                                            text: item.content,
                                        },
                                    ],
                                };
                            }),
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        signal: abortControllerRef.current?.signal,
                    });
                    const decoder = decode();
                    if (!response.ok) {
                        setIsLoading(false);
                        return;
                    }
                    const body = response.body as ReadableStream;
                    const reader = body.getReader();
                    let responseText = "";

                    while (true) {
                        if (reader) {
                            const { done, value } = await reader.read();
                            if (done) {
                                reader.releaseLock();
                                break;
                            }
                            const decodedValue = decoder(value) as string;
                            decodedValue.split("\n\n").forEach((item) => {
                                if (item.length === 0) {
                                    return;
                                }
                                item = item.replaceAll(/^data: /g, "");
                                try {
                                    const parsed = JSON.parse(
                                        item
                                    ) as GenerateContentResponse;
                                    if (parsed.candidates) {
                                        responseText +=
                                            parsed.candidates[0].content
                                                .parts[0].text || "";
                                    }
                                    return;
                                } catch (error) {
                                    return;
                                }
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
                        } else {
                            return;
                        }
                    }
                } catch (error) {
                    return;
                } finally {
                    setIsLoading(false);
                }
            });
        },
        [input, messages]
    );

    /** Trigger Fetch and append a message to Message[] */
    const append = useCallback(
        (requestMessage: Message) => {
            if (!requestMessage.id) {
                requestMessage.id = nanoid();
            }

            triggerRequest(requestMessage);
        },
        [triggerRequest]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (input.length === 0) return;

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
        [setInput, append]
    );

    const triggerStop = useCallback(
        (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            if (abortControllerRef.current) {
                abortControllerRef.current.abort(
                    "Stream request aborted by user."
                );
            }
            return;
        },
        []
    );

    const clearChats = useCallback(
        (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (isLoading) {
                triggerStop(e);
            }
            setMessages([]);
            return;
        },
        [triggerStop]
    );

    const regenerateResponse = useCallback(
        (content: string) => {
            const now = new Date();
            const id = nanoid();

            if (content.length === 0) {
                return;
            }

            if (isLoading && abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const requestMessage = {
                id,
                role: "user",
                content: content,
                createdAt: now,
            } satisfies Message;

            triggerRequest(requestMessage);
            return;
        },
        [triggerRequest]
    );

    const clearInput = useCallback(() => {
        setInput("");
    }, [input]);

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
        clearInput,
    };
}
