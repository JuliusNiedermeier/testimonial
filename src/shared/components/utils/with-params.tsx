"use server";

import { ReactNode } from "react";
import { withSuspense, type WithSuspenseProps } from "./with-suspense";

type Props<Params extends Promise<object>> = WithSuspenseProps<{
  params: Params;
  children: (params: Awaited<Promise<Params>>) => ReactNode;
}>;

export const WithParams = async <Params extends Promise<object>>(
  props: Props<Params>
) => {
  const Suspended = withSuspense<typeof props>(async () => {
    const params = await props.params;
    return props.children(params);
  });

  return <Suspended {...props} />;
};
