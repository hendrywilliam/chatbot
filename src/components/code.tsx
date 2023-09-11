"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconCopy } from "@/components/icons/icon-copy";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { fira_code } from "@/lib/fonts";

interface CodeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

export function Code({ children, ...props }: CodeProps) {
  const copy = useCopyToClipboard();

  return (
    <div className="w-full my-2 outline-none">
      <div
        id="code-action"
        className="flex justify-end items-center py-2 px-4 bg-code rounded-t-md outline-none"
      >
        <Button size={"xs"} onClick={() => copy(children as string)}>
          <IconCopy />
        </Button>
      </div>
      <div
        id="code-preview"
        className="w-full h-full p-4 bg-code-preview text-white rounded-b-md outline-none break-words overflow-x-auto"
      >
        <code
          className={`${fira_code.className} box-border break-words`}
          {...props}
        >
          {children}
        </code>
      </div>
    </div>
  );
}
