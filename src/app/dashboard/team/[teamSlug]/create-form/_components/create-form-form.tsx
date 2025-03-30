import { FC, useState } from "react";
import { Input } from "root/src/app/_components/primitives/input";
import { createForm } from "../_actions/create-form";
import { Button } from "root/src/app/_components/primitives/button";

export const CreateFormFormUI: FC<{ teamSlug: string }> = ({ teamSlug }) => {
  const [name, setName] = useState("");

  return (
    <div className="p-6">
      <h1>Create Form</h1>
      <div className="mt-8">
        <div>
          <label htmlFor="form-name-input" className="block">
            Form name
          </label>
          <Input
            id="form-name-input"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            autoFocus
          />
        </div>
        <Button onClick={() => createForm({ title: name, teamSlug })}>
          Create
        </Button>
      </div>
    </div>
  );
};
