"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconEnter } from "@/components/icons/icon-enter";
import { IconAdd } from "./icons/icon-add";
import type { UseChatHelpers } from "@/types";

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
}: PromptForm) {
  return (
    <form onSubmit={(e) => handleSubmit(e, input)}>
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
          className="w-full h-full px-4 py-5 text-sm resize-none focus:outline-none rounded-md"
          value={input}
        />
        <div className="pr-2 pt-2">
          <Button type="submit" size="icon">
            <IconEnter />
          </Button>
        </div>
      </div>
    </form>
  );
}
