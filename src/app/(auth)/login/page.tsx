import { FC } from "react";
import { WithSession } from "@/app/_shared/components/with-session";
import { redirect } from "next/navigation";
import { LoginButton } from "../_components/login-button";

const Login: FC = () => {
  return (
    <WithSession fallback={"Loading login page..."}>
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
