"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconCopy } from "@/components/icons/icon-copy";

interface ChatActionProps {
  message: string;
}

export function ChatAction({ message }: ChatActionProps) {
  async function addToClipboard() {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(message);
  }

  return (
    <div id="chat-action" className="">
      <div className="inline-flex justify-center items-center border rounded-md shadow">
        <Button onClick={addToClipboard} size={"xs"} variant={"ghost"}>
          <IconCopy />
        </Button>
      </div>
    </div>
  );
}
