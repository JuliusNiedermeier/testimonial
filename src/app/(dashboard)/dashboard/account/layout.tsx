import { getSession } from "@/app/_shared/utils/get-session";
import { ChevronLeft, LogOut, Plus, Settings } from "lucide-react";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "../../_components/navigation/nav-item";
import { BaseLayout, BaseLayoutSidebar } from "../../_components/base-layout";
import { AccountLink } from "../../_components/navigation/account-link";
import { Link } from "@/app/_shared/components/primitives/link";
import NextLink from "next/link";
import { LogoutButton } from "../../_components/navigation/logout-button";
import { db } from "@/app/_shared/db";
import Image from "next/image";

const AccountDashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();
  if (!session) redirect("/login");

  const teams = await db.team.findMany({
    where: { memberships: { some: { userId: session.user.id } } },
  });

  const lastVisitedTeam = teams.find(
    (team) => team.id === session.user.lastVisitedTeamId
  );

  return (
    <BaseLayout>
      <BaseLayoutSidebar>
        <div className="p-4 flex flex-col gap-8">
          {teams.length && (
            <NextLink href={"/dashboard/team"}>
              <NavItem>
                <NavItemIcon>
                  <ChevronLeft />
                </NavItemIcon>
                <NavItemLabel>
                  Back to {lastVisitedTeam ? lastVisitedTeam.name : "Team"}
                </NavItemLabel>
              </NavItem>
            </NextLink>
          )}

          <Link href={"/dashboard/account"}>
            <NavItem>
              <NavItemIcon>
                <Settings />
              </NavItemIcon>
              <NavItemLabel>Account settings</NavItemLabel>
            </NavItem>
          </Link>

          <NavItemGroup>
            <span>Teams</span>
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/dashboard/team/${team.slug}/testimonials`}
              >
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

          <LogoutButton>
            <NavItem>
              <NavItemIcon>
                <LogOut />
              </NavItemIcon>
              <NavItemLabel>Log out</NavItemLabel>
            </NavItem>
          </LogoutButton>
        </div>
        <AccountLink />
      </BaseLayoutSidebar>
      <main>{children}</main>
    </BaseLayout>
  );
};

export default AccountDashboardLayout;
