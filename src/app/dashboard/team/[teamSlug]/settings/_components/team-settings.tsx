"use client";

import { Button } from "@app/_components/primitives/button";
import { Input } from "@app/_components/primitives/input";
import { FC, useState } from "react";
import { updateTeamSettings } from "@app/dashboard/team/[teamSlug]/settings/_actions/update-team-settings";
import { deleteTeam } from "@app/dashboard/team/[teamSlug]/settings/_actions/delete-team";

interface TeamSettingsProps {
  slug: string;
  name: string;
}

const TeamSettings: FC<TeamSettingsProps> = (props) => {
  const [name, setName] = useState(props.name);
  const [slug, setSlug] = useState(props.slug);

  return (
    <div className="p-6">
      <h1>Team settings</h1>
      <div className="mt-8 flex flex-col gap-4 border p-4">
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
        <div>
          <label htmlFor="team-slug-input" className="block">
            Team slug
          </label>
          <Input
            id="team-slug-input"
            value={slug}
            onInput={(e) => setSlug(e.currentTarget.value)}
            autoFocus
          />
        </div>
        <Button
          onClick={() => {
            updateTeamSettings({ teamSlug: props.slug, data: { name, slug } });
          }}
        >
          Save
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-4 border p-4">
        <Button
          className="bg-[red]"
          onClick={() => deleteTeam({ teamSlug: props.slug })}
        >
          Delete Team {props.name}
        </Button>
      </div>
    </div>
  );
};

export default TeamSettings;
