import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./app/infra/db/migrations",
  schema: "./app/infra/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    password: process.env.DB_PASSWORD!,
    user: process.env.DB_USER!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    ssl: false,
  },
  casing: "snake_case",
  strict: true,
  verbose: true,
});
