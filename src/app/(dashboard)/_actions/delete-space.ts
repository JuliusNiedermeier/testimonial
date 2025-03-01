"use server";

import { db } from "@/app/_shared/db";
import { spaceTable } from "@/app/_shared/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteSpace = async (id: string) => {
  "use server";
  await db.delete(spaceTable).where(eq(spaceTable.id, id));
  revalidatePath("/dashboard");
};
