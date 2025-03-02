"use server";

import { db } from "@/app/_shared/db";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export const createSpace = async (title: string) => {
  "use server";

  const space = await db.space.create({
    data: { title, slug: slugify(title, { lower: true }) },
  });

  revalidatePath("/dashboard");
  return space;
};
