import { Message } from "@/types";
import { PdfChatMessage } from "./chat-message";

interface Props {
  messages: Message[];
}

export function PdfMessageList({ messages }: Props) {
  return (
    <>
      {messages.map((message) => {
        return <PdfChatMessage key={message.id} message={message} />;
      })}
    </>
  );
}
