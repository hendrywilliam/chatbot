import { createClient, RedisClientType } from "redis";
import { log } from "./log";

// This will connect to default: localhost:6379.
export const redisClient = createClient();
redisClient.on("error", (error) => log.error(error));
