import { cn } from "@/app/_shared/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[gray]/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
