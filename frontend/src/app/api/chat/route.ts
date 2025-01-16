import "dotenv/config";
import { openai } from "@/utils/open-ai";
import { ChatRequestBody } from "@/types/open-ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ChatRequestBody;
        const signal = request.signal;
        const response = await fetch(
            "https://bahanbakarnasi.cloud/completion",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    messages: body.messages,
                }),
                signal: signal,
            },
        );
        return new Response(response.body, {
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
