"use server";

import { db } from "@app/_db";
import { getSession } from "@app/_auth/server";
import { revalidateTag } from "next/cache";

export const updateLastVisitedTeamId = async (teamId: string) => {
  "use server";

  const session = await getSession({ require: true });

  const updatedUser = await db.user.update({
    where: { id: session.user.id },
    data: { lastVisitedTeamId: teamId },
  });

  revalidateTag(`user:${updatedUser.id}`);

  return updatedUser;
};
