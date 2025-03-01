"use client";

import { Button } from "@/app/_shared/components/primitives/button";
import { Input } from "@/app/_shared/components/primitives/input";
import { FC, useState } from "react";
import { createSpace } from "@/app/(dashboard)/_actions/create-space";

export const CreateSpaceForm: FC = () => {
  const [spaceTitle, setSpaceTitle] = useState("");

  return (
    <div className="flex w-full">
      <Input
        value={spaceTitle}
        onInput={(e) => setSpaceTitle(e.currentTarget.value)}
        className="flex-1"
      />
      <Button onClick={() => createSpace(spaceTitle)}>Create space</Button>
    </div>
  );
};
