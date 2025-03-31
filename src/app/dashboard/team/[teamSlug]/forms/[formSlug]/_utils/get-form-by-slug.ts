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

  // It is important to tag this with the form slug,
  // to be able to create a new form with a slug of a previously deleted form.
  // If a form is deleted, form:[form-id] is revalidated and getFormBySlug returns null for the deleted slug.
  // When a form with the same slug is created again, the input values for this function do not change,
  // and the id of the new form is different, so it cant be used to revalidate this function call.
  // Bacause of this getFormBySlug will return the cached null value.
  // By tagging this also with the form slug, we have a way of revalidating this function after form deletion.
  unstable_cacheTag(`form:${config.formSlug}`);

  return form;
};
