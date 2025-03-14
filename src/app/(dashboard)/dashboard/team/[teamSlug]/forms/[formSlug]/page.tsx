import { WithParams } from "@/app/_shared/components/utils/with-params";
import Link from "next/link";
import { FC } from "react";

interface Props {
  params: Promise<{ teamSlug: string; formSlug: string }>;
}

const Form: FC<Props> = ({ params }) => {
  return (
    <div className="p-6">
      <WithParams
        params={params}
        fallback={<div className="h-full w-full skeleton" />}
      >
        {async ({ teamSlug, formSlug }) => {
          "use cache";
          return (
            <Link href={`/forms/${teamSlug}/${formSlug}`}>Visit form</Link>
          );
        }}
      </WithParams>
    </div>
  );
};

export default Form;
