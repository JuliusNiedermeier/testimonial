import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";

const buttonVariants = cva("p-6 text-label", {
  variants: {
    variant: {
      primary: "bg-foreground-primary text-background-primary",
      secondary: "bg-background-secondary text-foreground-primary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button: FC<ButtonProps> = ({ children, className, variant }) => {
  return (
    <button className={buttonVariants({ className, variant })}>
      {children}
    </button>
  );
};
