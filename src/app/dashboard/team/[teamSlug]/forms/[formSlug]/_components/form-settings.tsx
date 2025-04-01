"use client";

import { Button } from "@app/_components/primitives/button";
import { Input } from "@app/_components/primitives/input";
import { FC, useState } from "react";
import { updateFormSettings } from "../_actions/update-form-settings";
import { deleteForm } from "../_actions/delete-form";
import { useRouter } from "next/navigation";

interface FormSettingsProps {
  teamSlug: string;
  formSlug: string;
  title: string;
}

export const FormSettings: FC<FormSettingsProps> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [newFormSlug, setNewFormSlug] = useState(props.formSlug);

  const router = useRouter();

  return (
    <div className="p-6">
      <h1>Form settings</h1>
      <div className="mt-8 flex flex-col gap-4 border p-4">
        <div>
          <label htmlFor="form-title-input" className="block">
            Form title
          </label>
          <Input
            id="form-title-input"
            value={title}
            onInput={(e) => setTitle(e.currentTarget.value)}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="form-slug-input" className="block">
            Form slug
          </label>
          <Input
            id="form-slug-input"
            value={newFormSlug}
            onInput={(e) => setNewFormSlug(e.currentTarget.value)}
            autoFocus
          />
        </div>
        <Button
          onClick={() => {
            updateFormSettings({
              teamSlug: props.teamSlug,
              formSlug: props.formSlug,
              data: { title, slug: newFormSlug },
            });
          }}
        >
          Save
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-4 border p-4">
        <Button
          variant="destructive"
          onClick={() =>
            deleteForm(props.teamSlug, props.formSlug).then((success) => {
              if (!success) return;
              router.replace(`/dashboard/team/${props.teamSlug}/testimonials`);
            })
          }
        >
          Delete Form {props.title}
        </Button>
      </div>
    </div>
  );
};
