import { db } from "@/app/_shared/db";
import { FC } from "react";
import { CreateSpaceForm } from "@/app/(dashboard)/_components/create-space-form";
import { SpaceListItem } from "../_components/space-list-item";
import { AccountAvatar } from "@/app/_shared/components/account-avatar";
import { LogoutButton } from "@/app/_shared/components/logout-button";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard: FC = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const spaces = await db.space.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="p-6 h-[100svh] flex items-start justify-between gap-6">
      <div className="w-[30rem] border h-full">
        <CreateSpaceForm />
        <div className="flex flex-col border-t divide-y">
          {spaces.map((space) => (
            <SpaceListItem key={space.id} {...space} />
          ))}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <AccountAvatar />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Dashboard;
