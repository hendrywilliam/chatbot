import type { Request, Response } from "express";
import { genAI } from "../utils/gemini-ai";
import { CompletionRequest } from "../types/completion";

export const completion = async function (req: Request, res: Response) {
    const ac = new AbortController();
    function close() {
        ac.abort();
        req.log.info("connection aborted");
    }
    try {
        const body = req.body as CompletionRequest;
        req.socket.addListener("close", close);
        const completion = await genAI
            .getGenerativeModel({ model: "gemini-1.5-flash" })
            .generateContentStream({
                contents: body.contents,
            });
        res.writeHead(200, {
            "content-type": "text/event-stream",
            connection: "keep-alive",
            "cache-control": "no-cache",
        });
        for await (const chunk of completion.stream) {
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        res.end();
    } catch (error: unknown) {
        if (!res.headersSent) {
            res.writeHead(400, {
                "content-type": "application/alto-error+json",
                connection: "closed",
            });
        }
        req.log.error((error as Error).message ?? "Something went wrong.");
        if (!res.writableEnded) {
            res.write(
                JSON.stringify({
                    meta: { error: "Internal server error." },
                })
            );
        }
        res.end();
    } finally {
        req.socket.removeListener("close", close);
    }
};
