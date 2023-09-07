"use client";

import { UseChatHelpers } from "@/types";
import * as React from "react";
import { ChatMessage } from "@/components/chat-message";
import { EmptyScreen } from "@/components/empty-screen";

interface ChatListProps extends Pick<UseChatHelpers, "messages" | "setInput"> {}

export default function ChatList({ messages, setInput }: ChatListProps) {
  return (
    <div className="text-sm w-full xl:w-[40%] xl:mx-auto p-4 flex flex-col self-center overflow-y-auto">
      {messages.length > 0 ? (
        <ChatMessage messages={messages} />
      ) : (
        <EmptyScreen setInput={setInput} />
      )}
    </div>
  );
}
