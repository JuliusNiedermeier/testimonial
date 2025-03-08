import { getSession } from "@/app/_shared/utils/get-session";
import { FC } from "react";
import Image from "next/image";

export const AccountLink: FC = async () => {
  const session = await getSession();

  if (!session) return null;

  return (
    <div className="p-6 flex gap-4 items-center hover:bg-background-secondary text-left overflow-hidden">
      <div className="shrink-0 size-12 relative bg-background-secondary rounded-full overflow-hidden">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="overflow-hidden">
        <span className="text-label truncate block">{session.user.name}</span>
        <span className="text-foreground-secondary truncate block">
          {session.user.email}
        </span>
      </div>
    </div>
  );
};
