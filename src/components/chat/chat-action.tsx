"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckMarkIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ChatActionProps {
  message: string;
}

export function ChatAction({ message }: ChatActionProps) {
  const [isCopy, copy] = useCopyToClipboard();

  return (
    <div id="chat-action" className="absolute right-0 w-8">
      <div className="inline-flex items-center justify-center rounded-md border bg-white shadow">
        <Button onClick={() => copy(message)} size={"xs"} variant={"ghost"}>
          {isCopy ? <CheckMarkIcon /> : <CopyIcon />}
        </Button>
      </div>
    </div>
  );
}
