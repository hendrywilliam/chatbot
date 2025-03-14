"use client";

import { UseChatHelpers } from "@/types";
import { inter } from "@/utils/fonts";
import { ElementRef, useRef, useEffect } from "react";
import Markdown from "./markdown";
import { Icons } from "./ui/icons";

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
            className={`relative h-full flex-1 overflow-y-auto overflow-x-hidden justify-center flex ${inter.className} py-12 p-base`}
        >
            <div className="flex flex-col w-screen md:max-w-3xl">
                {messages.map((item) =>
                    item.role === "user" ? (
                        <div
                            className="group relative flex h-max w-full gap-2 py-6 xl:gap-6"
                            key={item.id}
                        >
                            <div>
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-white shadow">
                                    <Icons.user />
                                </div>
                            </div>
                            <Markdown content={item.content} />
                        </div>
                    ) : item.role === "assistant" ? (
                        <div
                            className="group relative flex h-max w-full gap-2 py-6 xl:gap-6"
                            key={item.id}
                        >
                            <div>
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-black shadow">
                                    <Icons.bot fill="white" />
                                </div>
                            </div>
                            <Markdown content={item.content} />
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
