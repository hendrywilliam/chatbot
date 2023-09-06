"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconCopy } from "@/components/icons/icon-copy";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ChatActionProps {
  message: string;
}

export function ChatAction({ message }: ChatActionProps) {
  const copy = useCopyToClipboard();

  return (
    <div id="chat-action" className="">
      <div className="inline-flex justify-center items-center border rounded-md shadow">
        <Button onClick={() => copy(message)} size={"xs"} variant={"ghost"}>
          <IconCopy />
        </Button>
      </div>
    </div>
  );
}
