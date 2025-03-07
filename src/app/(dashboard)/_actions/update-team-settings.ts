"use server";

import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/get-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface UpdateTeamSettingsConfig {
  teamSlug: string;
  data: {
    name?: string;
    slug?: string;
  };
}

export const updateTeamSettings = async ({
  teamSlug,
  data,
}: UpdateTeamSettingsConfig) => {
  "use server";

  const session = await getSession();

  if (!session) return null;

  const updatedTeam = await db.team.update({
    where: {
      slug: teamSlug,
      memberships: { some: { userId: session.user.id } },
    },
    data,
  });

  if (!updatedTeam) return null;

  revalidatePath("/dashboard");
  redirect(`/dashboard/team/${updatedTeam.slug}/settings`);
};
