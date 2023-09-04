"use client";

import { UseChatHelpers } from "@/types";
import * as React from "react";
import { ChatMessage } from "@/components/chat-message";

interface ChatListProps extends Pick<UseChatHelpers, "messages" | "input"> {}

export default function ChatList({ messages, input }: ChatListProps) {
  return (
    <div className="text-sm w-1/2 mx-auto p-4 flex flex-col">
      <ChatMessage messages={messages} />
    </div>
  );
}
