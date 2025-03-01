"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { deleteSpace } from "../_actions/delete-space";

export interface SpaceListItemProps {
  id: string;
  slug: string;
  title: string;
}

export const SpaceListItem: FC<SpaceListItemProps> = ({ id, slug, title }) => {
  return (
    <div className="flex hover:bg-background-secondary">
      <Link href={`/spaces/${slug}`} className="flex-1 text-label p-4">
        {title}
      </Link>
      <button
        className="px-4 hover:bg-foreground-primary hover:text-background-primary"
        onClick={() => deleteSpace(id)}
      >
        <X />
      </button>
    </div>
  );
};
