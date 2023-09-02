"use client";

import * as React from "react";
import PromptForm from "@/components/prompt-form";
import ExternalLink from "@/components/external-link";

export default function ChatPanel() {
  return (
    <div className="absolute bottom-0 left-1/4 w-1/2 mx-auto border rounded-t-md p-4">
      <PromptForm />
      <div className="flex w-full justify-center mt-4" id="author">
        <p className="flex text-xs gap-1 text-muted-foreground">
          Powered by{" "}
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>and
          <ExternalLink href="https://nextjs.org/">OpenAI.</ExternalLink>
          Created by
          <ExternalLink href={"https://github.com/hendrywilliam"}>
            Yrdneh
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}
