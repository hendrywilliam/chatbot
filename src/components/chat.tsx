"use client";

import * as React from "react";
import ChatPanel from "@/components/chat-panel";
import ChatList from "@/components/chat-list";
import { useChat } from "@/hooks/use-chat";

export default function Chat() {
  const { triggerRequest, messages, setInput, input, handleSubmit } = useChat();

  return (
    <div className="relative pt-20 w-3/4 h-full border mx-auto ">
      <ChatList messages={messages} input={input} />
      <ChatPanel
        triggerRequest={triggerRequest}
        setInput={setInput}
        handleSubmit={handleSubmit}
        input={input}
      />
    </div>
  );
}
