"use server";

import { ReactNode } from "react";
import { withSuspense } from "../utils/suspense-fallback";

type Params = Promise<object>;
type Children = (params: Awaited<Promise<object>>) => ReactNode;

export const WithParams = withSuspense<{ params: Params; children: Children }>({
  Component: async (props) => {
    const params = await props.params;
    return props.children(params);
  },
});
