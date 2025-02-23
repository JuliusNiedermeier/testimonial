import { FC } from "react";
import { BlockMap } from ".";
import { Input } from "../primitives/input";

export const SingleLineTextInputBlock: FC<
  BlockMap["single-line-text-input"]
> = ({ config }) => {
  return <Input placeholder={config.placeholder} />;
};
