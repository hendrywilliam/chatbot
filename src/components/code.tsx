"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckMarkIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { fira_code } from "@/lib/fonts";

interface CodeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  language: string;
}

export const Code = React.memo(function Code({
  children,
  language,
  ...props
}: CodeProps) {
  const [isCopy, copy] = useCopyToClipboard();

  return (
    <div className="-z-10 my-2 w-full outline-none">
      <div
        id="code-action"
        className="flex w-full min-w-full items-center justify-between rounded-t-md bg-code px-4 py-2 outline-none"
      >
        <p className="text-xs text-white">{language}</p>
        <Button size={"xs"} onClick={() => copy(children as string)}>
          {isCopy ? <CheckMarkIcon /> : <CopyIcon />}
        </Button>
      </div>
      <div
        id="code-preview"
        className="box-border h-full w-full overflow-x-auto break-words rounded-b-md bg-code-preview p-4 text-white outline-none"
      >
        <code
          className={`${fira_code.className} box-border w-full overflow-x-auto break-words`}
          {...props}
        >
          {children}
        </code>
      </div>
    </div>
  );
});
