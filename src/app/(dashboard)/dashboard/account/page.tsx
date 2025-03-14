import { AccountSettings } from "@/app/(dashboard)/_components/account-settings";
import { WithSession } from "@/app/_shared/components/utils/with-session";
import { FC } from "react";

const AccountSettingsPage: FC = () => {
  return (
    <WithSession
      require
      fallback={
        <div className="h-full w-full p-6">
          <div className="h-full w-full skeleton" />
        </div>
      }
    >
      {async (session) => {
        "use cache";
        return (
          <AccountSettings
            userId={session.user.id}
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
            emailVerified={session.user.emailVerified}
          />
        );
      }}
    </WithSession>
  );
};

export default AccountSettingsPage;
