"use client";

import { createTeam } from "@app/dashboard/account/create-team/_actions/create-team";
import { Button } from "@app/_components/primitives/button";
import { Input } from "@app/_components/primitives/input";
import { FC, useState } from "react";

const CreateTeam: FC = () => {
  const [name, setName] = useState("");

  return (
    <div className="p-6">
      <h1>Create Team</h1>
      <div className="mt-8">
        <div>
          <label htmlFor="team-name-input" className="block">
            Team name
          </label>
          <Input
            id="team-name-input"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            autoFocus
          />
        </div>
        <Button onClick={() => createTeam({ name })}>Create</Button>
      </div>
    </div>
  );
};

export default CreateTeam;
