"use client";

import * as React from "react";
import { UseChatHelpers } from "@/types";
import { chatCompletionExamples as examples } from "@/config/chat-examples";
import { ArrowRightIcon } from "@/components/ui/icons";

interface EmptyScreenProps extends Pick<UseChatHelpers, "setInput"> {}

export function EmptyScreen({ setInput }: EmptyScreenProps) {
    return (
        <div className="flex w-full flex-col space-y-4 rounded-md border bg-white">
            <div className="px-6 py-4 leading-loose">
                <p className="text-gray-500">
                    You can start a conversation by sending your own prompt or
                    try these examples:
                </p>
                <ul>
                    {examples.map((item, i) => {
                        return (
                            <li
                                className="flex cursor-pointer gap-2"
                                key={i}
                                onClick={() => setInput(item.value)}
                            >
                                <ArrowRightIcon className="flex self-center" />
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
