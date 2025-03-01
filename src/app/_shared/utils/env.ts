import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

// Explicitly loading env here to be able to use this outside of a running next project
// This way env can be used inside drizzle.config.ts
loadEnvConfig(cwd());

export const env = createEnv({
  server: {
    NEON_URL: z.string().url(),
  },

  client: {},

  experimental__runtimeEnv: {},
});
