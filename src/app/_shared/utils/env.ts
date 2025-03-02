import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { cwd } from "process";

// Explicitly loading env here to be able to use this outside of a running next project
// This way env can be used inside scripts outside of a running Nextjs application.
if (typeof window === "undefined") {
  // Dynamically importing loadEnvConfig only if on the server.
  // When statically importing it, @next/env will try to access "fs", even if on the client.
  const { loadEnvConfig } = await import("@next/env");
  loadEnvConfig(cwd());
}

export const env = createEnv({
  server: {
    NEON_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_GITHUB_CLIENT_ID: z.string().min(1),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  },
});
