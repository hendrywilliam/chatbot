import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function decode() {
    const decoder = new TextDecoder("utf8");
    return function (chunk: Uint8Array | undefined) {
        if (typeof chunk === "undefined") return;
        return decoder.decode(chunk);
    };
}

export function catchError(err: unknown) {
    const unknownError = "Something went wrong please try again later.";
    if (err instanceof z.ZodError) {
        return toast.error(err.issues[0].message);
    }
    if (err instanceof Error) {
        return toast.error(err.message);
    }
    return toast.error(unknownError);
}
