"use client";

import { UseChatHelpers } from "@/types";
import * as React from "react";
import { EmptyScreen } from "@/components/empty-screen";
import { OpenAIIcon, UserIcon } from "@/components/ui/icons";
import { ChatAction } from "@/components/chat-action";
import ReactMarkdown from "react-markdown";
import { Code } from "@/components/code";

interface ChatListProps
    extends Pick<
            UseChatHelpers,
            "messages" | "setInput" | "regenerateResponse"
        >,
        React.HTMLAttributes<HTMLDivElement> {}

const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
    ({ messages, setInput, regenerateResponse, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className="mx-auto mb-36 flex w-full flex-1 flex-col overflow-x-hidden p-4 lg:w-[40%]"
            >
                {messages.length > 0 ? (
                    messages.map((item) => (
                        <div
                            className="group relative flex h-max w-full gap-6 py-6 xl:gap-6"
                            key={item.id}
                        >
                            <div>
                                {item.role === "user" ? (
                                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-white shadow">
                                        <UserIcon />
                                    </div>
                                ) : (
                                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-black shadow">
                                        <OpenAIIcon fill="white" />
                                    </div>
                                )}
                            </div>
                            <div className="w-full">
                                {/* eslint-disable */}
                                <ReactMarkdown
                                    children={item.content}
                                    className="w-full break-all leading-loose"
                                    components={{
                                        p({ children }) {
                                            return (
                                                <p className="mb-4 w-full">
                                                    {children}
                                                </p>
                                            );
                                        },
                                        li({ children }) {
                                            return (
                                                <li className="mb-1">
                                                    {children}
                                                </li>
                                            );
                                        },
                                        code({
                                            node,
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) {
                                            const match = /language-(\w+)/.exec(
                                                className || "",
                                            );
                                            return !inline && match ? (
                                                <Code
                                                    language={
                                                        match[0].split("-")[1]
                                                    }
                                                    {...props}
                                                >
                                                    {children}
                                                </Code>
                                            ) : (
                                                <code className="rounded-full border border-border p-1 px-2 font-inter">
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                />
                                <ChatAction
                                    message={item}
                                    regenerateResponse={regenerateResponse}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyScreen setInput={setInput} />
                )}
            </div>
        );
    },
);

ChatList.displayName = "ChatList";
export default ChatList;
