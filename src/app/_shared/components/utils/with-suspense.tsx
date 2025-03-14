import { FC, ReactNode, Suspense } from "react";

export type WithSuspenseProps<Props extends object = object> = Props & {
  suspense?: boolean;
  fallback?: ReactNode;
};

export const withSuspense = <Props extends object>(Component: FC<Props>) => {
  const WithSuspense: FC<WithSuspenseProps<Props>> = ({
    suspense,
    fallback,
    ...componentProps
  }) => {
    if (suspense === false) {
      return <Component {...(componentProps as Props)} />;
    }

    return (
      <Suspense fallback={fallback}>
        <Component {...(componentProps as Props)} />
      </Suspense>
    );
  };

  return WithSuspense;
};
