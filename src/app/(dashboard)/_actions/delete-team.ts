"use server";

import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/get-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteTeamConfig {
  teamSlug: string;
}

export const deleteTeam = async ({ teamSlug }: DeleteTeamConfig) => {
  "use server";

  const session = await getSession();

  if (!session) return null;

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

  revalidatePath("/dashboard");
  redirect("/dashboard/account");
};
