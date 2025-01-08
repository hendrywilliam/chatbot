"use client";

import { Button } from "@/components/ui/button";
import { EnterIcon, StopIcon } from "./ui/icons";
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

    useEffect(() => {
        inputFormRef.current?.focus();
        return () => {};
    }, []);

    return (
        <div className="rounded border bg-background p-2">
            <form
                className="relative flex h-max w-full space-x-4 bg-background"
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
                    className="w-full resize-none rounded-md pb-8 text-sm focus:outline-none"
                    value={input}
                    ref={inputFormRef}
                    placeholder="Is Millie Bobby Brown going to play Eleven in the next season?"
                />
                <div className="flex items-center">
                    {isLoading ? (
                        <Button
                            onClick={(e) => triggerStop(e)}
                            type="button"
                            size="sm"
                        >
                            <StopIcon />
                        </Button>
                    ) : (
                        <Button ref={submitterButton} type="submit" size="sm">
                            <EnterIcon />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
