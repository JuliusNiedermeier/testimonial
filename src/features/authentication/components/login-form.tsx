import { FC } from "react";
import { SocialLoginButton } from "./social-login-button";
import { Input } from "@/shared/components/primitives/input";
import { Button } from "@/shared/components/primitives/button";
import { SFC, WithFallbackProps } from "@/shared/utils/types";
import { WithSession } from "@/shared/components/utils/with-session";
import { redirect } from "next/navigation";

export const LoginForm: FC = () => {
  return (
    <WithSession fallback={<LoginFormUI />}>
      {async (session) => {
        "use cache";
        if (session) redirect("/dashboard");
        return <LoginFormUI />;
      }}
    </WithSession>
  );
};

export const LoginFormUI: SFC<WithFallbackProps> = ({}) => {
  return (
    <div className="flex flex-col gap-2">
      <SocialLoginButton provider="google" label="Login with Google" />
      <SocialLoginButton provider="github" label="Login with GitHub" />

      <div className="flex gap-4 items-center">
        <div className="h-px bg-foreground-secondary flex-1" />
        <div>Or</div>
        <div className="h-px bg-foreground-secondary flex-1" />
      </div>

      <Input placeholder="Email" />
      <Button>Login with Email</Button>
    </div>
  );
};
