"use server";
import { clerkClient } from "@clerk/nextjs";
import {
  registerValidation,
  type RegisterInputValue,
} from "../validations/auth";

export async function registerAccountAction(input: RegisterInputValue) {
  const parsed = await registerValidation.spa(input);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const { email, password } = parsed.data;
  const user = await clerkClient.users.createUser({
    emailAddress: [email],
    password,
  });

  await clerkClient.users.updateUser(user.id, {
    privateMetadata: {
      images: [],
    },
  });
}
