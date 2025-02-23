import { FC } from "react";
import { HeadingBlock } from "./heading";
import { BodyBlock } from "./body";
import { SingleLineTextInputBlock } from "./single-line-text-input";
import { BlockMap } from "@/utils/step-builder";

export const blocks = {
  heading: HeadingBlock,
  body: BodyBlock,
  "single-line-text-input": SingleLineTextInputBlock,
} satisfies Record<keyof BlockMap, FC<any>>;

export const Block = (<Type extends keyof BlockMap>(props: BlockMap[Type]) => {
  const BlockComponent = blocks[props.type] as FC<BlockMap[Type]>;
  return <BlockComponent {...props} />;
}) satisfies FC<any>;
