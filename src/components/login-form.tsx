"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { catchError } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { loginValue } from "@/lib/validations/auth";
import { useState } from "react";
import { LoadingIcon } from "./ui/icons";

export default function LoginForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const form = useForm<loginValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: loginValue) {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login succeeded.");
        push("/");
      } else {
        toast.error("Login has failed.");
      }
    } catch (error: unknown) {
      catchError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="ada_lovelace@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading && <LoadingIcon />}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
