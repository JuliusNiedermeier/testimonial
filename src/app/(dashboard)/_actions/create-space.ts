"use server";

import { db } from "@/app/_shared/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import slugify from "slugify";

export const createSpace = async (title: string) => {
  "use server";

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;

  const space = await db.space.create({
    data: {
      title,
      slug: slugify(title, { lower: true }),
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return space;
};
