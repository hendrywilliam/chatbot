"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    CopyIcon,
    CheckMarkIcon,
    SpeechIcon,
    LoadingIcon,
    StopIcon,
} from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Message, UseChatHelpers } from "@/types";
import { ReloadIcon } from "@/components/ui/icons";
import { toast } from "sonner";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { Speech } from "openai/resources/audio/speech.mjs";

interface ChatActionProps extends Pick<UseChatHelpers, "regenerateResponse"> {
    message: Message;
}

export function ChatAction({ message, regenerateResponse }: ChatActionProps) {
    const [isCopied, copy] = useCopyToClipboard();
    const { speak, stopAudio, isLoading, isSpeaking, stopFetchAudio } =
        useTextToSpeech();

    return (
        <div
            id="chat-action"
            className="absolute bottom-0 hidden group-hover:flex"
        >
            <div className="flex h-max items-center justify-center space-x-1 rounded-md border bg-white p-1 shadow">
                <Button
                    onClick={() => {
                        copy(message.content);
                        toast.success("Copied to clipboard.");
                    }}
                    className="h-4 w-4 p-0"
                    variant="ghost"
                >
                    {isCopied ? <CheckMarkIcon /> : <CopyIcon />}
                </Button>
                {message.role.toLowerCase() === "user" && (
                    <Button
                        onClick={() => regenerateResponse(message.content)}
                        className="h-4 w-4 p-0"
                        variant="ghost"
                    >
                        <ReloadIcon />
                    </Button>
                )}
                {isLoading ? (
                    <Button
                        className="h-4 w-4 p-0"
                        variant="ghost"
                        onClick={() => stopFetchAudio()}
                    >
                        <LoadingIcon />
                    </Button>
                ) : isSpeaking ? (
                    <Button
                        className="h-4 w-4 p-0"
                        variant="ghost"
                        onClick={() => stopAudio()}
                    >
                        <StopIcon />
                    </Button>
                ) : (
                    <Button
                        className="h-4 w-4 p-0"
                        variant="ghost"
                        onClick={() => speak(message.content)}
                    >
                        <SpeechIcon />
                    </Button>
                )}
            </div>
        </div>
    );
}
