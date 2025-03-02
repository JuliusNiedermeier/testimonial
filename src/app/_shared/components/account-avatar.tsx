import { auth } from "@/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { FC } from "react";

export const AccountAvatar: FC = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="size-20 rounded-full bg-background-secondary relative overflow-hidden">
      {session?.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name}
          fill
          className="object-cover"
        />
      )}
    </div>
  );
};
