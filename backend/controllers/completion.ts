import type { Request, Response } from "express";
import { openai } from "../utils/openai";
import { CompletionRequest } from "../types/completion";

export const completion = async function (req: Request, res: Response) {
    try {
        const body = req.body as CompletionRequest;
        req.socket.addListener("close", () => {
            req.log.info("connection closed.");
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "developer", content: "You are a helpful assistant." },
                ...body.messages,
            ],
            stream: true,
        });
        res.writeHead(200, {
            "content-type": "text/event-stream",
            connection: "keep-alive",
            "cache-control": "no-cache",
        });
        for await (const chunk of completion) {
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
        req.socket.removeAllListeners();
    }
};
