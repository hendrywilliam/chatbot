"use client";

import { usePdfChat } from "@/hooks/use-pdf-chat";
import { PdfChatViewerWindow } from "./pdf-chat-viewer-window";
import { PdfViewerWindow } from "@/components/pdf-chat/pdf-viewer";

export function PdfChat() {
  const {
    handleSubmit,
    setPrompt,
    prompt,
    messages,
    isLoading,
    clearRecentChats,
    clearPromptInput,
    triggerStop,
  } = usePdfChat();

  return (
    <div className="flex flex-1 overflow-y-hidden">
      <PdfChatViewerWindow
        clearRecentChats={clearRecentChats}
        handleSubmit={handleSubmit}
        prompt={prompt}
        isLoading={isLoading}
        messages={messages}
        setPrompt={setPrompt}
        triggerStop={triggerStop}
        clearPromptInput={clearPromptInput}
      />
      <PdfViewerWindow />
    </div>
  );
}
