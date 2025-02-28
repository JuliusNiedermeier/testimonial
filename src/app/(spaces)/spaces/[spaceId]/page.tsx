import { Form } from "@/app/_shared/testimonial-form";
import { NavigationButtons } from "@/app/_shared/testimonial-form/navigation-buttons";
import { ProgressBar } from "@/app/_shared/testimonial-form/progress-bar";
import { StepCarousel } from "@/app/_shared/testimonial-form/step-carousel";
import { space } from "@/mock-space";
import { FC } from "react";

interface Props {
  params: Promise<{ spaceId: string }>;
}

const Home: FC<Props> = async ({ params }) => {
  const { spaceId } = await params; // Needs to be awaited since Next version 15

  return (
    <Form spaceId={spaceId} spaceConfig={space}>
      <div className="flex flex-col p-6 gap-8 h-[100svh] max-w-[40rem] mx-auto">
        <ProgressBar />
        <StepCarousel className="flex-1" />
        <NavigationButtons />
      </div>
    </Form>
  );
};

export default Home;
