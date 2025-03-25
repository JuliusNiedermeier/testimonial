"use server";

import { db } from "@/shared/db";
import { getSession } from "@/shared/auth/server";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const deleteUser = async () => {
  "use server";

  const session = await getSession({ require: true });

  const memberships = await db.membership.findMany({
    where: { userId: session.user.id },
    include: { team: true },
  });

  if (memberships.length) {
    return {
      status: "remove-memberships-first",
      teams: memberships.map(({ team }) => team),
    } as const;
  }

  const { success, message } = await auth.api.deleteUser({ body: {} });

  if (!success) return { status: "failed", message } as const;

  revalidateTag(`user:${session.user.id}`);

  redirect("/login");
};
