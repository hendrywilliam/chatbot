"use client";

import PromptForm from "@/components/prompt-form";
import ExternalLink from "@/components/external-link";
import { UseChatHelpers } from "@/types";
import { Button } from "@/components/ui/button";
import { IconStop } from "@/components/icons/icon-stop";

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
  > {}

export default function ChatPanel({
  setInput,
  input,
  handleSubmit,
  isLoading,
  triggerStop,
  clearChats,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 w-[95%] lg:w-[35%] mx-auto border rounded-t-md p-4 z-20 bg-white drop-shadow-lg">
      {isLoading ? (
        <Button
          variant={"outline"}
          className="absolute -top-12 inset-x-0 w-max mx-auto text-xs text-muted-foreground gap-1 drop-shadow-none"
          onClick={triggerStop}
        >
          <IconStop />
          Stop Generating
        </Button>
      ) : null}
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
          Powered by
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>and
          <ExternalLink href="https://openai.com/">OpenAI</ExternalLink>
          Created by
          <ExternalLink href={"https://github.com/hendrywilliam"}>
            hendry
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}
