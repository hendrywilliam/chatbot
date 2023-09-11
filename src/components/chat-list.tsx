"use client";

import { UseChatHelpers } from "@/types";
import * as React from "react";
import { ChatMessage } from "@/components/chat-message";
import { EmptyScreen } from "@/components/empty-screen";

interface ChatListProps
  extends Pick<UseChatHelpers, "messages" | "setInput">,
    React.HTMLAttributes<HTMLDivElement> {}

const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
  ({ messages, setInput, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="text-sm w-full lg:w-[50%] xl:w-[40%] lg:mx-auto p-4 flex flex-col self-center overflow-y-auto mb-36"
      >
        {messages.length > 0 ? (
          <ChatMessage messages={messages} />
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
    );
  }
);

ChatList.displayName = "ChatList";
export default ChatList;
