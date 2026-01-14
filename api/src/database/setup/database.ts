import "dotenv/config";
import type { Database } from "./types.js";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env["DATABASE_HOST"],
    user: process.env["DATABASE_USER"],
    database: process.env["DATABASE_NAME"],
    password: process.env["DATABASE_PASSWORD"],
    port: Number(process.env["DATABASE_PORT"]),
    // ssl: true,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
