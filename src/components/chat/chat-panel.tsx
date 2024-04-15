"use client";

import PromptForm from "@/components/prompt-form";
import { UseChatHelpers } from "@/types";
import { Button } from "@/components/ui/button";
import { IconStop } from "@/components/icons/icon-stop";
import { IconReset } from "@/components/icons/icon-reset";

interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "triggerRequest"
    | "setInput"
    | "input"
    | "handleSubmit"
    | "isLoading"
    | "triggerStop"
    | "clearChats"
    | "regenerateResponse"
    | "messages"
  > {}

export default function ChatPanel({
  setInput,
  input,
  handleSubmit,
  isLoading,
  triggerStop,
  clearChats,
  regenerateResponse,
  messages,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto w-[95%] pb-2 lg:w-[35%]">
      {messages.length > 0 && !isLoading && (
        <Button
          variant="outline"
          className="absolute inset-x-0 -top-12 mx-auto w-max gap-1 text-xs text-muted-foreground drop-shadow-none"
          onClick={regenerateResponse}
        >
          <IconReset />
          Regenerate Response
        </Button>
      )}
      {isLoading && (
        <Button
          variant="outline"
          className="absolute inset-x-0 -top-12 mx-auto w-max gap-1 text-xs text-muted-foreground drop-shadow-none"
          onClick={triggerStop}
        >
          <IconStop />
          Stop Generating
        </Button>
      )}
      <PromptForm
        setInput={setInput}
        input={input}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        triggerStop={triggerStop}
        clearChats={clearChats}
      />
    </div>
  );
}
