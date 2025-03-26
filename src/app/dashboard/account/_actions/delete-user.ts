"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { auth } from "@app/_auth/config";
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
