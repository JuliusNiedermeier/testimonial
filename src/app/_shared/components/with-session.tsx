"use server";

import { ReactNode } from "react";
import { withSuspense } from "../utils/suspense-fallback";
import { redirect } from "next/navigation";
import { WithRequire } from "../utils/types";
import { getSession, type Session } from "../utils/auth";

type SessionProps = WithRequire<
  "require",
  { children: (session: Session) => ReactNode },
  { children: (session: Session | null) => ReactNode }
>;

export const WithSession = withSuspense<SessionProps>({
  Component: async (props) => {
    const session = await getSession();

    if (props.require === true) {
      if (!session) redirect("/login");
      return props.children(session);
    }

    return props.children(session);
  },
});
