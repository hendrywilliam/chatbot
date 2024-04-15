import { PdfChatViewer } from "@/components/pdf-chat/chat-viewer";
import { PdfChatContainer } from "@/components/pdf-chat/chat-container";

export default function ChatPdfPage() {
  return (
    <PdfChatContainer>
      <PdfChatViewer />
    </PdfChatContainer>
  );
}
