import TeamSettings from "@/app/(dashboard)/_components/team-settings";
import { WithParams } from "@/app/_shared/components/utils/with-params";
import { db } from "@/app/_shared/db";
import { unstable_cacheTag } from "next/cache";
import { FC } from "react";

interface TeamSettingsPageProps {
  params: Promise<{ teamSlug: string }>;
}

const getTeamBySlug = async (slug: string) => {
  "use cache";

  const team = await db.team.findFirst({ where: { slug } });
  if (team) unstable_cacheTag(`team:${team.id}`);

  return team;
};

const TeamSettingsPage: FC<TeamSettingsPageProps> = ({ params }) => {
  return (
    <WithParams
      params={params}
      fallback={
        <div className="w-full h-full p-6">
          <div className="w-full h-full skeleton" />
        </div>
      }
    >
      {async (params) => {
        "use cache";

        const team = await getTeamBySlug(params.teamSlug);
        if (!team) return null;

        return <TeamSettings slug={params.teamSlug} name={team.name} />;
      }}
    </WithParams>
  );
};

export default TeamSettingsPage;
