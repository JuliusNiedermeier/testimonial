import { LogOut, Plus, Settings } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "@/app/(dashboard)/_components/navigation/nav-item";
import {
  BaseLayout,
  BaseLayoutSidebar,
} from "@/app/(dashboard)/_components/base-layout";
import { AccountLink } from "@/app/(dashboard)/_components/navigation/account-link";
import { Link } from "@/shared/components/primitives/link";
import { LogoutButton } from "@/app/(dashboard)/_components/navigation/logout-button";
import { TeamList, TeamListUI } from "@/app/(dashboard)/_components/team-list";
import {
  BackToTeamButton,
  BackToTeamButtonUI,
} from "@/app/(dashboard)/_components/back-to-team-button";
import { WithSession } from "@/shared/components/utils/with-session";

const AccountDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseLayout>
      <BaseLayoutSidebar>
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
