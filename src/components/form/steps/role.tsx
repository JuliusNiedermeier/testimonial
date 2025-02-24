"use client";

import { FC } from "react";
import { SpaceConfig } from "../space-config";

export const RoleStep: FC<SpaceConfig["steps"]["role"]> = (props) => {
  return <h1 className="font-serif text-heading">{props.heading}</h1>;
};
