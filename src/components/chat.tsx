"use client";

import * as React from "react";
import ChatPanel from "@/components/chat-panel";
import ChatList from "@/components/chat-list";
import { useChat } from "@/hooks/use-chat";
import { ChatAnchor } from "@/components/chat-anchor";
import { useInView } from "react-intersection-observer";

export default function Chat() {
  const chatListRef = React.useRef<React.ElementRef<"div">>(null);
  const {
    ref: chatAnchorRef,
    inView,
    entry,
  } = useInView({
    root: chatListRef.current, //this act as the ancestor
    threshold: 1, //100% visible then callback invoked
  });

  const {
    triggerRequest,
    messages,
    setInput,
    input,
    handleSubmit,
    isLoading,
    triggerStop,
    clearChats,
    regenerateResponse,
  } = useChat();

  React.useEffect(() => {
    //this will detect if the anchor is not in viewport
    //and the loading is still processing (streaming or
    //sumthing else)
    if (!inView && isLoading) {
      //scroll to the observed element.
      entry?.target.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [inView, isLoading, entry, messages]);

  return (
    <div
      ref={chatListRef}
      className="relative pt-24 w-full h-full mx-auto overflow-y-auto"
    >
      <ChatList messages={messages} setInput={setInput} />
      <ChatAnchor ref={chatAnchorRef} className="h-10" />
      <ChatPanel
        triggerRequest={triggerRequest}
        setInput={setInput}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
        triggerStop={triggerStop}
        clearChats={clearChats}
        regenerateResponse={regenerateResponse}
        messages={messages}
      />
    </div>
  );
}
