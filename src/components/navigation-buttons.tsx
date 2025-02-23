import { ComponentProps, FC } from "react";
import { Button } from "./primitives/button";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "./form-provider";

export type NavigationButtonsProps = Omit<ComponentProps<"div">, "children">;

export const NavigationButtons: FC<NavigationButtonsProps> = ({
  className,
  ...restProps
}) => {
  const { next, previous } = useForm();

  return (
    <div className={cn("flex gap-4", className)} {...restProps}>
      <Button variant="secondary" onClick={previous}>
        <ChevronLeft />
      </Button>
      <Button variant="primary" className="flex-1" onClick={next}>
        <span className="flex-1">Next</span>
        <ChevronRight />
      </Button>
    </div>
  );
};
