"use server";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { withSuspense } from "@app/_components/with-suspense";
import { getSession, type Session } from "@app/_auth/server";
import { WithBooleanDiscriminator } from "@app/_utils/types";

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
