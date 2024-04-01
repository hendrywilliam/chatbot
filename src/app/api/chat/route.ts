import "dotenv/config";
import { openai } from "@/lib/open-ai";
import { ChatRequestBody } from "@/types/open-ai";
import { chatCompletionSnapshots } from "@/lib/snapshots/chat-completion";
import { createFakeStream, chatCompletionGenerator } from "@/lib/stream";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    /** Abort controller coming from the client. */
    const signal = request.signal;
    const isDevelopment = process.env.NODE_ENV === "development";

    /** A fake stream while working in development environment, you dont need to call the actual API. */
    if (isDevelopment) {
      const stream = chatCompletionGenerator(chatCompletionSnapshots);

      return new Response(createFakeStream(stream, signal), {
        headers: {
          "Content-Type": "text/event-stream",
          Connection: "keep-alive",
          "Cache-Control": "no-cache",
        },
        status: 200,
      });
    }

    const chatCompletion = await openai.chat.completions.create(
      {
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          ...(body.messages ?? []),
        ],
        model: body.model,
        stream: true,
        temperature: body.temperature,
        max_tokens: body.max_tokens,
      },
      { signal: signal },
    );

    return new Response(chatCompletion.toReadableStream(), {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
      status: 200,
    });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
