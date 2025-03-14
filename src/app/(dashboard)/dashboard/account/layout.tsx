import { LogOut, Plus, Settings } from "lucide-react";
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
import { LogoutButton } from "../../_components/navigation/logout-button";
import { TeamList, TeamListUI } from "../../_components/team-list";
import {
  BackToTeamButton,
  BackToTeamButtonUI,
} from "../../_components/back-to-team-button";
import { WithSession } from "@/app/_shared/components/utils/with-session";

const AccountDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseLayout>
      <BaseLayoutSidebar>
        <div className="p-4 flex flex-col gap-8">
          <WithSession require fallback={<BackToTeamButtonUI fallback />}>
            {async (session) => {
              "use cache";
              return <BackToTeamButton suspense={false} user={session.user} />;
            }}
          </WithSession>

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

            <WithSession require fallback={<TeamListUI fallback />}>
              {async (session) => {
                "use cache";
                return <TeamList suspense={false} userId={session.user.id} />;
              }}
            </WithSession>

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

        <WithSession require fallback={<AccountLink fallback />}>
          {async (session) => {
            "use cache";
            return <AccountLink user={session.user} />;
          }}
        </WithSession>
      </BaseLayoutSidebar>
      <main>{children}</main>
    </BaseLayout>
  );
};

export default AccountDashboardLayout;
