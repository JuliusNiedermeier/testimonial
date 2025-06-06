"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

interface CreateTeamConfig {
  name: string;
}

export const createTeam = async ({ name }: CreateTeamConfig) => {
  "use server";

  const session = await getSession({ require: true });

  const team = await db.team.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      memberships: { create: { userId: session.user.id } },
    },
  });

  revalidateTag(`team(collection):${session.user.id}`);
  revalidateTag(`team:${team.slug}`);

  redirect(`/dashboard/team/${team.slug}`);
};
