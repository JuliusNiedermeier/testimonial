import { Membership } from "@prisma/client";
import { unstable_cacheTag } from "next/cache";
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
    "use cache";

    const membership = await db.membership.findFirst({
      where: { userId: config.userId, team: { slug: config.teamSlug } },
    });

    if (config.require && !membership) redirect("/login");

    if (membership) {
      unstable_cacheTag(`membership:${membership.teamId}:${membership.userId}`);
    }

    return membership;
  }
);
