import Image from "next/image";
import { WithFallbackProps } from "@app/_utils/types";
import { cn } from "@app/_utils/cn";
import { Session } from "@app/_auth/server";
import { SFC } from "@app/_utils/types";

export const AccountBadge: SFC<
  WithFallbackProps<{ user: Session["user"] }, object>
> = (props) => {
  return (
    <div className="p-6 flex gap-4 items-center hover:bg-secondary text-left overflow-hidden">
      <div
        className={cn(
          "shrink-0 size-12 relative rounded-full overflow-hidden",
          {
            "bg-secondary": !props.fallback,
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
            "skeleton h-[1em] w-2/3": props.fallback,
          })}
        >
          {!props.fallback && props.user.name}
        </span>
        <span
          className={cn("text-muted-foreground truncate block", {
            "skeleton h-[1em]": props.fallback,
          })}
        >
          {!props.fallback && props.user.email}
        </span>
      </div>
    </div>
  );
};
