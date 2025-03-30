"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

interface CreateTeamConfig {
  title: string;
  teamSlug: string;
}

export const createForm = async ({ title, teamSlug }: CreateTeamConfig) => {
  "use server";

  const session = await getSession({ require: true });

  const team = await db.team.findFirst({
    where: {
      slug: teamSlug,
      memberships: { some: { userId: session.user.id } },
    },
  });

  if (!team) return false;

  const form = await db.form.create({
    data: {
      title,
      slug: slugify(title, { lower: true }),
      teamId: team.id,
    },
  });

  revalidateTag(`form(collection):${team.id}`);

  redirect(`/dashboard/team/${team.slug}/forms/${form.slug}`);
};
