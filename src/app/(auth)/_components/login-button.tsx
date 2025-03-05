"use client";

import { Button } from "@/app/_shared/components/primitives/button";
import { authClient } from "@/app/_shared/utils/auth-client";
import { Github } from "lucide-react";
import { FC } from "react";

export const LoginButton: FC = () => {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "github",
          callbackURL: "/dashboard",
        })
      }
    >
      <Github />
      <span>Login using GitHub</span>
    </Button>
  );
};
