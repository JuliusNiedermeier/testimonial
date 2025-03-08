import Link from "next/link";
import { FC } from "react";
import { NavItem, NavItemIcon, NavItemLabel } from "./navigation/nav-item";
import { ChevronLeft } from "lucide-react";
import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/get-session";

export const BackToTeamButton: FC = async () => {
  const session = await getSession();

  if (!session?.user.lastVisitedTeamId) return null;

  const team = await db.team.findFirst({
    where: { id: session?.user.lastVisitedTeamId },
  });

  if (!team) return null;

  return (
    <Link href={"/dashboard/team"}>
      <NavItem>
        <NavItemIcon>
          <ChevronLeft />
        </NavItemIcon>
        <NavItemLabel>Back to {team.name}</NavItemLabel>
      </NavItem>
    </Link>
  );
};
