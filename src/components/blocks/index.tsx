import { FC } from "react";
import { HeadingBlock } from "./heading";
import { BodyBlock } from "./body";
import { SingleLineTextInputBlock } from "./single-line-text-input";

interface BlockConfigTypeMap {
  heading: {
    content: string;
  };
  body: {
    content: string;
  };
  "single-line-text-input": {
    placeholder: string;
  };
}

export type BlockMap = {
  [Key in keyof BlockConfigTypeMap]: {
    id: string;
    title: string;
    type: Key;
    config: BlockConfigTypeMap[Key];
  };
};

export const blocks = {
  heading: HeadingBlock,
  body: BodyBlock,
  "single-line-text-input": SingleLineTextInputBlock,
} satisfies Record<keyof BlockMap, FC<any>>;

export const Block = (<Type extends keyof BlockMap>(props: BlockMap[Type]) => {
  const BlockComponent = blocks[props.type] as FC<BlockMap[Type]>;
  return <BlockComponent {...props} />;
}) satisfies FC<any>;
