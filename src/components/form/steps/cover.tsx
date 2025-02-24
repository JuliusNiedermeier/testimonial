"use client";

import { FC } from "react";
import { SpaceConfig } from "../space-config";

export const CoverStep: FC<SpaceConfig["steps"]["cover"]> = (props) => {
  return <h1 className="font-serif text-heading">{props.heading}</h1>;
};
