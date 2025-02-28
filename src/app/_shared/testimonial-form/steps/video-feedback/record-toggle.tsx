import { cn } from "@/app/_shared/utils/cn";
import { Loader2 } from "lucide-react";
import { ComponentProps, FC } from "react";

export type RecordToggleState = "recording" | "idle" | "loading" | "disabled";

export type RecordToggleProps = Omit<ComponentProps<"button">, "children"> & {
  state: RecordToggleState;
};

export const RecordToggle: FC<RecordToggleProps> = ({
  className,
  state,
  ...restProps
}) => {
  return (
    <button
      className={cn(
        "size-20 rounded-full border-[3px] border-background-primary flex items-center justify-center gap-4 transition-colors pointer-events-auto",
        {
          "bg-[red]": state === "recording",
          "opacity-50": state === "disabled",
        },
        className
      )}
      disabled={state === "disabled"}
      {...restProps}
    >
      {(state === "idle" || state === "recording" || state === "disabled") && (
        <div
          className={cn("size-6 bg-background-primary transition-all", {
            "rounded-full": state === "idle" || state === "disabled",
            "rounded-md": state === "recording",
          })}
        />
      )}

      {state === "loading" && <Loader2 className="animate-spin" />}
    </button>
  );
};
