"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface UpdateFormSettingsConfig {
  teamSlug: string;
  formSlug: string;
  data: {
    title?: string;
    slug?: string;
  };
}

export const updateFormSettings = async ({
  teamSlug,
  formSlug,
  data,
}: UpdateFormSettingsConfig) => {
  "use server";

  const session = await getSession({ require: true });

  const updatedForm = await db.form.update({
    where: {
      slug: formSlug,
      team: {
        slug: teamSlug,
        memberships: { some: { userId: session.user.id } },
      },
    },
    data,
  });

  if (!updatedForm) return null;

  revalidateTag(`form:${updatedForm.id}`);

  redirect(`/dashboard/team/${teamSlug}/forms/${updatedForm.slug}`);
};
