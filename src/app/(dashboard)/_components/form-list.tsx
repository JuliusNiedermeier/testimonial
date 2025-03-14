import { NavItem, NavItemLabel } from "./navigation/nav-item";
import { db } from "@/app/_shared/db";
import Link from "next/link";
import { withSuspense } from "@/app/_shared/components/utils/with-suspense";
import { SFC, WithFallbackProps } from "@/app/_shared/utils/types";

const getForms = async (teamSlug: string, userId: string) =>
  await db.form.findMany({
    where: { team: { slug: teamSlug, memberships: { some: { userId } } } },
  });

export const FormList = withSuspense<{
  params: Promise<{ teamSlug: string }>;
  userId: string;
}>(async ({ params, userId }) => {
  const { teamSlug } = await params;

  const teams = await getForms(teamSlug, userId);

  return <FormListUI forms={teams} teamSlug={teamSlug} />;
});

export const FormListUI: SFC<
  WithFallbackProps<
    {
      forms: Awaited<ReturnType<typeof getForms>>;
      teamSlug: string;
    },
    object
  >
> = (props) => {
  if (props.fallback) {
    return Array.from(new Array(3)).map((_, index) => (
      <NavItem key={index} fallback style={{ opacity: (3 - index) / 3 }} />
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
};
