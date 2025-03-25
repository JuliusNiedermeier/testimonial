"use server";

import { db } from "@/shared/db";
import { getSession } from "@/shared/auth/server";
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

  redirect(`/dashboard/team/${team.slug}`);
};
