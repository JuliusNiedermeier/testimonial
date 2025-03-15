"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "./env";
import { type auth } from "@/auth";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL, // the base url of the auth server
  plugins: [inferAdditionalFields<typeof auth>()],
});
