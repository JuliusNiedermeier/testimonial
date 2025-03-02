"use client";

import { FC } from "react";
import { Button } from "./primitives/button";
import { authClient } from "../utils/auth-client";
import { useRouter } from "next/navigation";

export const LogoutButton: FC = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => authClient.signOut().then(() => router.replace("/login"))}
    >
      Log out
    </Button>
  );
};
