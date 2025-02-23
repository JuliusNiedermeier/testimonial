import { FC } from "react";
import { BlockMap } from ".";
import { cn } from "@/utils/cn";

export const HeadingBlock: FC<BlockMap["heading"]> = ({ config }) => {
  return <h1 className={cn("text-heading font-serif")}>{config.content}</h1>;
};
