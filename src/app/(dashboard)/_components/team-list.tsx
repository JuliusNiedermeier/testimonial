import { NavItem, NavItemIcon, NavItemLabel } from "./navigation/nav-item";
import { db } from "@/app/_shared/db";
import Link from "next/link";
import Image from "next/image";
import { Team } from "@prisma/client";
import { withSuspense } from "@/app/_shared/components/utils/with-suspense";
import { SFC, WithFallbackProps } from "@/app/_shared/utils/types";

export const TeamList = withSuspense<{ userId: string }>(async ({ userId }) => {
  const teams = await db.team.findMany({
    where: { memberships: { some: { userId } } },
  });

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
