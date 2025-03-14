import { NavItem, NavItemLabel } from "./navigation/nav-item";
import { db } from "@/app/_shared/db";
import Link from "next/link";
import { withSuspense } from "@/app/_shared/components/utils/with-suspense";
import { SFC, WithFallbackProps } from "@/app/_shared/utils/types";
import { unstable_cacheTag } from "next/cache";

const getFormsByTeamSlug = async (teamSlug: string) => {
  "use cache";

  const team = await db.team.findFirst({
    where: { slug: teamSlug },
    include: { forms: true },
  });

  if (!team) return [];

  unstable_cacheTag(`form(collection):${team.id}`);
  unstable_cacheTag(...team.forms.map((form) => `form:${team.id}:${form.id}`));

  return team.forms;
};

export const FormList = withSuspense<{
  params: Promise<{ teamSlug: string }>;
}>(async ({ params }) => {
  "use cache";

  const { teamSlug } = await params;

  const forms = await getFormsByTeamSlug(teamSlug);

  return <FormListUI forms={forms} teamSlug={teamSlug} />;
});

export const FormListUI: SFC<
  WithFallbackProps<
    {
      forms: Awaited<ReturnType<typeof getFormsByTeamSlug>>;
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
