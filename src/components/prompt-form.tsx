"use client";

import { Button } from "@/components/ui/button";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import { useEnterToSubmit } from "@/hooks/use-enter-to-submit";

interface PromptForm {
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  input: string;
  clearChats: () => void;
  triggerStop: () => void;
  isLoading: boolean;
}

export default function PromptForm({
  setInput,
  handleSubmit,
  input,
  clearChats,
  isLoading,
}: PromptForm) {
  const inputFormRef = useRef<React.ElementRef<"textarea">>(null);
  const promptFormRef = useRef<React.ElementRef<"form">>(null);
  const submitterButton = useRef<React.ElementRef<"button">>(null);
  const enterToSubmit = useEnterToSubmit(promptFormRef, submitterButton);
  /** Max auto resize, add overflow if exceeds this value. */
  const maxAutoResize = useRef(152);

  useEffect(() => {
    inputFormRef.current?.focus();
    return () => {};
  }, []);

  return (
    <form
      className="relative h-max"
      ref={promptFormRef}
      onSubmit={handleSubmit}
      onKeyDown={enterToSubmit}
    >
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        rows={1}
        cols={1}
        className="w-full resize-none rounded-md border p-2 pb-12 focus:outline-none"
        value={input}
        ref={inputFormRef}
        onInput={(event) => {
          event.currentTarget.setAttribute(
            "style",
            `height: ${event.currentTarget.scrollHeight}px !important;overflow-y:hidden`,
          );
        }}
      />
      <div className="absolute bottom-3 right-2">
        <Button
          ref={submitterButton}
          type="submit"
          size="sm"
          disabled={isLoading || input.length === 0}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
