"use client";

import { useRef, useEffect } from "react";
import ChatPanel from "@/components/chat-panel";
import ChatList from "@/components/chat-list";
import { useChat } from "@/hooks/use-chat";
import { ChatAnchor } from "@/components/chat-anchor";
import { useInView } from "react-intersection-observer";

export default function Chat() {
  const chatListRef = useRef<React.ElementRef<"div">>(null);
  const {
    ref: chatAnchorRef,
    entry,
    inView,
  } = useInView({
    root: chatListRef.current,
    /** Execute the callback immediately. No need to wait till it visiblein viewport. */
    threshold: 0,
    onChange(inView, entry) {
      /** Once the anchor is not in viewport and its still loading, scroll to element. */
      if (!inView && isLoading) {
        entry?.target.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    },
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

  useEffect(() => {
    if (isLoading && !inView) {
      entry?.target.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    return () => {};
  }, [isLoading, inView, entry]);

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
