import {
  CreditCard,
  List,
  MenuIcon,
  MessageSquareQuote,
  PlusIcon,
  Settings,
  Users,
} from "lucide-react";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "@app/dashboard/_components/nav-item";
import NextLink from "next/link";
import {
  Layout,
  LayoutPage,
  LayoutPageOverlay,
  LayoutSidebar,
  LayoutSidebarContent,
  LayoutSidebarOpenTrigger,
} from "@app/dashboard/_components/base-layout";
import { Link } from "@app/_components/primitives/link";
import { WithSession } from "@app/_components/with-session";
import { WithParams } from "@app/_components/with-params";
import { getTeamBySlug } from "@app/dashboard/_utils/get-team-by-slug";
import { UpdateLastVisitedTeamId } from "@app/dashboard/team/[teamSlug]/_components/update-last-visited-team-id";
import { FormList, FormListUI } from "./_components/form-list";
import { Button } from "root/src/app/_components/primitives/button";
import { cn } from "root/src/app/_utils/cn";
import Image from "next/image";
import { TeamBadge, TeamBadgeUI } from "./_components/team-badge";

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

      <Layout fallback={null}>
        <LayoutSidebar>
          <LayoutSidebarContent className="gap-8 flex flex-col overflow-hidden">
            <div className="p-6 pr-4 w-full overflow-hidden flex gap-4 items-center text-left">
              <div
                className={cn(
                  "size-8 relative overflow-hidden shrink-0 rounded-sm bg-secondary"
                )}
              >
                <Image
                  src="/logo.svg"
                  alt="Testimonial.io"
                  fill
                  className="object-cover"
                />
              </div>

              <span
                className={cn("text-label font-bold truncate block flex-1")}
              >
                Appname
              </span>

              <WithParams params={params} fallback={<TeamBadgeUI fallback />}>
                {async (params) => (
                  <TeamBadge suspense={false} teamSlug={params.teamSlug} />
                )}
              </WithParams>
            </div>

            <NavItemGroup className="px-4 pt-4">
              <WithParams params={params} fallback={<NavItem fallback />}>
                {async (params) => {
                  "use cache";
                  return (
                    <Link
                      href={`/dashboard/team/${params.teamSlug}/testimonials`}
                    >
                      <NavItem>
                        <NavItemIcon>
                          <MessageSquareQuote size={20} />
                        </NavItemIcon>
                        <NavItemLabel className="gap-2">
                          <span className="flex-1">Testimonials</span>
                          <div className="h-2 w-2 rounded-full bg-destructive" />
                          <span className="text-muted-foreground font-normal">
                            14
                          </span>
                        </NavItemLabel>
                      </NavItem>
                    </Link>
                  );
                }}
              </WithParams>
            </NavItemGroup>

            <NavItemGroup className="overflow-hidden bg-accent mx-2 rounded-xl gap-0">
              <div className="p-2 border-b">
                <NavItem interactive={false} className="pr-0">
                  <NavItemIcon>
                    <List size={20} />
                  </NavItemIcon>
                  <NavItemLabel>
                    <span className="flex-1">Forms</span>
                    <WithParams params={params} fallback={null}>
                      {({ teamSlug }) => (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:bg-background"
                        >
                          <NextLink
                            href={`/dashboard/team/${teamSlug}/create-form`}
                          >
                            <PlusIcon />
                          </NextLink>
                        </Button>
                      )}
                    </WithParams>
                  </NavItemLabel>
                </NavItem>
              </div>

              <WithParams
                params={params}
                fallback={
                  <div className="overflow-y-auto flex-1 p-2">
                    <FormListUI fallback />
                  </div>
                }
              >
                {async (params) => {
                  "use cache";
                  return (
                    <div className="overflow-y-auto flex-1 p-2">
                      <FormList teamSlug={params.teamSlug} suspense={false} />
                    </div>
                  );
                }}
              </WithParams>
            </NavItemGroup>

            <NavItemGroup className="mt-auto px-4 pb-4">
              <WithParams params={params} fallback={<NavItem fallback />}>
                {async (params) => {
                  "use cache";
                  return (
                    <Link href={`/dashboard/team/${params.teamSlug}/members`}>
                      <NavItem>
                        <NavItemIcon>
                          <Users size={20} />
                        </NavItemIcon>
                        <NavItemLabel>
                          <span className="flex-1">Members</span>
                          <span className="text-muted-foreground font-normal">
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
                          <CreditCard size={20} />
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
                    <Link href={`/dashboard/team/${params.teamSlug}/settings`}>
                      <NavItem>
                        <NavItemIcon>
                          <Settings size={20} />
                        </NavItemIcon>
                        <NavItemLabel>Team settings</NavItemLabel>
                      </NavItem>
                    </Link>
                  );
                }}
              </WithParams>
            </NavItemGroup>
          </LayoutSidebarContent>
        </LayoutSidebar>
        <LayoutPage>
          <LayoutPageOverlay />
          <div className="md:hidden p-4">
            <div className="rounded-full p-1 pl-2 bg-card flex gap-4 items-center">
              <LayoutSidebarOpenTrigger
                className="rounded-full"
                size="icon"
                variant="ghost"
              >
                <MenuIcon size={20} />
              </LayoutSidebarOpenTrigger>

              <h1 className="text-label flex-1">Page title</h1>

              <WithParams params={params} fallback={<TeamBadgeUI fallback />}>
                {async (params) => (
                  <TeamBadge suspense={false} teamSlug={params.teamSlug} />
                )}
              </WithParams>
            </div>
          </div>
          {children}
        </LayoutPage>
      </Layout>
    </>
  );
};

export default TeamDashboardLayout;
