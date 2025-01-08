import express from "express";
import { log } from "./utils/log";
import pinohttp from "pino-http";
import { completion } from "./controllers/completion";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(pinohttp());

app.post("/completion", completion);

const server = app.listen(PORT, async () => {
    log.info(`Listening on ${PORT}`);
});

async function gracefulShutdown(signal: NodeJS.Signals) {
    console.log(`signal: ${signal} accepted.`);
    server.close(() => {
        log.info("http server closed.");
    });
    process.exit(0);
}

process.on("SIGTERM", (signal: NodeJS.Signals) => gracefulShutdown(signal));
process.on("SIGINT", (signal: NodeJS.Signals) => gracefulShutdown(signal));
