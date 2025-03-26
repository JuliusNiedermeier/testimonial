import {
  NavItem,
  NavItemIcon,
  NavItemLabel,
} from "@app/dashboard/_components/nav-item";
import { db } from "@app/_db";
import Link from "next/link";
import Image from "next/image";
import { Team } from "@prisma/client";
import { withSuspense } from "@app/_components/with-suspense";
import { SFC, WithFallbackProps } from "@app/_utils/types";
import { unstable_cacheTag } from "next/cache";

const getTeamsByUserId = async (userId: string) => {
  "use cache";

  const teams = await db.team.findMany({
    where: { memberships: { some: { userId } } },
  });

  unstable_cacheTag(`team(collection):${userId}`);
  unstable_cacheTag(...teams.map((team) => `team:${team.id}`));

  return teams;
};

export const TeamList = withSuspense<{ userId: string }>(async ({ userId }) => {
  "use cache";
  const teams = await getTeamsByUserId(userId);
  return <TeamListUI teams={teams} />;
});

export const TeamListUI: SFC<WithFallbackProps<{ teams: Team[] }, object>> = (
  props
) => {
  if (props.fallback) {
    return Array.from(new Array(3)).map((_, index) => (
      <NavItem key={index} fallback style={{ opacity: (3 - index) / 3 }} />
    ));
  }

  return props.teams.map((team) => (
    <Link key={team.id} href={`/dashboard/team/${team.slug}/testimonials`}>
      <NavItem>
        <NavItemIcon className="relative rounded overflow-hidden h-full">
          <Image
            src="/logo.svg"
            alt={team.name}
            fill
            className="object-cover"
          />
        </NavItemIcon>
        <NavItemLabel>{team.name}</NavItemLabel>
      </NavItem>
    </Link>
  ));
};
