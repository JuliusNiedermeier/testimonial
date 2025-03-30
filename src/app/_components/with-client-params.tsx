"use client";

import { ReactNode, use } from "react";
import {
  withSuspense,
  type WithSuspenseProps,
} from "@app/_components/with-suspense";

type Props<Params extends Promise<object>> = WithSuspenseProps<{
  params: Params;
  children: (params: Awaited<Params>) => ReactNode;
}>;

export const WithClientParams = async <Params extends Promise<object>>(
  props: Props<Params>
) => {
  const Suspended = withSuspense<typeof props>(() => {
    // Without type assertion TypeScript complains,
    // that type "object" is not assignable to type "Awaited<Params>" when passed to children.
    const params = use(props.params as Params) as Awaited<Params>;
    return props.children(params);
  });

  return <Suspended {...props} />;
};
