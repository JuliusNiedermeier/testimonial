import Link, { LinkProps } from "next/link";
import { NavItem, NavItemIcon, NavItemLabel } from "./navigation/nav-item";
import { ChevronLeft } from "lucide-react";
import { db } from "@/app/_shared/db";
import { Session } from "@/app/_shared/utils/auth";
import { withSuspense } from "@/app/_shared/components/utils/with-suspense";
import { SFC, WithFallbackProps } from "@/app/_shared/utils/types";
import { omit } from "@/app/_shared/utils/omit";
import { unstable_cacheTag } from "next/cache";

const getTeamById = async (id: string) => {
  "use cache";
  unstable_cacheTag(`team:${id}`);
  return await db.team.findFirst({ where: { id } });
};

export const BackToTeamButton = withSuspense<{ user: Session["user"] }>(
  async ({ user }) => {
    "use cache";

    if (!user.lastVisitedTeamId) return null;

    const team = await getTeamById(user.lastVisitedTeamId);

    if (!team) return null;

    return <BackToTeamButtonUI teamName={team.name} />;
  }
);

export const BackToTeamButtonUI: SFC<
  WithFallbackProps<
    Omit<LinkProps, "href"> & { href?: LinkProps["href"]; teamName: string },
    Omit<LinkProps, "href"> & { href?: LinkProps["href"] }
  >
> = (props) => {
  const restProps = props.fallback
    ? omit(props, ["fallback", "href"])
    : omit(props, ["fallback", "href", "teamName"]);

  return (
    <Link href={props.href || "/dashboard/team"} {...restProps}>
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
