"use server";

import { db } from "@app/_db";
import { revalidateTag } from "next/cache";
import { getSession } from "root/src/app/_auth/server";

export const deleteForm = async (teamSlug: string, formSlug: string) => {
  "use server";

  const session = await getSession({ require: true });

  const deletedForm = await db.form.delete({
    where: {
      slug: formSlug,
      team: {
        slug: teamSlug,
        memberships: { some: { userId: session.user.id } },
      },
    },
  });

  revalidateTag(`form:${deletedForm.id}`);

  return deletedForm;
};
