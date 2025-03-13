import ReactMarkdown from "react-markdown";
import { GeistSans } from "geist/font/sans";
import { Code } from "./code";
import { fira_code } from "@/utils/fonts";

type Props = {
    content: string;
};

export default function Markdown({ content }: Props) {
    return (
        <>
            {/* eslint-disable */}
            <ReactMarkdown
                children={content}
                className={`${GeistSans.className} w-full whitespace-normal break-words font-medium leading-loose text-start`}
                components={{
                    p({ children }) {
                        return <p className="mb-2 w-full">{children}</p>;
                    },
                    li({ children }) {
                        return <li className="mb-2">{children}</li>;
                    },
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <Code language={match[0].split("-")[1]} {...props}>
                                {children}
                            </Code>
                        ) : (
                            <code className={`${fira_code.className}`}>
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </>
    );
}
