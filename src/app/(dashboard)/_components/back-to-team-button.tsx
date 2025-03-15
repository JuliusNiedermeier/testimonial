import Link, { LinkProps } from "next/link";
import { NavItem, NavItemIcon, NavItemLabel } from "./navigation/nav-item";
import { ChevronLeft } from "lucide-react";
import { Session } from "@/app/_shared/utils/auth";
import { withSuspense } from "@/app/_shared/components/utils/with-suspense";
import { SFC, WithFallbackProps } from "@/app/_shared/utils/types";
import { omit } from "@/app/_shared/utils/omit";
import { getTeamById } from "../_utils/get-team-by-id";

export const BackToTeamButton = withSuspense<{ user: Session["user"] }>(
  async ({ user }) => {
    "use cache";

    if (!user.lastVisitedTeamId) return null;

    const team = await getTeamById(user.lastVisitedTeamId);

    if (!team) return null;

    return <BackToTeamButtonUI teamName={team.name} teamSlug={team.slug} />;
  }
);

export const BackToTeamButtonUI: SFC<
  WithFallbackProps<
    Omit<LinkProps, "href"> & {
      href?: LinkProps["href"];
      teamName: string;
      teamSlug: string;
    },
    Omit<LinkProps, "href"> & { href?: LinkProps["href"] }
  >
> = (props) => {
  const restProps = props.fallback
    ? omit(props, ["fallback", "href"])
    : omit(props, ["fallback", "href", "teamName", "teamSlug"]);

  return (
    <Link
      href={
        props.href || props.fallback
          ? `/dashboard/team`
          : `/dashboard/team/${props.teamSlug}`
      }
      {...restProps}
    >
      <NavItem>
        <NavItemIcon>
          <ChevronLeft />
        </NavItemIcon>
        <NavItemLabel fallback={props.fallback}>
          {!props.fallback && `Back to ${props.teamName}`}
        </NavItemLabel>
      </NavItem>
    </Link>
  );
};
