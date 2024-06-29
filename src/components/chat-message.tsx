import * as React from "react";
import { UseChatHelpers } from "@/types";
import { OpenAIIcon, UserIcon } from "@/components/ui/icons";
import { ChatAction } from "@/components/chat-action";
import ReactMarkdown from "react-markdown";
import { Code } from "@/components/code";

interface ChatMessageProps
    extends Pick<UseChatHelpers, "messages" | "regenerateResponse"> {}

export function ChatMessage({
    messages,
    regenerateResponse,
}: ChatMessageProps) {
    return (
        <>
            {messages.map((item) => {
                return (
                    <div
                        id="chat-wrapper"
                        className="group relative flex h-max w-full gap-2 py-6 xl:gap-6"
                        key={item.id}
                    >
                        <div id="chat-role" className="w-8">
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
                        <div
                            id="chat-content"
                            className="w-full leading-relaxed first:mb-2 last:mt-2"
                        >
                            {/* eslint-disable */}
                            <ReactMarkdown
                                children={item.content}
                                className="w-full"
                                components={{
                                    pre({ children }) {
                                        return (
                                            <pre className="inline-block">
                                                {children}
                                            </pre>
                                        );
                                    },
                                    p({ children }) {
                                        return (
                                            <p className="mb-4 w-full">
                                                {children}
                                            </p>
                                        );
                                    },
                                    li({ children }) {
                                        return (
                                            <li className="mb-1">{children}</li>
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
                                            <code className="font-extrabold">
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
                );
            })}
        </>
    );
}
