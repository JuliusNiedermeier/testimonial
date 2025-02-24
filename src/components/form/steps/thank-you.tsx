"use client";

import { FC } from "react";
import { SpaceConfig } from "../space-config";

export const ThankYouStep: FC<SpaceConfig["steps"]["thankYou"]> = (props) => {
  return <h1 className="font-serif text-heading">{props.heading}</h1>;
};
