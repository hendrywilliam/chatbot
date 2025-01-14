/* eslint-disable react-hooks/exhaustive-deps */

import {
    useRef,
    useTransition,
    useState,
    useEffect,
    useCallback,
    MouseEvent,
} from "react";
import type {
    ChatCompletionModelSettings,
    Message,
    UseChatHelpers,
} from "@/types";
import { nanoid } from "nanoid";
import { decode } from "@/utils/text-decoder";
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
                            presence_penaly:
                                modelSettings.presence_penalty ?? 0,
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
                            decodedValue.split("\n").forEach((item) => {
                                if (item.length === 0) {
                                    return;
                                }
                                item = item.replaceAll(/^data: /g, "");
                                try {
                                    const parsed = JSON.parse(
                                        item,
                                    ) as OpenAIStreamOutput;
                                    if ("content" in parsed.choices[0].delta) {
                                        responseText +=
                                            parsed.choices[0].delta.content ??
                                            "";
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
                                }),
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
        //eslint-disable-next-line
        [input, setInput, append],
    );

    const triggerStop = useCallback(
        (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            if (abortControllerRef.current) {
                abortControllerRef.current.abort(
                    "Stream request aborted by user.",
                );
            }
            return;
        },
        [],
    );

    const clearChats = useCallback(
        (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (isLoading) {
                triggerStop(e);
            }
            setMessages([]);
            return;
        },
        [isLoading, triggerStop],
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
        [triggerRequest],
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
        modelSettings,
        setModelSettings,
        clearInput,
    };
}
