"use client";

import { Button } from "@/app/_shared/components/primitives/button";
import { authClient } from "@/app/_shared/utils/auth-client";
import { Github } from "lucide-react";
import { FC } from "react";

const Login: FC = () => {
  return (
    <div className="h-[100svh] grid place-content-center">
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
    </div>
  );
};

export default Login;
