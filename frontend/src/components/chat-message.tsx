import { Icons } from "./ui/icons";
import ReactMarkdown from "react-markdown";
import { Code } from "./code";

export type ChatMessage = {
    id: string | number;
    content: string;
};

export function UserChatMessage({ id, content }: ChatMessage) {
    return (
        <div
            className="group relative flex h-max w-full gap-6 py-6 xl:gap-6"
            key={id}
        >
            <ChatMessageContent content={content} className="text-end" />
            <div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-white shadow">
                    <Icons.user />
                </div>
            </div>
        </div>
    );
}

export function AIChatMessage({ id, content }: ChatMessage) {
    return (
        <div
            className="group relative flex h-max w-full gap-6 py-6 xl:gap-6"
            key={id}
        >
            <div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-black shadow">
                    <Icons.bot fill="white" />
                </div>
            </div>
            {content.length > 0 ? (
                <ChatMessageContent content={content} />
            ) : (
                <p className="animate-pulse">Thinking...</p>
            )}
        </div>
    );
}

type ChatMessageContent = {
    content: string;
    className?: string;
};

export function ChatMessageContent({ content, className }: ChatMessageContent) {
    return (
        <div className={`${className} w-full`}>
            {/* eslint-disable */}
            <ReactMarkdown
                children={content}
                className="w-full break-words leading-loose"
                components={{
                    p({ children }) {
                        return <p className="mb-4 w-full">{children}</p>;
                    },
                    li({ children }) {
                        return <li className="mb-1">{children}</li>;
                    },
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <Code language={match[0].split("-")[1]} {...props}>
                                {children}
                            </Code>
                        ) : (
                            <code className="rounded-full border border-border p-1 px-2 font-inter">
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </div>
    );
}
