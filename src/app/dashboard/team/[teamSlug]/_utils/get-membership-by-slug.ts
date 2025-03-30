import { Membership } from "@prisma/client";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "root/src/app/_db";

export interface GetMembershipBySlugConfig<R extends boolean> {
  userId: string;
  teamSlug: string;
  require?: R;
}

export type GetMembershipBySlugResult<R extends boolean> = R extends true
  ? Membership
  : Membership | null;

export const getMembershipBySlug = cache(
  async <R extends boolean>(config: GetMembershipBySlugConfig<R>) => {
    const membership = await db.membership.findFirst({
      where: { userId: config.userId, team: { slug: config.teamSlug } },
    });

    if (config.require && !membership) redirect("/login");

    return membership;
  }
);
