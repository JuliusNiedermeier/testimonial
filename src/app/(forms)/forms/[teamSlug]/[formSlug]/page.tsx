import { WithParams } from "@/app/_shared/components/utils/with-params";
import { db } from "@/app/_shared/db";
import { Form } from "@/app/_shared/testimonial-form";
import { NavigationButtons } from "@/app/_shared/testimonial-form/navigation-buttons";
import { ProgressBar } from "@/app/_shared/testimonial-form/progress-bar";
import { StepCarousel } from "@/app/_shared/testimonial-form/step-carousel";
import { formConfig } from "@/mock-form-config";
import { unstable_cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { FC } from "react";

interface Props {
  params: Promise<{ teamSlug: string; formSlug: string }>;
}

const getFormBySlug = async (teamSlug: string, formSlug: string) => {
  const form = await db.form.findFirst({
    where: { slug: formSlug, team: { slug: teamSlug } },
  });

  if (form) unstable_cacheTag(`form:${teamSlug}:${formSlug}`);

  return form;
};

const Home: FC<Props> = ({ params }) => {
  return (
    <WithParams
      params={params}
      fallback={
        <div className="hw-full w-full p-6">
          <div className="h-full w-full skeleton" />
        </div>
      }
    >
      {async (params) => {
        "use cache";

        const form = await getFormBySlug(params.formSlug, params.teamSlug);
        if (!form) notFound();

        return (
          <Form formId={form.id} formConfig={formConfig}>
            <div className="flex flex-col p-6 gap-8 h-[100svh] max-w-[40rem] mx-auto">
              <ProgressBar />
              <StepCarousel className="flex-1" />
              <NavigationButtons />
            </div>
          </Form>
        );
      }}
    </WithParams>
  );
};

export default Home;
