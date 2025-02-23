import { FC } from "react";
import { BlockMap } from ".";
import { cn } from "@/utils/cn";

export const BodyBlock: FC<BlockMap["body"]> = ({ config }) => {
  return <p className={cn("text-foreground-secondary")}>{config.content}</p>;
};
