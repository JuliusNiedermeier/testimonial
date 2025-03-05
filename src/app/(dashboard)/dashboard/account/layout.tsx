import { getSession } from "@/app/_shared/utils/get-session";
import { ChevronLeft, LogOut, User } from "lucide-react";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemIcon,
  NavItemLabel,
} from "../../_components/navigation/nav-item";
import { BaseLayout, BaseLayoutSidebar } from "../../_components/base-layout";
import { AccountLink } from "../../_components/navigation/account-link";
import { Link } from "@/app/_shared/components/primitives/link";
import NextLink from "next/link";
import { LogoutButton } from "../../_components/navigation/logout-button";

const AccountDashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <BaseLayout>
      <BaseLayoutSidebar>
        <div className="p-4 flex flex-col gap-8">
          <NextLink href={"/dashboard/team"}>
            <NavItem>
              <NavItemIcon>
                <ChevronLeft />
              </NavItemIcon>
              <NavItemLabel>Back to Team</NavItemLabel>
            </NavItem>
          </NextLink>

          <Link href={"/dashboard/account"}>
            <NavItem>
              <NavItemIcon>
                <User />
              </NavItemIcon>
              <NavItemLabel>Account</NavItemLabel>
            </NavItem>
          </Link>

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
