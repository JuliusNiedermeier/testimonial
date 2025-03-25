"use client";

import { FC, useCallback, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/components/primitives/button";
import { Input } from "@/shared/components/primitives/input";
import { deleteUser } from "@/app/(dashboard)/_actions/delete-user";
import { updateUser } from "@/app/(dashboard)/_actions/update-user";

interface AccountSettingsProps {
  userId: string;
  name: string;
  image?: string | null;
  email: string;
  emailVerified: boolean;
}

export const AccountSettings: FC<AccountSettingsProps> = (props) => {
  const [name, setName] = useState(props.name);

  const [isDeletionPending, startDeleteUserTransition] = useTransition();
  const [isUpdatePending, startUpdateUserTransition] = useTransition();

  const handleUpdateUserName = useCallback(() => {
    startUpdateUserTransition(async () => void (await updateUser({ name })));
  }, [name]);

  const handleDeleteUser = useCallback(() => {
    startDeleteUserTransition(async () => void (await deleteUser()));
  }, []);

  return (
    <div className="p-6">
      <h1>Account settings</h1>
      <div className="mt-8 flex flex-col gap-4 border p-4">
        <div>
          <label htmlFor="account-name-input" className="block">
            Name
          </label>
          <Input
            id="account-name-input"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            autoFocus
          />
        </div>
        <Button onClick={handleUpdateUserName}>
          <span>Save</span>
          {isUpdatePending && <Loader2 className="animate-spin" />}
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-4 border p-4">
        <Button className="bg-[red]" onClick={handleDeleteUser}>
          <span>Delete User {props.name}</span>
          {isDeletionPending && <Loader2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};
