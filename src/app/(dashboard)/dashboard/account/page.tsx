import { AccountSettings } from "@/app/(dashboard)/_components/account-settings";
import { getSession } from "@/app/_shared/utils/get-session";
import { redirect } from "next/navigation";
import { FC } from "react";

const AccountSettingsPage: FC = async () => {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <AccountSettings
      userId={session.user.id}
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
      emailVerified={session.user.emailVerified}
    />
  );
};

export default AccountSettingsPage;
