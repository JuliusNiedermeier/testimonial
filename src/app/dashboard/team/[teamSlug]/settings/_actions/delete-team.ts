"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteTeamConfig {
  teamSlug: string;
}

export const deleteTeam = async ({ teamSlug }: DeleteTeamConfig) => {
  "use server";

  const session = await getSession({ require: true });

  const deletedTeam = await db.team.delete({
    where: {
      slug: teamSlug,
      memberships: { some: { userId: session.user.id } },
    },
  });

  if (!deletedTeam) return null;

  await db.user.update({
    where: { id: session.user.id },
    data: { lastVisitedTeam: undefined },
  });

  revalidateTag(`team:${deletedTeam.id}`);
  revalidateTag(`user:${session.user.id}`);

  redirect("/dashboard/account");
};
