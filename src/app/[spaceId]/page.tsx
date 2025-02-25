import { Form } from "@/components/form";
import { NavigationButtons } from "@/components/form/navigation-buttons";
import { ProgressBar } from "@/components/form/progress-bar";
import { StepCarousel } from "@/components/form/step-carousel";
import { space } from "@/mock-space";
import { FC } from "react";

interface Props {
  params: { spaceId: string };
}

const Home: FC<Props> = ({ params }) => {
  return (
    <Form spaceId={params.spaceId} spaceConfig={space}>
      <div className="flex flex-col p-6 gap-8 h-[100svh]">
        <ProgressBar />
        <StepCarousel className="flex-1" />
        <NavigationButtons />
      </div>
    </Form>
  );
};

export default Home;
