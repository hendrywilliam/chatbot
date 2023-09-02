"use client";

import * as React from "react";
import ChatPanel from "@/components/chat-panel";
import ChatList from "@/components/chat-list";

export default function Chat() {
  return (
    <div className="relative pt-20 w-3/4 h-full border mx-auto ">
      <ChatList />
      <ChatPanel />
    </div>
  );
}
