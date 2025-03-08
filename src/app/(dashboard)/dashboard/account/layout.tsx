import { LogOut, Settings } from "lucide-react";
import { FC, PropsWithChildren, Suspense } from "react";
import {
  NavItem,
  NavItemIcon,
  NavItemLabel,
} from "../../_components/navigation/nav-item";
import { BaseLayout, BaseLayoutSidebar } from "../../_components/base-layout";
import { AccountLink } from "../../_components/navigation/account-link";
import { Link } from "@/app/_shared/components/primitives/link";
import { LogoutButton } from "../../_components/navigation/logout-button";
import { TeamList } from "../../_components/team-list";
import { BackToTeamButton } from "../../_components/back-to-team-button";

const AccountDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseLayout>
      <BaseLayoutSidebar>
        <div className="p-4 flex flex-col gap-8">
          <Suspense fallback="Loading back to team...">
            <BackToTeamButton />
          </Suspense>

          <Link href={"/dashboard/account"}>
            <NavItem>
              <NavItemIcon>
                <Settings />
              </NavItemIcon>
              <NavItemLabel>Account settings</NavItemLabel>
            </NavItem>
          </Link>

          <Suspense fallback="Loading Teams...">
            <TeamList />
          </Suspense>

          <LogoutButton>
            <NavItem>
              <NavItemIcon>
                <LogOut />
              </NavItemIcon>
              <NavItemLabel>Log out</NavItemLabel>
            </NavItem>
          </LogoutButton>
        </div>
        <Suspense fallback="Loading Account link...">
          <AccountLink />
        </Suspense>
      </BaseLayoutSidebar>
      <main>
        <Suspense fallback="Loading page...">{children}</Suspense>
      </main>
    </BaseLayout>
  );
};

export default AccountDashboardLayout;
