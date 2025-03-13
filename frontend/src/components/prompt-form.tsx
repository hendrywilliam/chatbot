"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "./ui/icons";
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
        <form
            className="bg-primary flex flex-col space-x-4 border border-border p-base rounded-md w-full md:max-w-3xl"
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
                className="w-full resize-none rounded-md text-base focus:outline-none bg-transparent text-white"
                style={{
                    height: "48px",
                    minHeight: "48px",
                    maxHeight: "264px",
                }}
                value={input}
                ref={inputFormRef}
                placeholder="Send a message..."
            />
            <div className="flex justify-end">
                {isLoading ? (
                    <Button
                        onClick={(e) => triggerStop(e)}
                        type="button"
                        size="xs"
                        className="border"
                    >
                        <Icons.stop />
                    </Button>
                ) : (
                    <Button
                        ref={submitterButton}
                        type="submit"
                        size="xs"
                        className="border"
                    >
                        <Icons.submit />
                    </Button>
                )}
            </div>
        </form>
    );
}
