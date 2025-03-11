import Link from "next/link";
import {
  NavItem,
  NavItemIcon,
  NavItemLabel,
  NavItemSkeleton,
} from "./navigation/nav-item";
import { ChevronLeft } from "lucide-react";
import { db } from "@/app/_shared/db";
import { withSuspenseFallback } from "@/app/_shared/utils/suspense-fallback";
import { Session } from "@/app/_shared/utils/auth";

export const BackToTeamButton = withSuspenseFallback<
  { user: Session["user"] },
  { teamName: string }
>({
  AsyncComponent: async ({ UIComponent, user }) => {
    if (!user.lastVisitedTeamId) return null;

    const team = await db.team.findFirst({
      where: { id: user.lastVisitedTeamId },
    });

    if (!team) return null;

    return <UIComponent teamName={team.name} />;
  },
  UIComponent: (props) => {
    if (props.suspended) return <NavItemSkeleton />;

    return (
      <Link href={"/dashboard/team"}>
        <NavItem>
          <NavItemIcon>
            <ChevronLeft />
          </NavItemIcon>
          <NavItemLabel>Back to {props.teamName}</NavItemLabel>
        </NavItem>
      </Link>
    );
  },
});
