"use client";

import PromptForm from "@/components/prompt-form";
import { UseChatHelpers } from "@/types";
import { Button } from "@/components/ui/button";
import { StopIcon } from "@/components/ui/icons";

interface ChatPanelProps
    extends Pick<
        UseChatHelpers,
        | "triggerRequest"
        | "setInput"
        | "input"
        | "handleSubmit"
        | "isLoading"
        | "triggerStop"
        | "clearChats"
        | "regenerateResponse"
        | "messages"
        | "clearInput"
    > {}

export default function ChatPanel({
    setInput,
    input,
    handleSubmit,
    isLoading,
    triggerStop,
    clearChats,
    regenerateResponse,
    messages,
    clearInput,
}: ChatPanelProps) {
    return (
        <div className="fixed inset-x-0 bottom-0  mx-auto w-[95%] rounded-t border bg-background p-4 lg:w-[35%]">
            {isLoading && (
                <Button
                    variant="outline"
                    className="absolute inset-x-0 -top-12 mx-auto w-max gap-1 text-xs text-muted-foreground drop-shadow-none"
                    onClick={(e) => triggerStop(e)}
                >
                    <StopIcon />
                    Stop Generating
                </Button>
            )}
            <PromptForm
                setInput={setInput}
                input={input}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                triggerStop={triggerStop}
                clearChats={clearChats}
                clearInput={clearInput}
            />
        </div>
    );
}
