"use client";

import { UseChatHelpers } from "@/types";
import { inter } from "@/utils/fonts";
import { ElementRef, useRef, useEffect } from "react";
import { AIChatMessage, UserChatMessage } from "./chat-message";

interface ChatListProps
    extends Pick<
            UseChatHelpers,
            "messages" | "setInput" | "regenerateResponse" | "isLoading"
        >,
        React.HTMLAttributes<HTMLDivElement> {}

export default function ChatList({
    messages,
    setInput,
    regenerateResponse,
    isLoading,
    ...props
}: ChatListProps) {
    const chatlistRef = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        const chatList = chatlistRef.current;
        if (!chatList) return;
        const isAtBottom =
            chatList.scrollTop + chatList.clientHeight >=
            chatList.scrollHeight - 10;
        if (!isAtBottom) {
            chatList.scrollTo({
                top: chatList.scrollHeight,
                behavior: "smooth",
            });
        }
        return () => {};
    }, [messages, isLoading]);

    return (
        <div
            ref={chatlistRef}
            className={`h-full flex-1 overflow-y-auto justify-center flex ${inter.className} py-24`}
        >
            <div className="flex flex-col md:max-w-3xl w-full">
                {messages.length > 0 &&
                    messages.map((item) =>
                        item.role === "user" ? (
                            <UserChatMessage
                                content={item.content}
                                id={item.id}
                                key={item.id}
                            />
                        ) : item.role === "assistant" ? (
                            <AIChatMessage
                                content={item.content}
                                key={item.id}
                                id={item.id}
                            />
                        ) : null
                    )}
            </div>
        </div>
    );
}
