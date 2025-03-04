import { FC } from "react";
import { CreateFormControls } from "@/app/(dashboard)/_components/create-form-controls";
import { AccountAvatar } from "@/app/_shared/components/account-avatar";
import { LogoutButton } from "@/app/_shared/components/logout-button";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { FormListItem } from "@/app/(dashboard)/_components/form-list-item";
import { db } from "@/app/_shared/db";

interface Props {
  params: Promise<{ teamSlug: string }>;
}

const Dashboard: FC<Props> = async ({ params }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const { teamSlug } = await params;

  const team = await db.team.findFirst({
    where: { slug: teamSlug },
    include: { forms: true },
  });

  if (!team) notFound();

  return (
    <div className="p-6 h-[100svh] flex items-start justify-between gap-6">
      <div className="w-[30rem] border h-full">
        <CreateFormControls teamSlug={teamSlug} />
        <div className="flex flex-col border-t divide-y">
          {team.forms.map((form) => (
            <FormListItem key={form.id} {...form} />
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
