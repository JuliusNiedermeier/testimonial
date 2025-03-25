"use client";

import { Button } from "@/shared/components/primitives/button";
import { authClient } from "@/shared/auth/client";
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
