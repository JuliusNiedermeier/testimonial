import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/app/_shared/utils/env";
import * as schema from "@/app/_shared/db/schema";

export const db = drizzle(env.NEON_URL, { schema });
