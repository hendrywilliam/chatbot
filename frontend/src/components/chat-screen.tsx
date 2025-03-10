"use client";

import ChatList from "./chat-list";
import { useChat } from "@/hooks/use-chat";
import PromptForm from "./prompt-form";

export default function ChatScreen() {
    const {
        triggerRequest,
        messages,
        setInput,
        input,
        handleSubmit,
        isLoading,
        triggerStop,
        clearChats,
        regenerateResponse,
        clearInput,
    } = useChat();

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <ChatList
                messages={messages}
                regenerateResponse={regenerateResponse}
                setInput={setInput}
                isLoading={isLoading}
            />
            <div className="px-base pb-8 flex justify-center">
                <PromptForm
                    clearChats={clearChats}
                    clearInput={clearInput}
                    handleSubmit={handleSubmit}
                    input={input}
                    isLoading={isLoading}
                    setInput={setInput}
                    triggerStop={triggerStop}
                />
            </div>
        </div>
    );
}
