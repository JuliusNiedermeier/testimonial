import { betterAuth, BetterAuthError } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./app/_shared/db";
import { env } from "./app/_shared/utils/env";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),

  baseURL: env.NEXT_PUBLIC_BASE_URL,

  socialProviders: {
    github: {
      clientId: env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email !== env.AUTHORIZED_USER_EMAIL) {
            throw new BetterAuthError(
              `A user attempted to sign up with an unauthoried email: ${user.email}`
            );
          }
          return true;
        },
      },
    },
  },
});
