import { FC, ReactNode } from "react";

export type WithBooleanDiscriminator<
  Discriminator extends string,
  TrueType,
  FalseType
> =
  | ({ [K in Discriminator]: true } & TrueType)
  | ({ [K in Discriminator]?: false } & FalseType);

export type WithFallbackProps<
  Props,
  FallbackProps = Props
> = WithBooleanDiscriminator<
  "fallback",
  Omit<FallbackProps, "children">,
  Props
>;

/** Synchronous Functional Component */
export type SFC<P = object> = FC<P> & {
  (props: P): Exclude<ReactNode, Promise<unknown>>;
};
