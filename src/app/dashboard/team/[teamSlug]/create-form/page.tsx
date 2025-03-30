"use client";

import { Button } from "@app/_components/primitives/button";
import { Input } from "@app/_components/primitives/input";
import { FC, useState } from "react";
import { createForm } from "@app/dashboard/team/[teamSlug]/create-form/_actions/create-form";
import { WithClientParams } from "root/src/app/_components/with-client-params";
import { SFC, WithFallbackProps } from "root/src/app/_utils/types";

const CreateForm: FC<{ params: Promise<{ teamSlug: string }> }> = ({
  params,
}) => {
  return (
    <div className="p-6">
      <WithClientParams params={params} fallback={<CreateFormUI fallback />}>
        {({ teamSlug }) => <CreateFormUI teamSlug={teamSlug} />}
      </WithClientParams>
    </div>
  );
};

const CreateFormUI: SFC<WithFallbackProps<{ teamSlug: string }, object>> = (
  props
) => {
  const [name, setName] = useState("");

  if (props.fallback) return <div className="h-full w-full skeleton" />;

  return (
    <>
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
        <Button
          onClick={() => createForm({ title: name, teamSlug: props.teamSlug })}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default CreateForm;
