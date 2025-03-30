import { unstable_cacheTag } from "next/cache";
import { db } from "root/src/app/_db";

export const getFormBySlug = async (config: {
  teamSlug: string;
  formSlug: string;
}) => {
  "use cache";

  const form = await db.form.findFirst({
    where: {
      slug: config.formSlug,
      team: { slug: config.teamSlug },
    },
  });

  if (form) unstable_cacheTag(`form:${form.id}`);

  return form;
};
