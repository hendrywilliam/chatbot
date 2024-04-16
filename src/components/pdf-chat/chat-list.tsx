import { Message } from "@/types";
import { PdfChatMessage } from "./chat-message";

interface Props {
  messages: Message[];
}

export default function ChatList({ messages }: Props) {
  return (
    <div className="h-full flex-1 flex-col overflow-y-auto">
      {messages.map((message) => {
        return <PdfChatMessage key={message.id} message={message} />;
      })}
    </div>
  );
}
