"use client";

import * as React from "react";
import ChatPanel from "@/components/chat-panel";
import ChatList from "@/components/chat-list";
import { useChat } from "@/hooks/use-chat";

export default function Chat() {
  const {
    triggerRequest,
    messages,
    setInput,
    input,
    handleSubmit,
    isLoading,
    triggerStop,
  } = useChat();

  return (
    <div className="relative pt-24 pb-36 w-full h-full mx-auto overflow-auto">
      <ChatList messages={messages} setInput={setInput} />
      <ChatPanel
        triggerRequest={triggerRequest}
        setInput={setInput}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
        triggerStop={triggerStop}
      />
    </div>
  );
}
