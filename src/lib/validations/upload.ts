import { z } from "zod";

/** Add more types later. */
const supportedTypes = new Map([["application/pdf", true]]);

/**
 * NOTE: FileList is not working even in client component. Fallback to any.
 * https://github.com/orgs/react-hook-form/discussions/11096
 */
export const uploadValidation = z.object({
  file: z.any().superRefine((file, ctx) => {
    if (file.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please input a pdf file to start upload.",
      });
      return;
    }

    if (!supportedTypes.has(file[0].type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File is not supported.",
      });
      return;
    }
  }),
});

export type UploadValidation = z.infer<typeof uploadValidation>;
