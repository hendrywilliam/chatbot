"use client";

import { Button } from "@/components/ui/button";
import { ToolsIcon } from "@/components/ui/icons";
import { Slider } from "@/components/ui/slider";
import { UseChatHelpers } from "@/types";
import { models } from "@/config/models";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface ChatSettingsProps
  extends Pick<UseChatHelpers, "setModelSettings" | "modelSettings"> {}

export default function ChatSettings({
  modelSettings,
  setModelSettings,
}: ChatSettingsProps) {
  const [openCombobox, setOpenCombobox] = useState(false);

  return (
    <div className="flex h-12 w-full items-center justify-end gap-2 bg-background px-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="xs" variant="outline">
            <ToolsIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="flex flex-col space-y-3 text-xs">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p>Temperature</p>
                <p>{modelSettings.temperature}</p>
              </div>
              <Slider
                defaultValue={[modelSettings.temperature as number]}
                max={2}
                step={0.1}
                onValueChange={(value) => {
                  setModelSettings({
                    ...modelSettings,
                    temperature: Number(value[0]),
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p>Max Tokens</p>
                <p>{modelSettings.max_tokens}</p>
              </div>
              <Slider
                defaultValue={[modelSettings.max_tokens as number]}
                max={2000}
                onValueChange={(value) => {
                  setModelSettings({
                    ...modelSettings,
                    max_tokens: value[0],
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p>Top P</p>
                <p>{modelSettings.top_p}</p>
              </div>
              <Slider
                defaultValue={[modelSettings.top_p as number]}
                max={1}
                step={0.1}
                onValueChange={(value) => {
                  setModelSettings({
                    ...modelSettings,
                    top_p: value[0],
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p>Presence Penalty</p>
                <p>{modelSettings.presence_penalty}</p>
              </div>
              <Slider
                defaultValue={[modelSettings.presence_penalty as number]}
                max={2}
                min={-2}
                step={0.1}
                onValueChange={(value) => {
                  setModelSettings({
                    ...modelSettings,
                    presence_penalty: value[0],
                  });
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between px-2 text-xs"
            size="xs"
          >
            {modelSettings.model
              ? models.find((model) => model.value === modelSettings.model)
                  ?.value
              : "Select models."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  aria-disabled={false}
                  className="inline-flex w-full gap-2"
                  onSelect={(currentValue) => {
                    setModelSettings({
                      ...modelSettings,
                      model:
                        currentValue === modelSettings.model
                          ? modelSettings.model
                          : currentValue,
                    });
                    setOpenCombobox(false);
                  }}
                >
                  <model.icon className="h-4 w-4 fill-black stroke-black" />
                  {model.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
