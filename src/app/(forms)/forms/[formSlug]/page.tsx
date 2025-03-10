import { db } from "@/app/_shared/db";
import { Form } from "@/app/_shared/testimonial-form";
import { NavigationButtons } from "@/app/_shared/testimonial-form/navigation-buttons";
import { ProgressBar } from "@/app/_shared/testimonial-form/progress-bar";
import { StepCarousel } from "@/app/_shared/testimonial-form/step-carousel";
import { formConfig } from "@/mock-form-config";
import { notFound } from "next/navigation";
import { FC } from "react";

interface Props {
  params: Promise<{ formSlug: string }>;
}

const Home: FC<Props> = async ({ params }) => {
  const { formSlug } = await params; // Needs to be awaited since Next version 15

  const form = await db.form.findFirst({ where: { slug: formSlug } });

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
};

export default Home;
