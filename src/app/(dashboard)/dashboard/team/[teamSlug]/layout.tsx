import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/get-session";
import {
  CreditCard,
  List,
  MessageSquareQuote,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "../../../_components/navigation/nav-item";
import NextLink from "next/link";
import {
  BaseLayout,
  BaseLayoutSidebar,
} from "../../../_components/base-layout";
import { AccountLink } from "../../../_components/navigation/account-link";
import { Link } from "@/app/_shared/components/primitives/link";
import { TeamSwitcher } from "@/app/(dashboard)/_components/navigation/team-switcher";

interface LayoutProps {
  params: Promise<{ teamSlug: string }>;
}

const TeamDashboardLayout: FC<PropsWithChildren<LayoutProps>> = async ({
  children,
  params,
}) => {
  const { teamSlug } = await params;

  const session = await getSession();
  if (!session) redirect("/login");

  // Get the team, if the user has a membership for it.
  const team = await db.team.findFirst({
    where: {
      AND: [
        { slug: teamSlug },
        { memberships: { some: { userId: session.user.id } } },
      ],
    },
    include: { forms: true },
  });

  if (!team) {
    throw new Error(
      `Access denied. User is not a member of team "${teamSlug}".`
    );
  }

  // Update lastVisitedTeam if the user switched teams
  if (session.user.lastVisitedTeamId !== team.id) {
    await db.user.update({
      where: { id: session.user.id },
      data: { lastVisitedTeamId: team.id },
    });
  }

  return (
    <BaseLayout>
      <BaseLayoutSidebar>
        <div className="grid grid-rows-[min-content_1fr] grid-cols-1 overflow-hidden divide-y">
          <TeamSwitcher teamSlug={teamSlug} />
          <div className="px-4 py-12 gap-12 flex flex-col  overflow-y-auto">
            <NavItemGroup>
              <Link href={`/dashboard/team/${team.slug}/testimonials`}>
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

              <NavItem>
                <NavItemIcon>
                  <List />
                </NavItemIcon>
                <NavItemLabel>Forms</NavItemLabel>
              </NavItem>

              {team.forms.map((form) => (
                <Link
                  key={form.id}
                  href={`/dashboard/team/${team.slug}/forms/${form.slug}`}
                >
                  <NavItem>
                    <NavItemLabel>{form.title}</NavItemLabel>
                  </NavItem>
                </Link>
              ))}
              <NavItem>
                <NavItemLabel className="gap-2">
                  <Plus />
                  <span>Add Form</span>
                </NavItemLabel>
              </NavItem>
            </NavItemGroup>

            <NavItemGroup>
              <span className="text-foreground-secondary">Team</span>
              <Link href={`/dashboard/team/${team.slug}/members`}>
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
              <Link href={`/dashboard/team/${team.slug}/subscription`}>
                <NavItem>
                  <NavItemIcon>
                    <CreditCard />
                  </NavItemIcon>
                  <NavItemLabel>Subscription</NavItemLabel>
                </NavItem>
              </Link>
              <Link href={`/dashboard/team/${team.slug}/settings`}>
                <NavItem>
                  <NavItemIcon>
                    <Settings />
                  </NavItemIcon>
                  <NavItemLabel>Settings</NavItemLabel>
                </NavItem>
              </Link>
            </NavItemGroup>
          </div>
        </div>
        <NextLink href="/dashboard/account">
          <AccountLink />
        </NextLink>
      </BaseLayoutSidebar>
      <main>{children}</main>
    </BaseLayout>
  );
};

export default TeamDashboardLayout;
