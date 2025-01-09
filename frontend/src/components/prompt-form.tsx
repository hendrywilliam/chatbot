"use client";

import { Button } from "@/components/ui/button";
import { SubmitIcon, StopIcon } from "./ui/icons";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useRef,
    useEffect,
    MouseEvent,
} from "react";
import { useEnterToSubmit } from "@/hooks/use-enter-to-submit";

interface PromptForm {
    setInput: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    input: string;
    clearChats: (e: MouseEvent<HTMLButtonElement, any>) => void;
    triggerStop: (e: MouseEvent<HTMLButtonElement, any>) => void;
    isLoading: boolean;
    clearInput: () => void;
}

export default function PromptForm({
    setInput,
    handleSubmit,
    input,
    isLoading,
    triggerStop,
}: PromptForm) {
    const inputFormRef = useRef<React.ElementRef<"textarea">>(null);
    const promptFormRef = useRef<React.ElementRef<"form">>(null);
    const submitterButton = useRef<React.ElementRef<"button">>(null);
    const enterToSubmit = useEnterToSubmit(promptFormRef, submitterButton);
    const observer = useRef<ResizeObserver | null>(null);

    function submitForm() {
        if (promptFormRef.current) {
            promptFormRef.current.requestSubmit();
        }
        return;
    }

    useEffect(() => {
        if (inputFormRef.current) {
            inputFormRef.current?.focus();
            observer.current = new ResizeObserver((entries) => {
                if (inputFormRef.current) {
                    if (
                        inputFormRef.current.scrollHeight >
                        inputFormRef.current.clientHeight
                    ) {
                        inputFormRef.current.style.height = `${inputFormRef.current.scrollHeight}px`;
                    }
                }
            });
            observer.current.observe(inputFormRef.current);
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <div className="h-fit w-full rounded-xl border bg-background p-3">
            <form
                className="relative flex w-full space-x-4 bg-background"
                ref={promptFormRef}
                onSubmit={handleSubmit}
                onKeyDown={enterToSubmit}
            >
                <textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setInput(e.target.value)
                    }
                    className="w-full resize-none rounded-md text-sm focus:outline-none"
                    style={{
                        height: "42px",
                        minHeight: "42px",
                        maxHeight: "384px",
                    }}
                    value={input}
                    ref={inputFormRef}
                    placeholder="Ask something..."
                />
            </form>
            <div className="flex justify-end">
                {isLoading ? (
                    <Button
                        onClick={(e) => triggerStop(e)}
                        type="button"
                        size="xs"
                    >
                        <StopIcon />
                    </Button>
                ) : (
                    <Button
                        ref={submitterButton}
                        type="button"
                        onClick={submitForm}
                        size="xs"
                    >
                        <SubmitIcon />
                    </Button>
                )}
            </div>
        </div>
    );
}
