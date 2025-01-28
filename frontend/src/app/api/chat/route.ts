import "dotenv/config";
import { ChatRequestBody } from "@/types/open-ai";
import { createHmac } from "@/utils/hmac";
import "dotenv/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ChatRequestBody;
        const signal = request.signal;
        const mac = createHmac(`POST|/completion|${JSON.stringify(body)}`);
        const response = await fetch(
            `${process.env.BACKEND_BASE_URL}/completion`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-auth": mac,
                    accept: "text/event-stream",
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
            { message: "internal server error" },
            { status: 500 },
        );
    }
}
