import { redirect } from "next/navigation";
import { FC } from "react";
import { LoginButton } from "../_components/login-button";
import { WithSession } from "@/app/_shared/components/with-session";

const Login: FC = () => {
  return (
    <WithSession fallback={"Loading login page..."}>
      {(session) => {
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
