"use client";

import {
  ComponentProps,
  FC,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "@/app/_shared/testimonial-form";
import { cn } from "@/app/_shared/utils/cn";
import { AnimatePresence, motion } from "motion/react";

export type StepCarouselProps = Omit<ComponentProps<"div">, "children">;

export const StepCarousel: FC<StepCarouselProps> = ({
  className,
  ...restProps
}) => {
  const { steps, form } = useForm();
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const deferredCurrentStepIndex = useDeferredValue(form?.currentStepIndex);
  const previousStepIndex = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const direction = useMemo(() => {
    if (
      form?.currentStepIndex === undefined ||
      previousStepIndex.current === undefined ||
      form.currentStepIndex === previousStepIndex.current
    ) {
      return 0;
    }

    return form.currentStepIndex > previousStepIndex.current ? 1 : -1;
  }, [form?.currentStepIndex]);

  previousStepIndex.current = form?.currentStepIndex;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([{ contentRect }]) => {
      setContainerWidth(contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  });

  const animationDistance = useMemo(() => {
    if (!containerWidth) return 0;
    return containerWidth + 20;
  }, [containerWidth]);

  if (form?.currentStepIndex === undefined) return;

  return (
    <div
      ref={containerRef}
      className={cn("flex-1 relative", className)}
      {...restProps}
    >
      <AnimatePresence>
        {typeof deferredCurrentStepIndex === "number" && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex-1 flex flex-col justify-end"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
            key={deferredCurrentStepIndex}
            initial={{ opacity: 0, x: animationDistance * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -animationDistance * direction }}
          >
            {steps?.[deferredCurrentStepIndex]?.component}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
