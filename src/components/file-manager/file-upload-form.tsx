"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  type UploadValidation,
  uploadValidation,
} from "@/lib/validations/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { catchError } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingIcon } from "../ui/icons";

export default function FileUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UploadValidation>({
    resolver: zodResolver(uploadValidation),
    mode: "onSubmit",
  });
  const fileRef = form.register("file");

  const onSubmit = async function (data: UploadValidation) {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    try {
      setIsLoading(true);
      const response = await fetch("/api/upload", {
        body: formData,
        method: "POST",
      });
      const body = await response.json();

      if (!response.ok) {
        toast.error(`Error occured: ${body.message}`);
        return;
      }
      toast.success("Upload completed.");
    } catch (error) {
      catchError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>
              <FormDescription>Upload your PDF file. Max 5MB.</FormDescription>
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
          Upload File
        </Button>
      </form>
    </Form>
  );
}
