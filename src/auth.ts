import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/shared/db";
import { env } from "@/shared/utils/env";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),

  baseURL: env.NEXT_PUBLIC_BASE_URL,

  socialProviders: {
    github: {
      clientId: env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      lastVisitedTeamId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email !== env.AUTHORIZED_USER_EMAIL) {
            throw new APIError("UNAUTHORIZED", {
              message: `Signing up with email "${user.email}" is currently not allowed.`,
            });
          }
          return true;
        },
      },
    },
  },
});
