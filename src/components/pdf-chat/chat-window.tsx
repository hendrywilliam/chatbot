"use client";

import { usePdfChat } from "@/hooks/use-pdf-chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PdfChatWindow() {
  const { handleSubmit, setPrompt, setFile, prompt, messages } = usePdfChat();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files && e.target.files[0])}
        />
        <Input
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Prompt"
        />
        <Button type="submit">Submit Prompt</Button>
      </form>
    </div>
  );
}
