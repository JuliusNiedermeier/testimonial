"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { revalidateTag } from "next/cache";
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

  const session = await getSession({ require: true });

  const updatedTeam = await db.team.update({
    where: {
      slug: teamSlug,
      memberships: { some: { userId: session.user.id } },
    },
    data,
  });

  if (!updatedTeam) return null;

  revalidateTag(`team:${updatedTeam.id}`);

  redirect(`/dashboard/team/${updatedTeam.slug}/settings`);
};
