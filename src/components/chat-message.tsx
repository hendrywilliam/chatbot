import * as React from "react";
import { UseChatHelpers } from "@/types";
import { IconUser } from "@/components/icons/icon-user";
import { IconAssistant } from "@/components/icons/icon-assistant";
import { ChatAction } from "@/components/chat-action";
import ReactMarkdown from "react-markdown";
import { Code } from "@/components/code";

interface ChatMessageProps extends Pick<UseChatHelpers, "messages"> {}

export function ChatMessage({ messages }: ChatMessageProps) {
  return (
    <>
      {messages.map((item) => {
        return (
          <div
            id="chat-wrapper"
            className="flex w-full h-max py-6 gap-2 xl:gap-6"
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
            <div
              id="chat-content"
              className="w-full first:mb-2 last:mt-2 leading-relaxed box-border"
            >
              {/* eslint-disable */}
              <ReactMarkdown
                children={item.content}
                components={{
                  pre({ children }) {
                    return <pre className="w-full">{children}</pre>;
                  },
                  p({ children }) {
                    return <p className="my-4">{children}</p>;
                  },
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match && <Code {...props}>{children}</Code>;
                  },
                }}
              />
            </div>
            <ChatAction message={item.content} />
          </div>
        );
      })}
    </>
  );
}
