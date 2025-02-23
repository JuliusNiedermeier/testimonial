"use client";

import { FormProvider } from "@/components/form-provider";
import { NavigationButtons } from "@/components/navigation-buttons";
import { StepCarousel } from "@/components/step-carousel";
import { cn } from "@/utils/cn";

export default function Home() {
  return (
    <FormProvider>
      <div className="flex flex-col p-6 gap-8 h-[100svh]">
        <div className="flex gap-2">
          {Array.from(new Array(4)).map((_, index) => (
            <div
              key={index}
              className={cn("h-1 flex-1", {
                "bg-foreground-primary": index < 1,
                "bg-foreground-secondary": index >= 1,
              })}
            />
          ))}
        </div>
        <StepCarousel className="flex-1" />
        <NavigationButtons />
      </div>
    </FormProvider>
  );
}
