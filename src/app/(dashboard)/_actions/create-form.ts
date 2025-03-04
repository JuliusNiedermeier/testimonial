"use server";

import { db } from "@/app/_shared/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import slugify from "slugify";

interface CreateFormConfig {
  title: string;
  teamSlug: string;
}

export const createForm = async ({ title, teamSlug }: CreateFormConfig) => {
  "use server";

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;

  const form = await db.form.create({
    data: {
      title,
      slug: slugify(title, { lower: true }),
      team: { connect: { slug: teamSlug } },
    },
  });

  revalidatePath("/dashboard");
  return form;
};
