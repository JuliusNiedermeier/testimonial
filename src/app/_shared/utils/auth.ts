import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export type Session = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

interface GetSessionConfig<Require extends boolean> {
  require?: Require;
}

type GetSessionResult<Require extends boolean> = Require extends true
  ? Session
  : Session | null;

export const getSession = cache(
  async <R extends boolean>(
    config?: GetSessionConfig<R>
  ): Promise<GetSessionResult<R>> => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (config?.require) {
      if (!session) redirect("/login");
      return session;
    }

    return session as GetSessionResult<R>;
  }
);
