import { FC } from "react";
import { SocialLoginButton } from "@app/(auth)/login/_components/social-login-button";
import { Input } from "@app/_components/primitives/input";
import { Button } from "@app/_components/primitives/button";
import { SFC, WithFallbackProps } from "@app/_utils/types";
import { WithSession } from "@app/_components/with-session";
import { redirect } from "next/navigation";

const Login: FC = () => {
  return (
    <WithSession fallback={<LoginUI />}>
      {async (session) => {
        "use cache";
        if (session) redirect("/dashboard");
        return <LoginUI />;
      }}
    </WithSession>
  );
};

const LoginUI: SFC<WithFallbackProps> = ({}) => {
  return (
    <div className="h-[100svh] grid place-content-center gap-2">
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

export default Login;
