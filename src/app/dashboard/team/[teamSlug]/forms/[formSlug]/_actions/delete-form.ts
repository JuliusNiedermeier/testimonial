"use server";

import { db } from "@app/_db";
import { revalidateTag } from "next/cache";

export const deleteForm = async (id: string) => {
  "use server";

  const deletedForm = await db.form.delete({ where: { id } });
  revalidateTag(`form:${deletedForm.id}`);

  return deletedForm;
};
