"use client";

import PromptForm from "@/components/prompt-form";
import { UsePdfChatHelpers } from "@/types";
import { PdfMessageList } from "./pdf-message-list";
import { useInView } from "react-intersection-observer";
import { ElementRef, useEffect, useRef } from "react";

interface Props
  extends Pick<
    UsePdfChatHelpers,
    | "setFile"
    | "setPrompt"
    | "prompt"
    | "clearRecentChats"
    | "handleSubmit"
    | "isLoading"
    | "triggerStop"
    | "clearPromptInput"
    | "messages"
    | "file"
  > {}

export function PdfChatViewerWindow({
  setPrompt,
  prompt,
  clearRecentChats,
  handleSubmit,
  triggerStop,
  isLoading,
  messages,
  file,
  setFile,
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
        <PdfMessageList messages={messages} />
        <div ref={anchorRef} id="chat-anchor" className="h-44 w-full"></div>
      </div>
      <div className="sticky bottom-0 mx-auto h-36 w-full shrink-0 rounded-t bg-background px-4 py-2">
        <PromptForm
          setInput={setPrompt}
          input={prompt}
          clearChats={clearRecentChats}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          triggerStop={triggerStop}
          interactWithFile={true}
          file={file}
          setFile={setFile}
          clearInput={clearPromptInput}
        />
      </div>
    </div>
  );
}
