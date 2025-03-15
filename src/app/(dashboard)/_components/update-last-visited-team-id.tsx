"use client";

import { FC, useEffect, useRef } from "react";
import { authClient } from "@/app/_shared/utils/auth-client";
import { updateUser } from "../_actions/update-user";

export const UpdateLastVisitedTeamId: FC<{ teamId: string }> = ({ teamId }) => {
  const session = authClient.useSession();

  const hasUpdated = useRef(false);

  useEffect(() => {
    if (hasUpdated.current) return;
    console.log("Updating user");
    updateUser({ lastVisitedTeamId: teamId }).then(() => {
      console.log("Refetching session on client");
      session.refetch();
    });
    hasUpdated.current = true;
  }, [teamId, session]);

  return null;
};
