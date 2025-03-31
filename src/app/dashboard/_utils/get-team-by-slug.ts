import { db } from "@app/_db";
import { unstable_cacheTag } from "next/cache";

export const getTeamBySlug = async (slug: string) => {
  "use cache";

  const team = await db.team.findFirst({ where: { slug } });
  if (team) unstable_cacheTag(`team:${team.id}`);

  unstable_cacheTag(`team:${slug}`);

  return team;
};
