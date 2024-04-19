import { z } from "zod";

export const registerValidation = z
  .object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email({
        message: "Invalid email. Please provide a proper email.",
      }),
    password: z.string({
      required_error: "Password is required.",
    }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match with confirm password.",
    path: ["confirmPassword"],
  });

export type loginValue = Omit<
  z.output<typeof registerValidation>,
  "confirmPassword"
>;

export type RegisterInputValue = z.input<typeof registerValidation>;
