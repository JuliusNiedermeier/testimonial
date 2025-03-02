"use server";

import { db } from "@/app/_shared/db";
import { revalidatePath } from "next/cache";

export const deleteSpace = async (id: string) => {
  "use server";
  const deletedSpace = await db.space.delete({ where: { id } });
  revalidatePath("/dashboard");
  return deletedSpace;
};
