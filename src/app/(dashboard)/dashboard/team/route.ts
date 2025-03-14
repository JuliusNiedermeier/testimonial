import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/auth";
import { unstable_cacheTag } from "next/cache";
import { redirect } from "next/navigation";

const getTeamById = async (id: string) => {
  "use cache";
  unstable_cacheTag(`team:${id}`);
  return await db.team.findFirst({ where: { id } });
};

export const GET = async () => {
  const session = await getSession({ require: true });

  if (!session.user.lastVisitedTeamId) redirect("/dashboard/account");

  const lastVisitedTeam = await getTeamById(session.user.lastVisitedTeamId);

  // There is no need to check if he has a valid membership, bacause that is already checked on the team level.
  if (lastVisitedTeam) redirect(`/dashboard/team/${lastVisitedTeam.slug}`);
};
