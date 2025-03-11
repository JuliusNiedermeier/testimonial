import { NavItem, NavItemLabel, NavItemSkeleton } from "./navigation/nav-item";
import { db } from "@/app/_shared/db";
import Link from "next/link";
import { withSuspenseFallback } from "@/app/_shared/utils/suspense-fallback";

const getForms = async (teamSlug: string, userId: string) =>
  await db.form.findMany({
    where: { team: { slug: teamSlug, memberships: { some: { userId } } } },
  });

export const FormList = withSuspenseFallback<
  { params: Promise<{ teamSlug: string }>; userId: string },
  { forms: Awaited<ReturnType<typeof getForms>>; teamSlug: string }
>({
  AsyncComponent: async ({ UIComponent, params, userId }) => {
    const { teamSlug } = await params;

    const teams = await getForms(teamSlug, userId);

    return <UIComponent forms={teams} teamSlug={teamSlug} />;
  },
  UIComponent: (props) => {
    if (props.suspended) {
      return Array.from(new Array(2)).map((_, index) => (
        <NavItemSkeleton key={index} />
      ));
    }

    return props.forms.map((form) => (
      <Link
        key={form.id}
        href={`/dashboard/team/${props.teamSlug}/forms/${form.slug}`}
      >
        <NavItem>
          <NavItemLabel>{form.title}</NavItemLabel>
        </NavItem>
      </Link>
    ));
  },
});
