"use client";

import { Button } from "@/app/_shared/components/primitives/button";
import { Input } from "@/app/_shared/components/primitives/input";
import { FC, useState } from "react";
import { createForm } from "@/app/(dashboard)/_actions/create-form";

export interface Props {
  teamSlug: string;
}

export const CreateFormControls: FC<Props> = ({ teamSlug }) => {
  const [formTitle, setFormTitle] = useState("");

  return (
    <div className="flex w-full">
      <Input
        value={formTitle}
        onInput={(e) => setFormTitle(e.currentTarget.value)}
        className="flex-1"
      />
      <Button onClick={() => createForm({ title: formTitle, teamSlug })}>
        Create form
      </Button>
    </div>
  );
};
