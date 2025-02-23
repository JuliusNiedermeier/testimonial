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

export interface StepConfig {
  id: string;
  title: string;
  blocks: BlockMap[keyof BlockMap][];
  nextStepId?: string;
}
