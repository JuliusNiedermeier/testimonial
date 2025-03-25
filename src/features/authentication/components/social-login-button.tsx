"use client";

import { authClient } from "@/shared/auth/client";
import { Button } from "@/shared/components/primitives/button";
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
