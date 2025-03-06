import { db } from "@/app/_shared/db";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import slugify from "slugify";

export const GET = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  // If set, redirect the user to the last visited team
  // There is no need to check if he has a valid membership, bacause that is already checked on the team level.
  if (session.user.lastVisitedTeamId) {
    const lastVisitedTeam = await db.team.findFirst({
      where: { id: session.user.lastVisitedTeamId },
    });
    if (lastVisitedTeam) redirect(`/dashboard/team/${lastVisitedTeam.slug}`);
  }

  const firstMembership = await db.membership.findFirst({
    where: { userId: session.user.id },
    include: { team: true },
  });

  if (firstMembership) redirect(`/dashboard/team/${firstMembership.team.slug}`);

  const defaultTeamName = `${session.user.name}s Team`;

  const defaultTeam = await db.team.create({
    data: {
      slug: slugify(defaultTeamName, { lower: true }),
      name: defaultTeamName,
      memberships: { create: { userId: session.user.id } },
    },
  });

  redirect(`/dashboard/team/${defaultTeam.slug}`);
};
