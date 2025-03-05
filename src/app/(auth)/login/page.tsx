import { getSession } from "@/app/_shared/utils/get-session";
import { redirect } from "next/navigation";
import { FC } from "react";
import { LoginButton } from "../_components/login-button";

const Login: FC = async () => {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <div className="h-[100svh] grid place-content-center">
      <LoginButton />
    </div>
  );
};

export default Login;
