"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconCopy } from "@/components/icons/icon-copy";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { IconSuccess } from "@/components/icons/icon-success";

interface ChatActionProps {
  message: string;
}

export function ChatAction({ message }: ChatActionProps) {
  const [isCopy, copy] = useCopyToClipboard();

  return (
    <div id="chat-action" className="absolute w-8 right-0">
      <div className="inline-flex justify-center items-center border rounded-md shadow bg-white">
        <Button onClick={() => copy(message)} size={"xs"} variant={"ghost"}>
          {isCopy ? <IconSuccess /> : <IconCopy />}
        </Button>
      </div>
    </div>
  );
}
