import { AccountSettings } from "@/app/(dashboard)/_components/account-settings";
import { Skeleton } from "@/app/_shared/components/primitives/skeleton";
import { WithSession } from "@/app/_shared/components/with-session";
import { FC } from "react";

const AccountSettingsPage: FC = () => {
  return (
    <WithSession
      require
      fallback={
        <div className="h-full w-full p-6">
          <Skeleton className="h-full w-full" />
        </div>
      }
    >
      {(session) => (
        <AccountSettings
          userId={session.user.id}
          name={session.user.name}
          email={session.user.email}
          image={session.user.image}
          emailVerified={session.user.emailVerified}
        />
      )}
    </WithSession>
  );
};

export default AccountSettingsPage;
