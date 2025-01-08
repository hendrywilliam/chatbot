"use client";

import * as React from "react";

export function useCopyToClipboard(): [
    isCopied: boolean,
    (value: string) => void,
] {
    const [isCopied, setIsCopied] = React.useState(false);

    const copy = async function (value: string) {
        try {
            if (!navigator.clipboard) {
                throw new Error(
                    "Clipboard is not supported in your current browser.",
                );
            }
            await navigator.clipboard.writeText(value).then((_) => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            });
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
    };
    return [isCopied, copy];
}
