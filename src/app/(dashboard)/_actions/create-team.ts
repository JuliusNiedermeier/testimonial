"use server";

import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/auth";
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
