import { Message } from "@/types";
import { UserIcon, BotIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface Props {
  message: Message;
}

export function PdfChatMessage({ message }: Props) {
  return (
    <div
      className={cn([
        "flex h-max w-full space-x-4 px-4 py-2 lg:px-10 lg:py-5",
        message.role === "user" ? "bg-bg-ui-bg-component" : "bg-background",
      ])}
    >
      <div id="chat-role" className="w-8">
        {message.role === "user" ? (
          <div className="flex h-8 w-8 items-center justify-center rounded border bg-background">
            <UserIcon />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded border bg-black">
            <BotIcon className="fill-white stroke-white" />
          </div>
        )}
      </div>
      <div className="flex items-center leading-loose">
        <p>{message.content}</p>
      </div>
    </div>
  );
}
