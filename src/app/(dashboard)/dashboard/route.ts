import { db } from "@/app/_shared/db";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import slugify from "slugify";

export const GET = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const firstMembership = await db.membership.findFirst({
    where: { userId: session.user.id },
    include: { team: true },
  });

  if (firstMembership) redirect(`/dashboard/${firstMembership.team.slug}`);

  const defaultTeamName = `${session.user.name}s Team`;

  const defaultTeam = await db.team.create({
    data: {
      slug: slugify(defaultTeamName, { lower: true }),
      name: defaultTeamName,
      memberships: { create: { userId: session.user.id } },
    },
  });

  redirect(`/dashboard/${defaultTeam.slug}`);
};
