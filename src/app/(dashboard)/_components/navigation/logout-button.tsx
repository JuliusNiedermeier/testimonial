"use client";

import { authClient } from "@/shared/auth/client";
import { useRouter } from "next/navigation";
import { ComponentProps, FC } from "react";

export const LogoutButton: FC<ComponentProps<"button">> = ({ children }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => authClient.signOut().then(() => router.replace("/login"))}
    >
      {children}
    </button>
  );
};
