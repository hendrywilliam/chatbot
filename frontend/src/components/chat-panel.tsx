"use client";

import PromptForm from "@/components/prompt-form";
import { UseChatHelpers } from "@/types";

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
    clearInput,
}: ChatPanelProps) {
    return (
        <div className="fixed inset-x-0 bottom-0  mx-auto w-[95%] rounded-t border bg-background p-4 lg:w-[35%]">
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
