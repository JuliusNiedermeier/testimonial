import TeamSettings from "@/app/(dashboard)/_components/team-settings";
import { Skeleton } from "@/app/_shared/components/primitives/skeleton";
import { WithParams } from "@/app/_shared/components/with-params";
import { db } from "@/app/_shared/db";
import { FC } from "react";

interface TeamSettingsPageProps {
  params: Promise<{ teamSlug: string }>;
}

const TeamSettingsPage: FC<TeamSettingsPageProps> = ({ params }) => {
  return (
    <WithParams
      params={params}
      fallback={
        <div className="w-full h-full p-6">
          <Skeleton className="w-full h-full" />
        </div>
      }
    >
      {async (params) => {
        const { teamSlug } = await (params as TeamSettingsPageProps["params"]);
        const team = await db.team.findFirst({ where: { slug: teamSlug } });
        if (!team) return null;
        return <TeamSettings slug={teamSlug} name={team.name} />;
      }}
    </WithParams>
  );
};

export default TeamSettingsPage;
