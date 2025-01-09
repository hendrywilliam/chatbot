import "dotenv/config";
import { openai } from "@/utils/open-ai";
import { SpeechRequestBody } from "@/types";

export async function POST(request: Request) {
    const body = (await request.json()) as SpeechRequestBody;
    try {
        const { content } = body;
        if (content.length <= 0) {
            throw new Error("missing parameter: content");
        }

        const voice = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: body.content,
        });
        const buffer = await voice.arrayBuffer();
        return new Response(buffer, {
            status: 200,
            statusText: "OK",
        });
    } catch (error) {
        return Response.json(
            { message: (error as Error).message },
            { status: 400, statusText: "Bad Request" },
        );
    }
}
