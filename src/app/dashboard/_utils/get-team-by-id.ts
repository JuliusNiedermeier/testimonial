import { db } from "@app/_db";
import { unstable_cacheTag } from "next/cache";

export const getTeamById = async (id: string) => {
  "use cache";

  unstable_cacheTag(`team:${id}`);

  const team = await db.team.findFirst({ where: { id } });

  if (team) unstable_cacheTag(`team:${team.slug}`);

  return team;
};
