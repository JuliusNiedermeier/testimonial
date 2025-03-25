import { FC } from "react";
import { WithSession } from "@/shared/components/utils/with-session";
import { redirect } from "next/navigation";
import { LoginButton } from "@/app/(auth)/_components/login-button";

const Login: FC = () => {
  return (
    <WithSession
      fallback={
        <div className="h-full w-full p-6">
          <div className="h-full w-full skeleton" />
        </div>
      }
    >
      {async (session) => {
        "use cache";

        if (session) redirect("/dashboard");

        return (
          <div className="h-[100svh] grid place-content-center">
            <LoginButton />
          </div>
        );
      }}
    </WithSession>
  );
};

export default Login;
