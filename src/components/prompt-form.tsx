"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconEnter } from "@/components/icons/icon-enter";
import { IconAdd } from "./icons/icon-add";
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
  const promptFormRef = React.useRef<React.ElementRef<"form">>(null);
  const submitterButton = React.useRef<React.ElementRef<"button">>(null);
  const enterToSubmit = useEnterToSubmit(promptFormRef, submitterButton);

  return (
    <form
      ref={promptFormRef}
      onSubmit={(e) => handleSubmit(e, input)}
      onKeyDown={enterToSubmit}
    >
      <div className="flex border rounded-md h-16 w-full gap-2 bg-white">
        <div className="pl-2 pt-2">
          <Button
            type="button"
            className="rounded-full bg-white"
            variant="outline"
            size="icon"
            onClick={clearChats}
          >
            <IconAdd />
          </Button>
        </div>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          rows={1}
          cols={1}
          className="w-full h-full px-4 py-5 text-sm resize-none focus:outline-none rounded-md"
          value={input}
        />
        <div className="pr-2 pt-2">
          <Button
            ref={submitterButton}
            type="submit"
            size="icon"
            disabled={isLoading}
          >
            <IconEnter />
          </Button>
        </div>
      </div>
    </form>
  );
}
