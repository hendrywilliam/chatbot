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
        <div className="-z-10 my-2 flex w-full flex-col outline-none">
            <div
                id="code-action"
                className="flex w-full items-center justify-between rounded-t-md bg-code px-4 py-2 outline-none"
            >
                <p className="text-xs text-white">{language}</p>
                <Button size={"xs"} onClick={() => copy(children as string)}>
                    {isCopy ? <CheckMarkIcon /> : <CopyIcon />}
                </Button>
            </div>
            <code
                className={`${fira_code.className} box-border inline-block w-full overflow-x-auto whitespace-pre-wrap rounded-b bg-code-preview p-4 text-left text-white`}
                {...props}
            >
                {children}
            </code>
        </div>
    );
});
