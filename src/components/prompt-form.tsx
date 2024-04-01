"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { IconEnter } from "@/components/icons/icon-enter";
import { IconAdd } from "@/components/icons/icon-add";
import type { UseChatHelpers } from "@/types";
import { useEnterToSubmit } from "@/hooks/use-enter-to-submit";

interface PromptForm
  extends Pick<
    UseChatHelpers,
    | "setInput"
    | "handleSubmit"
    | "input"
    | "isLoading"
    | "triggerStop"
    | "clearChats"
  > {}

export default function PromptForm({
  setInput,
  handleSubmit,
  input,
  clearChats,
  isLoading,
}: PromptForm) {
  const promptFormRef = useRef<React.ElementRef<"form">>(null);
  const submitterButton = useRef<React.ElementRef<"button">>(null);
  const enterToSubmit = useEnterToSubmit(promptFormRef, submitterButton);

  return (
    <form
      ref={promptFormRef}
      onSubmit={(e) => handleSubmit(e, input)}
      onKeyDown={enterToSubmit}
    >
      <div className="flex h-16 w-full gap-2 rounded-md border bg-background text-sm">
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          rows={1}
          cols={1}
          className="h-full w-full resize-none rounded-md px-4 py-5 focus:outline-none"
          value={input}
        />
        <div className="pr-2 pt-2">
          <Button
            ref={submitterButton}
            type="submit"
            size="icon"
            disabled={isLoading || input.length === 0}
          >
            <IconEnter />
          </Button>
        </div>
      </div>
    </form>
  );
}
