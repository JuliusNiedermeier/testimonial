import { db } from "@/app/_shared/db";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  if (!session.user.lastVisitedTeamId) redirect("/dashboard/account");

  const lastVisitedTeam = await db.team.findFirst({
    where: { id: session.user.lastVisitedTeamId },
  });

  // There is no need to check if he has a valid membership, bacause that is already checked on the team level.
  if (lastVisitedTeam) redirect(`/dashboard/team/${lastVisitedTeam.slug}`);
};
