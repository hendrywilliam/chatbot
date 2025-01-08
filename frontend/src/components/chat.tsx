"use client";

import { useRef, useEffect } from "react";
import ChatPanel from "@/components/chat-panel";
import ChatList from "@/components/chat-list";
import { useChat } from "@/hooks/use-chat";
import { ChatAnchor } from "@/components/chat-anchor";
import { useInView } from "react-intersection-observer";

export default function Chat() {
    const chatListRef = useRef<React.ElementRef<"div">>(null);

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
        modelSettings,
        clearInput,
    } = useChat();

    const {
        ref: chatAnchorRef,
        entry,
        inView,
    } = useInView({
        root: chatListRef.current,
        threshold: 0,
        onChange(inView, entry) {
            if (!inView && isLoading) {
                entry?.target.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        },
    });

    useEffect(() => {
        if (isLoading && !inView) {
            entry?.target.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
        return () => {};
    }, [isLoading, inView, entry]);

    return (
        <>
            <div
                ref={chatListRef}
                className="relative mx-auto w-full flex-1 overflow-y-auto bg-bg-ui-bg-component pt-16"
            >
                <ChatList
                    messages={messages}
                    setInput={setInput}
                    modelSettings={modelSettings}
                    regenerateResponse={regenerateResponse}
                />
                <ChatAnchor ref={chatAnchorRef} className="h-32" />
                <ChatPanel
                    triggerRequest={triggerRequest}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    input={input}
                    isLoading={isLoading}
                    triggerStop={triggerStop}
                    clearChats={clearChats}
                    regenerateResponse={regenerateResponse}
                    messages={messages}
                    clearInput={clearInput}
                />
            </div>
        </>
    );
}
