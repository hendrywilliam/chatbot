"use client";

import PromptForm from "@/components/prompt-form";
import { UsePdfChatHelpers } from "@/types";
import { PdfMessageList } from "./pdf-message-list";
import { useInView } from "react-intersection-observer";
import { ElementRef, useEffect, useRef } from "react";
import PdfEmptyScreen from "./empty-screen";

interface Props
  extends Pick<
    UsePdfChatHelpers,
    | "setPrompt"
    | "prompt"
    | "clearRecentChats"
    | "handleSubmit"
    | "isLoading"
    | "triggerStop"
    | "clearPromptInput"
    | "messages"
  > {}

export function PdfChatViewerWindow({
  setPrompt,
  prompt,
  clearRecentChats,
  handleSubmit,
  triggerStop,
  isLoading,
  messages,
  clearPromptInput,
}: Props) {
  const messagesContainerRef = useRef<ElementRef<"div">>(null);
  const {
    ref: anchorRef,
    entry,
    inView,
  } = useInView({
    root: messagesContainerRef.current,
    threshold: 0,
    rootMargin: "0px 0px -150px 0px",
    onChange(inView, entry) {
      if (!inView && isLoading) {
        entry?.target.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    },
  });

  useEffect(() => {
    if (isLoading && !inView) {
      entry?.target.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    return () => {};
  }, [inView, isLoading, entry]);

  return (
    <div className="relative flex-1">
      <div
        ref={messagesContainerRef}
        className="relative h-full overflow-y-auto"
      >
        {messages.length > 0 ? (
          <>
            <PdfMessageList messages={messages} />
            <div ref={anchorRef} id="chat-anchor" className="h-44 w-full"></div>
          </>
        ) : (
          <PdfEmptyScreen setPrompt={setPrompt} />
        )}
      </div>
      <div className="sticky bottom-0 mx-auto h-max w-3/4 shrink-0 rounded-t border bg-background px-4 py-4">
        <PromptForm
          setInput={setPrompt}
          input={prompt}
          clearChats={clearRecentChats}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          triggerStop={triggerStop}
          clearInput={clearPromptInput}
        />
      </div>
    </div>
  );
}
