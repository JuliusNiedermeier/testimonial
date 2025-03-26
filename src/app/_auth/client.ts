"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "@app/_utils/env";
import { type auth } from "@app/_auth/config";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL, // the base url of the auth server
  plugins: [inferAdditionalFields<typeof auth>()],
});
