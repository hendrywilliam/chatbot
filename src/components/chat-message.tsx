import * as React from "react";
import { UseChatHelpers } from "@/types";
import { IconUser } from "@/components/icons/icon-user";
import { IconAssistant } from "@/components/icons/icon-assistant";
import { ChatAction } from "@/components/chat-action";

interface ChatMessageProps extends Pick<UseChatHelpers, "messages"> {}

export function ChatMessage({ messages }: ChatMessageProps) {
  return (
    <>
      {messages.map((item) => {
        return (
          <div
            id="chat-wrapper"
            className="flex w-full h-max py-6 gap-6"
            key={item.id}
          >
            <div id="chat-role">
              {item.role === "user" ? (
                <div className="inline-flex justify-center items-center w-8 h-8 border rounded-md shadow">
                  <IconUser />
                </div>
              ) : (
                <div className="inline-flex justify-center items-center w-8 h-8 border rounded-md shadow bg-black">
                  <IconAssistant fill="white" />
                </div>
              )}
            </div>
            <div id="chat-content" className="w-full">
              <p>{item.content}</p>
            </div>
            <ChatAction message={item.content} />
          </div>
        );
      })}
    </>
  );
}
