import "dotenv/config";
import { openai } from "@/lib/open-ai";
import { ChatRequestBody } from "@/types/open-ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        ...body.messages,
      ],
      model: body.model,
      stream: true,
    });

    return new Response(chatCompletion.toReadableStream(), {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
      status: 200,
    });
  } catch (error) {
    return;
  }
}
