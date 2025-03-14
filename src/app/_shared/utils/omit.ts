export const omit = <Source extends object, Keys extends Array<keyof Source>>(
  source: Source,
  keys: Keys
) => {
  return Object.fromEntries(
    Object.entries(source).filter(
      ([key]) => !keys.includes(key as keyof Source)
    )
  ) as Omit<Source, Keys[number]>;
};
