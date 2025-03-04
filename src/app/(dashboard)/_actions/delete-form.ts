"use server";

import { db } from "@/app/_shared/db";
import { revalidatePath } from "next/cache";

export const deleteForm = async (id: string) => {
  "use server";
  const deletedForm = await db.form.delete({ where: { id } });
  revalidatePath("/dashboard");
  return deletedForm;
};
