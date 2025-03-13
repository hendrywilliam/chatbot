import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../db/schema";
import { databaseURL } from "./env";

const client = postgres(databaseURL);
export const db = drizzle(client, { schema: schema });
