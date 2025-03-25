"use server";

import { db } from "@/shared/db";
import { getSession } from "@/shared/auth/server";
import { revalidateTag } from "next/cache";
import slugify from "slugify";

interface CreateFormConfig {
  title: string;
  teamSlug: string;
}

export const createForm = async ({ title, teamSlug }: CreateFormConfig) => {
  "use server";

  await getSession({ require: true });

  const form = await db.form.create({
    data: {
      title,
      slug: slugify(title, { lower: true }),
      team: { connect: { slug: teamSlug } },
    },
  });

  revalidateTag(`form(collection):${form.teamId}`);

  return form;
};
