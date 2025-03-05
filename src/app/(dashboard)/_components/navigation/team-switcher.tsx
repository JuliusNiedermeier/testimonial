import { db } from "@/app/_shared/db";
import { getSession } from "@/app/_shared/utils/get-session";
import { ComponentProps, FC } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Image from "next/image";
import { ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/app/_shared/utils/cn";
import Link from "next/link";

interface TeamSwitcherProps
  extends Omit<ComponentProps<typeof Collapsible>, "children"> {
  teamSlug: string;
}

export const TeamSwitcher: FC<TeamSwitcherProps> = async ({
  teamSlug,
  className,
  ...restProps
}) => {
  const session = await getSession();
  if (!session) return null;

  const teams = await db.team.findMany({
    where: { memberships: { some: { userId: session.user.id } } },
  });

  if (!teams.length) return null;

  const currentTeam = teams.find((team) => team.slug === teamSlug);
  if (!currentTeam) return null;

  const otherTeams = teams.filter((team) => team !== currentTeam);

  return (
    <Collapsible
      className={cn(
        "hover:bg-background-secondary data-[state=open]:bg-background-secondary",
        className
      )}
      {...restProps}
    >
      <CollapsibleTrigger className="p-6 w-full overflow-hidden flex gap-4 items-center text-left">
        <div className="size-8 relative bg-background-secondary overflow-hidden shrink-0 rounded">
          <Image
            src="/logo.svg"
            alt={currentTeam.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-label truncate block flex-1">
          {currentTeam.name}
        </span>
        <ChevronsUpDown className="shrink-0" />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-radixCollapsibleOpen data-[state=closed]:animate-radixCollapsibleClose">
        <div className="flex flex-col p-4 pt-0">
          {otherTeams.map((team) => (
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
          <button className="p-2 w-full overflow-hidden flex gap-4 items-center text-left hover:bg-background-primary rounded-lg">
            <div className="size-8 relative bg-background-primary overflow-hidden shrink-0 rounded grid place-content-center">
              <Plus />
            </div>
            <span className="truncate block flex-1 text-foreground-secondary">
              Create Team
            </span>
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
