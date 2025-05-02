import { cn } from "root/src/app/_utils/cn";
import { SFC, WithFallbackProps } from "root/src/app/_utils/types";
import Image from "next/image";
import { withSuspense } from "root/src/app/_components/with-suspense";
import { getTeamBySlug } from "@app/dashboard/_utils/get-team-by-slug";
import { notFound } from "next/navigation";
import { getSession } from "root/src/app/_auth/server";
import { DialogTrigger } from "@app/_components/primitives/dialog";

export const AccountMenuTrigger = withSuspense<{
  teamSlug: string;
}>(async (props) => {
  const session = await getSession({ require: true });

  const team = await getTeamBySlug(await props.teamSlug);
  if (!team) notFound();

  return (
    <AccountMenuTriggerUI
      team={{ name: team.name, image: "/logo.svg" }}
      user={{ name: session.user.name, image: session.user.image || undefined }}
    />
  );
});

interface AccountMenuTriggerUIProps {
  team: { name: string; image?: string };
  user: { name: string; image?: string };
}

export const AccountMenuTriggerUI: SFC<
  WithFallbackProps<AccountMenuTriggerUIProps, object>
> = (props) => {
  return (
    <DialogTrigger className="group p-1 border rounded-full bg-secondary hover:bg-card flex">
      <div
        className={cn(
          "size-8 relative overflow-hidden shrink-0 rounded-full bg-secondary z-0 ring-4 ring-secondary group-hover:ring-card",
          { skeleton: props.fallback }
        )}
      >
        {!props.fallback && props.team.image && (
          <Image
            src={props.team.image}
            alt={props.team.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div
        className={cn(
          "size-8 relative overflow-hidden shrink-0 rounded-full bg-secondary -ml-2 ring-4 ring-secondary group-hover:ring-card",
          { skeleton: props.fallback }
        )}
      >
        {!props.fallback && props.user.image && (
          <Image
            src={props.user.image}
            alt={props.user.name}
            fill
            className="object-cover"
          />
        )}
      </div>
    </DialogTrigger>
  );
};
