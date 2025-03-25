"use client";

import { FC, useEffect, useRef } from "react";
import { authClient } from "@/shared/auth/client";
import { updateUser } from "@/app/(dashboard)/_actions/update-user";

export const UpdateLastVisitedTeamId: FC<{ teamId: string }> = ({ teamId }) => {
  const session = authClient.useSession();

  const hasUpdated = useRef(false);

  useEffect(() => {
    if (hasUpdated.current) return;

    updateUser({ lastVisitedTeamId: teamId }).then(() => session.refetch());

    hasUpdated.current = true;
  }, [teamId, session]);

  return null;
};
