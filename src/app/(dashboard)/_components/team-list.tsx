import { FC } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "./navigation/nav-item";
import { db } from "@/app/_shared/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { getSession } from "@/app/_shared/utils/get-session";

export const TeamList: FC = async () => {
  const session = await getSession();

  if (!session) return null;

  const teams = await db.team.findMany({
    where: { memberships: { some: { userId: session.user.id } } },
  });

  return (
    <NavItemGroup>
      <span>Teams</span>
      {teams.map((team) => (
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
      ))}
      <Link href="/dashboard/account/create-team">
        <NavItem>
          <NavItemIcon>
            <Plus />
          </NavItemIcon>
          <NavItemLabel>Create Team</NavItemLabel>
        </NavItem>
      </Link>
    </NavItemGroup>
  );
};
