"use client";

import * as React from "react";
import { Models, UseChatHelpers } from "@/types";
import { chatCompletionExamples as examples } from "@/config/chat-examples";
import { models } from "@/config/models";
import ExternalLink from "@/components/external-link";
import { ExternalLinkIcon, ArrowRightIcon } from "@/components/ui/icons";

interface EmptyScreenProps
  extends Pick<UseChatHelpers, "setInput" | "modelSettings"> {}

export function EmptyScreen({ setInput, modelSettings }: EmptyScreenProps) {
  const selectedModels = models.find(
    (model) => model.value === modelSettings.model,
  ) as Models;

  return (
    <div className="flex w-full flex-col space-y-4 rounded-md border bg-white">
      <div className="inline-flex gap-4 border-b px-6 py-4">
        <div className="flex items-center">
          <selectedModels.icon className="h-6 w-6" />
        </div>
        <p className="text-muted-foreground">{selectedModels.description}</p>
      </div>
      <div className="px-6 py-4 leading-loose">
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
                <ArrowRightIcon className="flex self-center" />
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t bg-bg-ui-bg-base-pressed px-6 py-4">
        {selectedModels.href.map((item, i) => (
          <ExternalLink
            key={i}
            href={item}
            className="inline-flex items-center gap-1"
          >
            Documentation
            <ExternalLinkIcon />
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
