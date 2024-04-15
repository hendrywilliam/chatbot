"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PromptForm from "@/components/prompt-form";
import { usePdfChat } from "@/hooks/use-pdf-chat";

export function PdfChatViewer() {
  const { handleSubmit, setPrompt, setFile, prompt, messages } = usePdfChat();

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <div className="h-24 w-full"></div>
      <div className="w-full flex-1"></div>
      <div className="h- border"></div>
    </div>
  );
}
