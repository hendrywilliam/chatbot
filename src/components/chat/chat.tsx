"use client";

import { useRef, useEffect } from "react";
import ChatPanel from "@/components/chat/chat-panel";
import ChatList from "@/components/chat/chat-list";
import { useChat } from "@/hooks/use-chat";
import { ChatAnchor } from "@/components/chat/chat-anchor";
import { useInView } from "react-intersection-observer";
import ChatSettings from "./chat-settings";

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
    modelSettings,
    setModelSettings,
    clearInput,
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
    <>
      <ChatSettings
        modelSettings={modelSettings}
        setModelSettings={setModelSettings}
      />
      <div
        ref={chatListRef}
        className="relative mx-auto w-full flex-1 overflow-y-auto bg-bg-ui-bg-component pt-16"
      >
        <ChatList
          messages={messages}
          setInput={setInput}
          modelSettings={modelSettings}
        />
        <ChatAnchor ref={chatAnchorRef} className="h-32" />
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
          clearInput={clearInput}
        />
      </div>
    </>
  );
}
