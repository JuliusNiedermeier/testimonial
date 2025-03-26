"use client";

import { FC, useEffect, useRef } from "react";
import { authClient } from "@app/_auth/client";
import { updateLastVisitedTeamId } from "@app/dashboard/team/[teamSlug]/_actions/update-last-visited-team-id";

export const UpdateLastVisitedTeamId: FC<{ teamId: string }> = ({ teamId }) => {
  const session = authClient.useSession();

  const hasUpdated = useRef(false);

  useEffect(() => {
    if (hasUpdated.current) return;
    updateLastVisitedTeamId(teamId).then(() => session.refetch());
    hasUpdated.current = true;
  }, [teamId, session]);

  return null;
};
