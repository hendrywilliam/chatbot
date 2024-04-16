"use client";

import PromptForm from "@/components/prompt-form";
import { UsePdfChatHelpers } from "@/types";
import ChatList from "./chat-list";

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
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <div className="flex-1">
        <ChatList messages={messages} />
      </div>
      <div className="h-max px-4 py-2">
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
