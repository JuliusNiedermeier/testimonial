import { ComponentProps, FC } from "react";
import { BlockMap } from "./blocks";
import { cn } from "@/utils/cn";
import { Block } from "./blocks/index";

export interface StepConfig {
  id: string;
  title: string;
  blocks: BlockMap[keyof BlockMap][];
}

export interface Props extends Omit<ComponentProps<"div">, "children"> {
  config: StepConfig;
}

export const Step: FC<Props> = ({ className, config, ...restProps }) => {
  return (
    <div className={cn("", className)} {...restProps}>
      {config.blocks.map((block) => (
        <Block key={block.id} {...block} />
      ))}
    </div>
  );
};
