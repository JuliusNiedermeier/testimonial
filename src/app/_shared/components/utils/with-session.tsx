"use server";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { WithBooleanDiscriminator } from "../../utils/types";
import { getSession, type Session } from "../../utils/auth";
import { withSuspense } from "./with-suspense";

type SessionProps = WithBooleanDiscriminator<
  "require",
  { children: (session: Session) => ReactNode },
  { children: (session: Session | null) => ReactNode }
>;

export const WithSession = withSuspense<SessionProps>(async (props) => {
  const session = await getSession();

  if (props.require === true) {
    if (!session) redirect("/login");
    return props.children(session);
  }

  return props.children(session);
});
