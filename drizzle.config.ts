import { env } from "@/app/_shared/utils/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/app/_shared/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NEON_URL,
  },
});
