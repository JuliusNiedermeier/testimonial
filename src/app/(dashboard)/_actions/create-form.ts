"use server";

import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/auth";
import { revalidatePath } from "next/cache";
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

  revalidatePath("/dashboard/team");
  return form;
};
