"use client";

import * as React from "react";
import { UseChatHelpers } from "@/types";
import { IconArrowRight } from "@/components/icons/icon-arrow-right";

const examples = [
  {
    title: "Explain technical concepts",
    value: "What is ollie in terms of skateboarding",
  },
  {
    title: "Summarize an article",
    value: "Summarize this following article for 2nd grader",
  },
  {
    title: "Draft an email",
    value: "Draft an email about the following: \n",
  },
];

interface EmptyScreenProps extends Pick<UseChatHelpers, "setInput"> {}

export function EmptyScreen({ setInput }: EmptyScreenProps) {
  return (
    <div className="w-full rounded-md border bg-white p-6 leading-loose">
      <p className="text-muted-foreground">
        You can start a conversation by sending your own prompt or try these
        examples:
      </p>
      <ul>
        {examples.map((item, i) => {
          return (
            <li
              className="flex cursor-pointer gap-2"
              key={i}
              onClick={() => setInput(item.value)}
            >
              <IconArrowRight className="flex self-center" />
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
