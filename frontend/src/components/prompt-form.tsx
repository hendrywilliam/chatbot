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

    useEffect(() => {
        if (inputFormRef.current) {
            inputFormRef.current.focus();
        }
        return () => {};
    }, []);

    return (
        <div className="h-fit w-full rounded-xl border bg-gray-50 p-3 shadow-lg">
            <form
                className="relative flex w-full flex-col space-x-4"
                ref={promptFormRef}
                onSubmit={handleSubmit}
                onKeyDown={enterToSubmit}
            >
                <textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setInput(e.target.value)
                    }
                    onInput={(event) => {
                        event.currentTarget.style.height = "auto";
                        event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                    }}
                    className="w-full resize-none rounded-md bg-gray-50 text-sm focus:outline-none"
                    style={{
                        height: "42px",
                        minHeight: "42px",
                        maxHeight: "384px",
                    }}
                    value={input}
                    ref={inputFormRef}
                    placeholder="Ask something..."
                />
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
                        <Button ref={submitterButton} type="submit" size="xs">
                            <SubmitIcon />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
