export type WithRequire<
  Discriminator extends string,
  RequiredType,
  UnrequiredType
> =
  | ({ [K in Discriminator]: true } & RequiredType)
  | ({ [K in Discriminator]?: false } & UnrequiredType);
