"use server";

import { db } from "@/app/_shared/db";
import { spaceTable } from "@/app/_shared/db/schema";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export const createSpace = async (title: string) => {
  "use server";
  await db
    .insert(spaceTable)
    .values({ title, slug: slugify(title, { lower: true }) });
  revalidatePath("/dashboard");
};
