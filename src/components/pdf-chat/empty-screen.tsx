import { chatPdfExamples } from "@/config/chat-examples";
import { UsePdfChatHelpers } from "@/types";
import { Button } from "@/components/ui/button";

interface Props extends Pick<UsePdfChatHelpers, "setPrompt"> {}

export default function PdfEmptyScreen({ setPrompt }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="flex w-3/4 flex-col justify-center rounded bg-bg-ui-bg-component p-4">
        <p className="mb-4">
          To start a conversation, type your own prompt or use these examples:
        </p>
        {chatPdfExamples.map((example, index) => {
          return (
            <Button
              variant="outline"
              key={index}
              onClick={() => setPrompt(example.value)}
            >
              {example.value}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
