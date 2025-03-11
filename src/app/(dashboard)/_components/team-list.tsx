import {
  NavItem,
  NavItemIcon,
  NavItemLabel,
  NavItemSkeleton,
} from "./navigation/nav-item";
import { db } from "@/app/_shared/db";
import Link from "next/link";
import Image from "next/image";
import { withSuspenseFallback } from "@/app/_shared/utils/suspense-fallback";
import { Team } from "@prisma/client";

export const TeamList = withSuspenseFallback<
  { userId: string },
  { teams: Team[] }
>({
  AsyncComponent: async ({ UIComponent, userId }) => {
    const teams = await db.team.findMany({
      where: { memberships: { some: { userId } } },
    });

    return <UIComponent teams={teams} />;
  },
  UIComponent: (props) => {
    if (props.suspended) {
      return Array.from(new Array(2)).map((_, index) => (
        <NavItemSkeleton key={index} />
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
  },
});
