"use client";

import { FC } from "react";
import { SpaceConfig } from "../space-config";

export const RatingStep: FC<SpaceConfig["steps"]["rating"]> = (props) => {
  return <h1 className="font-serif text-heading">{props.heading}</h1>;
};
