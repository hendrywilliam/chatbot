"use client";

import * as React from "react";
import ExternalLink from "@/components/external-link";
import { UseChatHelpers } from "@/types";
import { IconArrowRight } from "@/components/icons/icon-arrow-right";

const examples = [
  {
    title: "Explain technical concepts",
    value: "What is ollie in terms of skateboarding",
  },
  {
    title: "Summarize an article",
    value: "Summarize this following artile for 2nd grader",
  },
  {
    title: "Draft an email",
    value: "Draft an email about the following: \n",
  },
];

interface EmptyScreenProps extends Pick<UseChatHelpers, "setInput"> {}

export function EmptyScreen({ setInput }: EmptyScreenProps) {
  return (
    <div className="w-full border rounded-md p-6 bg-white text-sm leading-loose">
      <p className="text-xl font-bold">Glad you made it!</p>
      <p className="inline-flex gap-1 text-muted-foreground">
        Welcome to DictationAI by
        <span>
          <ExternalLink href={"https://github.com/hendrywilliam"}>
            yrdneh
          </ExternalLink>
        </span>
      </p>
      <p className="text-muted-foreground">
        You can start a conversation by sending your own prompt or try these
        examples:
      </p>
      <ul>
        {examples.map((item, i) => {
          return (
            <li
              className="cursor-pointer flex gap-2"
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
