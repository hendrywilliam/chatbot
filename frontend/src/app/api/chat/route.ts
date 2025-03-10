import "dotenv/config";
import { createHmac } from "@/utils/hmac";
import "dotenv/config";
import { CompletionMessage } from "@/types/google-ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as CompletionMessage;
        const signal = request.signal;
        const mac = createHmac(`POST|/completion|${JSON.stringify(body)}`)
        const response = await fetch(
            `${process.env.BACKEND_BASE_URL}/completion`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-auth": mac,
                    accept: "text/event-stream",
                },
                body: JSON.stringify(body),
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
            { message: "internal server error" },
            { status: 500 },
        );
    }
}
