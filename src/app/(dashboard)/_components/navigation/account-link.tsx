import Image from "next/image";
import { WithFallbackProps } from "@/app/_shared/utils/types";
import { cn } from "@/app/_shared/utils/cn";
import { Session } from "@/app/_shared/utils/auth";
import { SFC } from "@/app/_shared/utils/types";

export const AccountLink: SFC<
  WithFallbackProps<{ user: Session["user"] }, object>
> = (props) => {
  return (
    <div className="p-6 flex gap-4 items-center hover:bg-background-secondary text-left overflow-hidden">
      <div
        className={cn(
          "shrink-0 size-12 relative rounded-full overflow-hidden",
          {
            "bg-background-secondary": !props.fallback,
            "skeleton rounded-full": props.fallback,
          }
        )}
      >
        {!props.fallback && props.user.image && (
          <Image
            src={props.user.image}
            alt={props.user.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="overflow-hidden w-full flex flex-col gap-1">
        <span
          className={cn("text-label truncate block", {
            skeleton: props.fallback,
          })}
        >
          {props.fallback ? " " : props.user.name}
        </span>
        <span
          className={cn("text-foreground-secondary truncate block", {
            skeleton: props.fallback,
          })}
        >
          {props.fallback ? " " : props.user.email}
        </span>
      </div>
    </div>
  );
};
