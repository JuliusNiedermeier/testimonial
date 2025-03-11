import { FC, ReactNode, Suspense } from "react";

export type SyncFC<P = object> = FC<P> & {
  (props: P): Exclude<ReactNode, Promise<unknown>>;
};

export type WithSuspended<Props = object, SuspendedProps = object> =
  | ({ suspended: true } & SuspendedProps)
  | ({ suspended?: false } & Props);

export type WithSuspenseProps<P = object> = P & {
  suspense?: boolean;
  fallback?: ReactNode;
};

export const withSuspense = <Props extends object = object>(config: {
  Component: FC<Props>;
  Fallback?: SyncFC<Props>;
}) => {
  const WithSuspense = ({
    suspense,
    fallback,
    ...restProps
  }: WithSuspenseProps<Props>) => {
    const Component = <config.Component {...(restProps as Props)} />;

    const Fallback =
      fallback !== undefined ? (
        fallback
      ) : config.Fallback !== undefined ? (
        <config.Fallback {...(restProps as Props)} />
      ) : undefined;

    if (suspense === false) {
      return <config.Component {...(restProps as Props)} />;
    }

    return <Suspense fallback={Fallback}>{Component}</Suspense>;
  };

  return WithSuspense;
};

interface WithSuspenseFallbackConfig<
  AsyncProps extends object,
  UIProps extends object
> {
  AsyncComponent: FC<{ UIComponent: FC<UIProps> } & AsyncProps>;
  UIComponent: SyncFC<WithSuspended<UIProps, object>>; // Instead of putting object here, AsyncProps would be possible or a type that pulls fields out of AsyncProps based on another union type defined in the function type params.
}

export const withSuspenseFallback = <
  AsyncProps extends object,
  UIProps extends object
>(
  config: WithSuspenseFallbackConfig<AsyncProps, UIProps>
) => {
  const AsyncComponent = (props: AsyncProps) => (
    <config.AsyncComponent
      UIComponent={(uiProps) => (
        <config.UIComponent suspended={false} {...uiProps} />
      )}
      {...props}
    />
  );

  return Object.assign(
    withSuspense({
      Component: AsyncComponent,
      Fallback: (props) => <config.UIComponent suspended={true} {...props} />,
    }),
    { Async: AsyncComponent, UI: config.UIComponent }
  );
};
