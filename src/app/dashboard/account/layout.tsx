import { LogOut, Plus, Settings } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "@app/dashboard/_components/nav-item";
import { Layout, LayoutSidebar } from "root/src/app/dashboard/_components/layout";
import { AccountBadge } from "@app/dashboard/_components/account-badge";
import { Link } from "@app/_components/primitives/link";
import { LogoutButton } from "@app/dashboard/account/_components/logout-button";
import {
  TeamList,
  TeamListUI,
} from "@app/dashboard/account/_components/team-list";
import {
  BackToTeamButton,
  BackToTeamButtonUI,
} from "@app/dashboard/account/_components/back-to-team-button";
import { WithSession } from "@app/_components/with-session";

const AccountDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout fallback={null}>
      <LayoutSidebar>
        <div className="p-4 flex flex-col gap-8">
          <WithSession require fallback={<BackToTeamButtonUI fallback />}>
            {(session) => (
              <BackToTeamButton
                suspense={false}
                lastVisitedTeamId={session.user.lastVisitedTeamId || null}
              />
            )}
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

        <WithSession require fallback={<AccountBadge fallback />}>
          {async (session) => {
            "use cache";
            return <AccountBadge user={session.user} />;
          }}
        </WithSession>
      </LayoutSidebar>
      <main>{children}</main>
    </Layout>
  );
};

export default AccountDashboardLayout;
