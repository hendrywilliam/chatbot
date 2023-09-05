"use client";

import { UseChatHelpers } from "@/types";
import * as React from "react";
import { ChatMessage } from "@/components/chat-message";

interface ChatListProps extends Pick<UseChatHelpers, "messages" | "input"> {}

export default function ChatList({ messages, input }: ChatListProps) {
  return (
    <div className="text-sm w-full xl:w-[45%] xl:mx-auto p-4 flex flex-col overflow-y-auto">
      <ChatMessage messages={messages} />
    </div>
  );
}
