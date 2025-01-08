"use client";

import { UseChatHelpers } from "@/types";
import * as React from "react";
import { ChatMessage } from "@/components/chat-message";
import { EmptyScreen } from "@/components/empty-screen";

interface ChatListProps
    extends Pick<
            UseChatHelpers,
            "messages" | "setInput" | "modelSettings" | "regenerateResponse"
        >,
        React.HTMLAttributes<HTMLDivElement> {}

const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
    (
        { messages, setInput, modelSettings, regenerateResponse, ...props },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className="mb-36 flex w-full flex-1 flex-col overflow-x-hidden p-4 lg:mx-auto lg:w-[50%] xl:w-[40%]"
            >
                {messages.length > 0 ? (
                    <ChatMessage
                        messages={messages}
                        regenerateResponse={regenerateResponse}
                    />
                ) : (
                    <EmptyScreen
                        setInput={setInput}
                        modelSettings={modelSettings}
                    />
                )}
            </div>
        );
    },
);

ChatList.displayName = "ChatList";
export default ChatList;
