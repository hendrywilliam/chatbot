import { toast } from "sonner";
import { z } from "zod";

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
