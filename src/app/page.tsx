"use client";

import { Button } from "@/components/primitives/button";
import { Step } from "@/components/step";
import { steps } from "@/steps";
import { cn } from "@/utils/cn";
import { useMemo, useState } from "react";

export default function Home() {
  const [currentStepId, setCurrentStepId] = useState(steps[0].id);

  const currentStepConfig = useMemo(
    () => steps.find((step) => step.id === currentStepId),
    [currentStepId]
  );

  return (
    <div className="flex flex-col p-8 gap-8 h-[100svh]">
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
      {currentStepConfig && (
        <Step className="flex-1" config={currentStepConfig} />
      )}
      <Button>Next</Button>
    </div>
  );
}
