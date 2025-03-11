"use server";

import { getSession } from "@/app/_shared/utils/auth";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const updateUserName = async (name: string) => {
  "use server";

  await getSession({ require: true });

  const { status } = await auth.api.updateUser({
    body: { name },
    headers: await headers(),
  });

  if (!status) return null;

  revalidatePath("/dashboard");

  return name;
};
