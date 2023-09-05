"use client";

import PromptForm from "@/components/prompt-form";
import ExternalLink from "@/components/external-link";
import { UseChatHelpers } from "@/types";

interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    "triggerRequest" | "setInput" | "input" | "handleSubmit"
  > {}

export default function ChatPanel({
  triggerRequest,
  setInput,
  input,
  handleSubmit,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 w-[95%] lg:w-[40%] mx-auto border rounded-t-md p-4 z-20 bg-white drop-shadow-lg">
      <PromptForm
        triggerRequest={triggerRequest}
        setInput={setInput}
        input={input}
        handleSubmit={handleSubmit}
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
