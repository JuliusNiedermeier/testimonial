import TeamSettings from "@/app/(dashboard)/_components/team-settings";
import { db } from "@/app/_shared/db";
import { FC } from "react";

interface TeamSettingsPageProps {
  params: Promise<{ teamSlug: string }>;
}

const TeamSettingsPage: FC<TeamSettingsPageProps> = async ({ params }) => {
  const { teamSlug } = await params;

  const team = await db.team.findFirst({ where: { slug: teamSlug } });

  if (!team) return null;

  return <TeamSettings slug={teamSlug} name={team.name} />;
};

export default TeamSettingsPage;
