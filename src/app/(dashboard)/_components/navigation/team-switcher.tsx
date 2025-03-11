import { db } from "@/app/_shared/db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Image from "next/image";
import { ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/app/_shared/utils/cn";
import Link from "next/link";
import { withSuspenseFallback } from "@/app/_shared/utils/suspense-fallback";
import { Team } from "@prisma/client";
import { Skeleton } from "@/app/_shared/components/primitives/skeleton";
import { redirect } from "next/navigation";

interface AsyncTeamSwitcherProps {
  userId: string;
  teamSlug: string;
}

interface UITeamSwitcherProps {
  currentTeam: Team;
  selectableTeams: Team[];
}

export const TeamSwitcher = withSuspenseFallback<
  AsyncTeamSwitcherProps,
  UITeamSwitcherProps
>({
  AsyncComponent: async ({ UIComponent, userId, teamSlug }) => {
    const teams = await db.team.findMany({
      where: { memberships: { some: { userId } } },
    });

    const currentTeam = teams.find((team) => team.slug === teamSlug);

    if (!currentTeam) redirect("/dashboard/account");

    const selectableTeams = teams.filter((team) => team.id !== currentTeam.id);

    return (
      <UIComponent
        currentTeam={currentTeam}
        selectableTeams={selectableTeams}
      />
    );
  },
  UIComponent: (props) => {
    return (
      <Collapsible
        className={cn(
          "hover:bg-background-secondary data-[state=open]:bg-background-secondary"
        )}
      >
        <CollapsibleTrigger
          disabled={props.suspended}
          className="p-6 w-full overflow-hidden flex gap-4 items-center text-left"
        >
          <div
            className={cn("size-8 relative overflow-hidden shrink-0 rounded", {
              "bg-background-secondary": !props.suspended,
            })}
          >
            {props.suspended ? (
              <Skeleton className="absolute inset-0" />
            ) : (
              <Image
                src="/logo.svg"
                alt={props.currentTeam.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          {props.suspended ? (
            <Skeleton className="flex-1 h-[1em]" />
          ) : (
            <span className="text-label truncate block flex-1">
              {props.currentTeam.name}
            </span>
          )}
          <ChevronsUpDown className="shrink-0" />
        </CollapsibleTrigger>
        {!props.suspended && (
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-radixCollapsibleOpen data-[state=closed]:animate-radixCollapsibleClose">
            <div className="flex flex-col p-4 pt-0">
              {props.selectableTeams.map((team) => (
                <Link
                  key={team.id}
                  href={`/dashboard/team/${team.slug}`}
                  className="p-2 w-full overflow-hidden flex gap-4 items-center text-left hover:bg-background-primary rounded-lg"
                >
                  <div className="size-8 relative bg-background-secondary overflow-hidden shrink-0 rounded">
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
                <div className="size-8 relative bg-background-primary overflow-hidden shrink-0 rounded grid place-content-center">
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
  },
});
