"use server";

import { db } from "@/shared/db";
import { getSession } from "@/shared/auth/server";
import { pick } from "@/shared/utils/omit";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";

// Updating this subset of user properties can probably be done safely using prisma,
// without using the better-auth api.

const updatableKeys = ["image", "name", "lastVisitedTeamId"] satisfies Array<
  keyof User
>;

export const updateUser = async (
  user: Partial<Pick<User, (typeof updatableKeys)[number]>>
) => {
  "use server";

  const session = await getSession({ require: true });

  const updatedUser = await db.user.update({
    where: { id: session.user.id },
    data: pick(user, updatableKeys),
  });

  revalidateTag(`user:${updatedUser.id}`);

  return updatedUser;
};
