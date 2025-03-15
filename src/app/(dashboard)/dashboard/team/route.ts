import { getSession } from "@/app/_shared/utils/auth";
import { redirect } from "next/navigation";
import { getTeamById } from "../../_utils/get-team-by-id";

export const GET = async () => {
  const session = await getSession({ require: true });

  if (!session.user.lastVisitedTeamId) redirect("/dashboard/account");

  const lastVisitedTeam = await getTeamById(session.user.lastVisitedTeamId);

  // There is no need to check if he has a valid membership, bacause that is already checked on the team level.
  if (lastVisitedTeam) redirect(`/dashboard/team/${lastVisitedTeam.slug}`);
};
