import { WithParams } from "@app/_components/with-params";
import Link from "next/link";
import { FC } from "react";
import { FormSettings } from "./_components/form-settings";
import { getFormBySlug } from "./_utils/get-form-by-slug";
import { notFound } from "next/navigation";
import { WithSession } from "root/src/app/_components/with-session";
import { getMembershipBySlug } from "../../_utils/get-membership-by-slug";

interface Props {
  params: Promise<{ teamSlug: string; formSlug: string }>;
}

const Form: FC<Props> = ({ params }) => {
  return (
    <div className="p-6">
      <WithSession
        require
        fallback={<div className="h-full w-full skeleton" />}
      >
        {(session) => (
          <WithParams params={params} suspense={false}>
            {async ({ teamSlug, formSlug }) => {
              "use cache";

              await getMembershipBySlug({
                teamSlug,
                userId: session.user.id,
                require: true,
              });

              const form = await getFormBySlug({ teamSlug, formSlug });

              if (!form) notFound();

              return (
                <div>
                  <Link href={`/forms/${teamSlug}/${formSlug}`}>
                    Visit form
                  </Link>
                  <FormSettings
                    formSlug={formSlug}
                    teamSlug={teamSlug}
                    title={form.title}
                  />
                </div>
              );
            }}
          </WithParams>
        )}
      </WithSession>
    </div>
  );
};

export default Form;
