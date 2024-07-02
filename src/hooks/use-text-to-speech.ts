/* eslint-disable react-hooks/exhaustive-deps */

import { ElementRef, RefObject, useEffect, useRef, useState } from "react";
import type { UseTextToSpeechHelper } from "@/types";

export const useTextToSpeech = function (): UseTextToSpeechHelper {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const sourceFileRef = useRef("");
    const audioElementRef = useRef<ElementRef<"audio"> | null>(null);
    const signalRef = useRef<AbortController | null>(null);

    const speak = async function (content: string): Promise<void> {
        try {
            setIsLoading((isLoading) => !isLoading);
            signalRef.current = new AbortController();
            const response = await fetch("/api/speech", {
                method: "POST",
                body: JSON.stringify({
                    content: content,
                }),
                signal: signalRef.current.signal,
            });

            if (!response.ok) {
                throw new Error("failed to fetch data.");
            }
            setIsLoading((isLoading) => !isLoading);

            const blobFile = await response.blob();
            const url = URL.createObjectURL(blobFile);
            sourceFileRef.current = url;
            const audioElement = document.createElement("audio");
            audioElementRef.current = audioElement;
            audioElement.style.display = "none";
            audioElement.src = url;

            if (audioElement) {
                /** Check for the metadata/data for duration. */
                audioElement.addEventListener("loadeddata", () => {
                    /** Milli to second. */
                    const duration = audioElement.duration * 1000 + 5;
                    setTimeout(() => {
                        setIsSpeaking((isSpeaking) => !isSpeaking);
                    }, duration);
                });
                setIsSpeaking((isSpeaking) => !isSpeaking);
                audioElement.play();
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.name.toLocaleLowerCase() === "aborterror"
            ) {
                return;
            }
            console.error(error);
        }
    };

    const stopAudio = function () {
        if (
            isSpeaking &&
            audioElementRef.current &&
            audioElementRef.current.currentTime
        ) {
            audioElementRef.current.pause();
            audioElementRef.current.currentTime = 0;
        }
    };

    const stopFetchAudio = function () {
        if (signalRef.current) {
            signalRef.current.abort("user aborted current fetch.");
        }
    };

    useEffect(() => {
        return () => {
            if (sourceFileRef.current && sourceFileRef.current.length > 0) {
                URL.revokeObjectURL(sourceFileRef.current);
            }
            if (audioElementRef && audioElementRef.current) {
                audioElementRef.current.remove();
            }
            if (isLoading) {
                stopFetchAudio();
            }
        };
    }, []);

    return {
        speak,
        stopAudio,
        stopFetchAudio,
        isLoading,
        isSpeaking,
    };
};