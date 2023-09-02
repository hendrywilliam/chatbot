"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconEnter } from "@/components/icons/icon-enter";
import { IconAdd } from "./icons/icon-add";

interface PromptForm {
  onSubmit: (value: string) => void;
}

export default function PromptForm() {
  return (
    <form>
      <div className="flex border rounded-md h-16 w-full gap-2">
        <div className="pl-2 pt-2">
          <Button
            type="button"
            className="rounded-full"
            variant="outline"
            size="icon"
          >
            <IconAdd />
          </Button>
        </div>
        <textarea className="w-full h-full px-4 py-5 text-sm resize-none focus:outline-none rounded-md"></textarea>
        <div className="pr-2 pt-2">
          <Button type="submit" size="icon">
            <IconEnter />
          </Button>
        </div>
      </div>
    </form>
  );
}
