"use client";

import { FC } from "react";
import { SpaceConfig } from "../space-config";

export const FeedbackTypeStep: FC<SpaceConfig["steps"]["feedbackType"]> = (
  props
) => {
  return <h1 className="font-serif text-heading">{props.heading}</h1>;
};
