"use client";

import PromptForm from "@/components/prompt-form";
import ExternalLink from "@/components/external-link";
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
    <div className="fixed inset-x-0 bottom-0 w-[95%] lg:w-[35%] mx-auto border rounded-t-md p-4 z-20 bg-white drop-shadow-lg">
      {messages.length > 0 && !isLoading && (
        <Button
          variant={"outline"}
          className="absolute -top-12 inset-x-0 w-max mx-auto text-xs text-muted-foreground gap-1 drop-shadow-none"
          onClick={regenerateResponse}
        >
          <IconReset />
          Regenerate Response
        </Button>
      )}
      {isLoading && (
        <Button
          variant={"outline"}
          className="absolute -top-12 inset-x-0 w-max mx-auto text-xs text-muted-foreground gap-1 drop-shadow-none"
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
      <div className="flex w-full justify-center mt-4" id="author">
        <p className="flex text-xs gap-1 text-muted-foreground">
          Created and open-sourced by hendry
        </p>
      </div>
    </div>
  );
}
