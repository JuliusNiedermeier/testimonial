import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { env } from "@/app/_shared/utils/env";

// For more info on how to configure Prisma with the Neon serverless driver visit https://neon.tech/docs/guides/prisma

neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

const pool = new Pool({ connectionString: env.NEON_URL });
const adapter = new PrismaNeon(pool);

// The created Prisma client is attached to the global object so that only one instance of the client is created in the application.
// This helps resolve issues with hot reloading that can occur when using Prisma ORM with Next.js in development mode.
// https://www.prisma.io/docs/guides/nextjs#25-set-up-prisma-client
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help

// Instead of extending the global type like suggested in Neon docs (https://neon.tech/docs/guides/prisma#use-the-neon-serverless-driver-with-prisma),
// a local reference to global is created and typed as a superset of globalThis, including a prisma property.
// This prevents TypeScript from suggesting prisma elsewhere on the global object.
type GlobalWithPrisma = typeof globalThis & { prismaClient?: PrismaClient };
const globalReference: GlobalWithPrisma = global;

export const db = globalReference.prismaClient || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") globalReference.prismaClient = db;
