import { db } from "@/shared/db";
import { unstable_cacheTag } from "next/cache";

export const getTeamById = async (id: string) => {
  "use cache";
  unstable_cacheTag(`team:${id}`);
  return await db.team.findFirst({ where: { id } });
};
