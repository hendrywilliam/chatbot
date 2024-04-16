"use client";

import { usePdfChat } from "@/hooks/use-pdf-chat";
import { PdfChatViewerWindow } from "./chat-viewer";
import { PdfViewerWindow } from "@/components/pdf-chat/pdf-viewer";

export function PdfChat() {
  const {
    handleSubmit,
    setPrompt,
    setFile,
    prompt,
    messages,
    isLoading,
    file,
    clearRecentChats,
    clearPromptInput,
    triggerStop,
  } = usePdfChat();
  return (
    <div className="flex h-full flex-1">
      <PdfChatViewerWindow
        setFile={setFile}
        clearRecentChats={clearRecentChats}
        handleSubmit={handleSubmit}
        prompt={prompt}
        isLoading={isLoading}
        messages={messages}
        setPrompt={setPrompt}
        triggerStop={triggerStop}
        file={file}
        clearPromptInput={clearPromptInput}
      />
      <PdfViewerWindow file={file} />
    </div>
  );
}
