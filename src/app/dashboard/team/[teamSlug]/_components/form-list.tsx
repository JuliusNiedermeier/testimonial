import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "@app/dashboard/_components/nav-item";
import { db } from "@app/_db";
import { withSuspense } from "@app/_components/with-suspense";
import { SFC, WithFallbackProps } from "@app/_utils/types";
import { unstable_cacheTag } from "next/cache";
import { Link } from "@app/_components/primitives/link";

const getFormsByTeamSlug = async (teamSlug: string) => {
  "use cache";

  const team = await db.team.findFirst({
    where: { slug: teamSlug },
    include: { forms: true },
  });

  if (!team) return [];

  unstable_cacheTag(`form(collection):${team.id}`);
  unstable_cacheTag(...team.forms.map((form) => `form:${form.id}`));

  return team.forms;
};

export const FormList = withSuspense<{ teamSlug: string }>(
  async ({ teamSlug }) => {
    "use cache";

    const forms = await getFormsByTeamSlug(teamSlug);

    return <FormListUI forms={forms} teamSlug={teamSlug} />;
  }
);

export const FormListUI: SFC<
  WithFallbackProps<
    {
      forms: Awaited<ReturnType<typeof getFormsByTeamSlug>>;
      teamSlug: string;
    },
    object
  >
> = (props) => {
  return (
    <NavItemGroup>
      {props.fallback
        ? Array.from(new Array(3)).map((_, index) => (
            <NavItem
              key={index}
              fallback
              style={{ opacity: (3 - index) / 3 }}
            />
          ))
        : props.forms.map((form) => (
            <Link
              key={form.id}
              href={`/dashboard/team/${props.teamSlug}/forms/${form.slug}`}
            >
              <NavItem className=" data-[active=false]:hover:bg-card/50">
                <NavItemIcon className="grid place-content-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                </NavItemIcon>
                <NavItemLabel>{form.title}</NavItemLabel>
              </NavItem>
            </Link>
          ))}
    </NavItemGroup>
  );
};
