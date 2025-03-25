import TeamSettings from "@/app/(dashboard)/_components/team-settings";
import { getTeamBySlug } from "@/app/(dashboard)/_utils/get-team-by-slug";
import { WithParams } from "@/shared/components/utils/with-params";
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
