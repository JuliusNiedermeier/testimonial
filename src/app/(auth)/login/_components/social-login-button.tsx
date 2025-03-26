"use client";

import { authClient } from "@app/_auth/client";
import { Button } from "@app/_components/primitives/button";
import { FC } from "react";

export const SocialLoginButton: FC<{
  provider: Parameters<typeof authClient.signIn.social>["0"]["provider"];
  label: string;
}> = ({ provider, label }) => {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider,
          callbackURL: "/dashboard",
        })
      }
    >
      {label}
    </Button>
  );
};
