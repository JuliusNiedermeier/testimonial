import { db } from "@app/_db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Image from "next/image";
import { ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@app/_utils/cn";
import Link from "next/link";
import { Team } from "@prisma/client";
import { redirect } from "next/navigation";
import { withSuspense } from "@app/_components/with-suspense";
import { SFC, WithFallbackProps } from "@app/_utils/types";
import { unstable_cacheTag } from "next/cache";

const getUserTeams = async (userId: string) => {
  "use cache";

  const teams = await db.team.findMany({
    where: { memberships: { some: { userId } } },
  });

  unstable_cacheTag(`team(collection):${userId}`);
  unstable_cacheTag(...teams.map(({ id }) => `team:${id}`));

  return teams;
};

export const TeamSwitcher = withSuspense<{ userId: string; teamSlug: string }>(
  async ({ userId, teamSlug }) => {
    "use cache";

    const teams = await getUserTeams(userId);

    const currentTeam = teams.find((team) => team.slug === teamSlug);

    if (!currentTeam) redirect("/dashboard/account");

    const selectableTeams = teams.filter((team) => team.id !== currentTeam.id);

    return (
      <TeamSwitcherUI
        currentTeam={currentTeam}
        selectableTeams={selectableTeams}
      />
    );
  }
);

export const TeamSwitcherUI: SFC<
  WithFallbackProps<{ selectableTeams: Team[]; currentTeam: Team }, object>
> = (props) => {
  return (
    <Collapsible
      className={cn(
        "hover:bg-background-secondary data-[state=open]:bg-background-secondary"
      )}
    >
      <CollapsibleTrigger
        disabled={props.fallback}
        className="p-6 w-full overflow-hidden flex gap-4 items-center text-left"
      >
        <div
          className={cn("size-8 relative overflow-hidden shrink-0 rounded-sm", {
            "bg-background-secondary": !props.fallback,
            skeleton: props.fallback,
          })}
        >
          {!props.fallback && (
            <Image
              src="/logo.svg"
              alt={props.currentTeam.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <span
          className={cn("text-label truncate block flex-1", {
            "skeleton h-[1em]": props.fallback,
          })}
        >
          {!props.fallback && props.currentTeam.name}
        </span>
        <ChevronsUpDown className="shrink-0" />
      </CollapsibleTrigger>
      {!props.fallback && (
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-radix-collapsible-open data-[state=closed]:animate-radix-collapsible-close">
          <div className="flex flex-col p-4 pt-0">
            {props.selectableTeams.map((team) => (
              <Link
                key={team.id}
                href={`/dashboard/team/${team.slug}`}
                className="p-2 w-full overflow-hidden flex gap-4 items-center text-left hover:bg-background-primary rounded-lg"
              >
                <div className="size-8 relative bg-background-secondary overflow-hidden shrink-0 rounded-sm">
                  <Image
                    src="/logo.svg"
                    alt={team.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="truncate block flex-1">{team.name}</span>
              </Link>
            ))}
            <Link
              href="/dashboard/account/create-team"
              className="p-2 w-full overflow-hidden flex gap-4 items-center text-left hover:bg-background-primary rounded-lg"
            >
              <div className="size-8 relative bg-background-primary overflow-hidden shrink-0 rounded-sm grid place-content-center">
                <Plus />
              </div>
              <span className="truncate block flex-1 text-foreground-secondary">
                Create Team
              </span>
            </Link>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};
