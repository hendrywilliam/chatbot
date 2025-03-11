import express, { type Request, Response } from "express";
import { log } from "./utils/log";
import pinohttp from "pino-http";
import { completion } from "./controllers/completion";
import cors from "cors";
import { thouShallVerifyHMAC } from "./middlewares/verify-hmac";
import { redisClient } from "./utils/redis";
import cookieParser from "cookie-parser";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
    pinohttp({
        transport: {
            target: "pino-pretty",
        },
    })
);
app.use(cors());
app.use(cookieParser());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("chatbot.");
});

import { oauthCallback, oauthLogin } from "./controllers/auth";
app.get("/oauth-login", oauthLogin);
app.get("/oauth-callback", oauthCallback);

app.use(thouShallVerifyHMAC);
app.post("/completion", completion);

const server = app.listen(PORT, async () => {
    log.info(`Listening on ${PORT}`);
    await redisClient.connect();
    log.info(`Redis connection established.`);
});

async function gracefulShutdown(signal: NodeJS.Signals) {
    console.log(`signal: ${signal} accepted.`);
    server.close(() => {
        console.log("http server closed.");
    });
    await redisClient.disconnect();
    console.log("redis disconnected.");
    process.exit(0);
}

process.on("SIGTERM", (signal: NodeJS.Signals) => gracefulShutdown(signal));
process.on("SIGINT", (signal: NodeJS.Signals) => gracefulShutdown(signal));
// For testing.
process.on("SIGUSR1", (signal: NodeJS.Signals) => gracefulShutdown(signal));
