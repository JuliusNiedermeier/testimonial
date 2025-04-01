import { cn } from "@app/_utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";

export type StarProps = Omit<ComponentProps<"svg">, "children"> &
  VariantProps<typeof starVariants>;

const starVariants = cva("[&>path]:stroke-foreground [&>path]:stroke-2", {
  variants: {
    variant: {
      outline: "",
      filled: "[&>path]:fill-foreground",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});

export const Star: FC<StarProps> = ({ variant, className, ...restProps }) => {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      className={cn(starVariants({ variant }), className)}
      {...restProps}
    >
      <path d="M9.38815 7.34986L12 1.55944L14.6118 7.34986C14.8529 7.88422 15.364 8.22765 15.9255 8.27909L22.3706 8.8695L17.5472 12.9638C17.1056 13.3387 16.8975 13.9304 17.0317 14.5094L18.4427 20.5995L12.7985 17.396C12.3043 17.1155 11.6957 17.1155 11.2015 17.396L5.55733 20.5995L6.96831 14.5094C7.10248 13.9304 6.89438 13.3386 6.45282 12.9638L1.62939 8.8695L8.0745 8.27909C8.63601 8.22765 9.14712 7.88422 9.38815 7.34986Z" />
    </svg>
  );
};
