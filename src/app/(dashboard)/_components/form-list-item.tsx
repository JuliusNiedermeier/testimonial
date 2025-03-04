"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { deleteForm } from "../_actions/delete-form";

export interface FormListItemProps {
  id: string;
  slug: string;
  title: string;
}

export const FormListItem: FC<FormListItemProps> = ({ id, slug, title }) => {
  return (
    <div className="flex hover:bg-background-secondary">
      <Link href={`/forms/${slug}`} className="flex-1 text-label p-4">
        {title}
      </Link>
      <button
        className="px-4 hover:bg-foreground-primary hover:text-background-primary"
        onClick={() => deleteForm(id)}
      >
        <X />
      </button>
    </div>
  );
};
