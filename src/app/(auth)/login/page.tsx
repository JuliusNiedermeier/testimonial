import { FC } from "react";
import { LoginForm } from "@/features/authentication/components/login-form";

const Login: FC = () => {
  return (
    <div className="h-[100svh] grid place-content-center">
      <LoginForm />
    </div>
  );
};

export default Login;
