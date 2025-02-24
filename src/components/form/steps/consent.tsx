"use client";

import { FC } from "react";
import { SpaceConfig } from "../space-config";

export const ConsentStep: FC<SpaceConfig["steps"]["consent"]> = (props) => {
  return <h1 className="font-serif text-heading">{props.heading}</h1>;
};
