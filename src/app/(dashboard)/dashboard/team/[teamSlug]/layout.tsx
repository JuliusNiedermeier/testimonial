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
} from "@/app/(dashboard)/_components/navigation/nav-item";
import NextLink from "next/link";
import {
  BaseLayout,
  BaseLayoutSidebar,
} from "@/app/(dashboard)/_components/base-layout";
import { AccountLink } from "@/app/(dashboard)/_components/navigation/account-link";
import { Link } from "@/shared/components/primitives/link";
import {
  TeamSwitcher,
  TeamSwitcherUI,
} from "@/app/(dashboard)/_components/navigation/team-switcher";
import { WithSession } from "@/shared/components/utils/with-session";
import { WithParams } from "@/shared/components/utils/with-params";
import { getTeamBySlug } from "@/app/(dashboard)/_utils/get-team-by-slug";
import { UpdateLastVisitedTeamId } from "@/app/(dashboard)/_components/update-last-visited-team-id";

interface LayoutProps {
  params: Promise<{ teamSlug: string }>;
}

const TeamDashboardLayout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  params,
}) => {
  return (
    <>
      <WithSession require fallback={null}>
        {({ user }) => (
          <WithParams params={params} suspense={false}>
            {async ({ teamSlug }) => {
              "use cache";

              const team = await getTeamBySlug(teamSlug);
              if (!team) return null;

              if (user.lastVisitedTeamId === team.id) return null;

              return <UpdateLastVisitedTeamId teamId={team.id} />;
            }}
          </WithParams>
        )}
      </WithSession>

      <BaseLayout>
        <BaseLayoutSidebar>
          <div className="grid grid-rows-[min-content_1fr] grid-cols-1 overflow-hidden divide-y">
            <WithSession require fallback={<TeamSwitcherUI fallback />}>
              {async (session) => {
                "use cache";
                return (
                  <WithParams params={params} suspense={false}>
                    {async (params) => {
                      "use cache";
                      return (
                        <TeamSwitcher
                          suspense={false}
                          userId={session.user.id}
                          teamSlug={params.teamSlug}
                        />
                      );
                    }}
                  </WithParams>
                );
              }}
            </WithSession>

            <div className="px-4 py-12 gap-12 flex flex-col  overflow-y-auto">
              <NavItemGroup>
                <WithParams params={params} fallback={<NavItem fallback />}>
                  {async (params) => {
                    "use cache";
                    return (
                      <Link
                        href={`/dashboard/team/${params.teamSlug}/testimonials`}
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
                    );
                  }}
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

                <WithParams params={params} fallback={<NavItem fallback />}>
                  {async (params) => {
                    "use cache";
                    return (
                      <Link href={`/dashboard/team/${params.teamSlug}/members`}>
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
                    );
                  }}
                </WithParams>

                <WithParams params={params} fallback={<NavItem fallback />}>
                  {async (params) => {
                    "use cache";
                    return (
                      <Link
                        href={`/dashboard/team/${params.teamSlug}/subscription`}
                      >
                        <NavItem>
                          <NavItemIcon>
                            <CreditCard />
                          </NavItemIcon>
                          <NavItemLabel>Subscription</NavItemLabel>
                        </NavItem>
                      </Link>
                    );
                  }}
                </WithParams>

                <WithParams params={params} fallback={<NavItem fallback />}>
                  {async (params) => {
                    "use cache";
                    return (
                      <Link
                        href={`/dashboard/team/${params.teamSlug}/settings`}
                      >
                        <NavItem>
                          <NavItemIcon>
                            <Settings />
                          </NavItemIcon>
                          <NavItemLabel>Settings</NavItemLabel>
                        </NavItem>
                      </Link>
                    );
                  }}
                </WithParams>
              </NavItemGroup>
            </div>
          </div>

          <NextLink href="/dashboard/account">
            <WithSession require fallback={<AccountLink fallback />}>
              {async (session) => {
                "use cache";
                return <AccountLink user={session.user} />;
              }}
            </WithSession>
          </NextLink>
        </BaseLayoutSidebar>
        <main>{children}</main>
      </BaseLayout>
    </>
  );
};

export default TeamDashboardLayout;
