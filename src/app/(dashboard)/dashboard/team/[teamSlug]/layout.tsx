import {
  CreditCard,
  List,
  MessageSquareQuote,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
  NavItemSkeleton,
} from "../../../_components/navigation/nav-item";
import NextLink from "next/link";
import {
  BaseLayout,
  BaseLayoutSidebar,
} from "../../../_components/base-layout";
import { AccountLink } from "../../../_components/navigation/account-link";
import { Link } from "@/app/_shared/components/primitives/link";
import { TeamSwitcher } from "@/app/(dashboard)/_components/navigation/team-switcher";
import { WithSession } from "@/app/_shared/components/with-session";
import { WithParams } from "@/app/_shared/components/with-params";

interface LayoutProps {
  params: Promise<{ teamSlug: string }>;
}

const TeamDashboardLayout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  params,
}) => {
  return (
    <BaseLayout>
      <BaseLayoutSidebar>
        <div className="grid grid-rows-[min-content_1fr] grid-cols-1 overflow-hidden divide-y">
          <WithSession require fallback={<TeamSwitcher.UI suspended />}>
            {(session) => (
              <WithParams params={params} suspense={false}>
                {(params) => (
                  <TeamSwitcher
                    suspense={false}
                    userId={session.user.id}
                    teamSlug={
                      (params as Awaited<LayoutProps["params"]>).teamSlug
                    }
                  />
                )}
              </WithParams>
            )}
          </WithSession>

          <div className="px-4 py-12 gap-12 flex flex-col  overflow-y-auto">
            <NavItemGroup>
              <WithParams params={params} fallback={<NavItemSkeleton />}>
                {(params) => (
                  <Link
                    href={`/dashboard/team/${
                      (params as Awaited<LayoutProps["params"]>).teamSlug
                    }/testimonials`}
                  >
                    <NavItem className="pr-3">
                      <NavItemIcon>
                        <MessageSquareQuote />
                      </NavItemIcon>
                      <NavItemLabel className="gap-2">
                        <span className="flex-1">Testimonials</span>
                        <div className="h-2 w-2 rounded-full bg-[red]" />
                        <span className="text-foreground-secondary font-regular">
                          14
                        </span>
                      </NavItemLabel>
                    </NavItem>
                  </Link>
                )}
              </WithParams>

              <NavItem>
                <NavItemIcon>
                  <List />
                </NavItemIcon>
                <NavItemLabel>Forms</NavItemLabel>
              </NavItem>

              <NavItem>
                <NavItemLabel className="gap-2">
                  <Plus />
                  <span>Add Form</span>
                </NavItemLabel>
              </NavItem>
            </NavItemGroup>

            <NavItemGroup>
              <span className="text-foreground-secondary">Team</span>

              <WithParams params={params} fallback={<NavItemSkeleton />}>
                {(params) => (
                  <Link
                    href={`/dashboard/team/${
                      (params as Awaited<LayoutProps["params"]>).teamSlug
                    }/members`}
                  >
                    <NavItem className="pr-3">
                      <NavItemIcon>
                        <Users />
                      </NavItemIcon>
                      <NavItemLabel>
                        <span className="flex-1">Members</span>
                        <span className="text-foreground-secondary font-regular">
                          2
                        </span>
                      </NavItemLabel>
                    </NavItem>
                  </Link>
                )}
              </WithParams>

              <WithParams params={params} fallback={<NavItemSkeleton />}>
                {(params) => (
                  <Link
                    href={`/dashboard/team/${
                      (params as Awaited<LayoutProps["params"]>).teamSlug
                    }/subscription`}
                  >
                    <NavItem>
                      <NavItemIcon>
                        <CreditCard />
                      </NavItemIcon>
                      <NavItemLabel>Subscription</NavItemLabel>
                    </NavItem>
                  </Link>
                )}
              </WithParams>

              <WithParams params={params} fallback={<NavItemSkeleton />}>
                {(params) => (
                  <Link
                    href={`/dashboard/team/${
                      (params as Awaited<LayoutProps["params"]>).teamSlug
                    }/settings`}
                  >
                    <NavItem>
                      <NavItemIcon>
                        <Settings />
                      </NavItemIcon>
                      <NavItemLabel>Settings</NavItemLabel>
                    </NavItem>
                  </Link>
                )}
              </WithParams>
            </NavItemGroup>
          </div>
        </div>

        <NextLink href="/dashboard/account">
          <WithSession require fallback={<AccountLink suspended />}>
            {(session) => <AccountLink user={session.user} />}
          </WithSession>
        </NextLink>
      </BaseLayoutSidebar>
      <main>{children}</main>
    </BaseLayout>
  );
};

export default TeamDashboardLayout;
