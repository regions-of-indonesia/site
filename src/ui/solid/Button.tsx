import { klassed } from "@klass/solid";
import type { VariantsOf } from "@klass/core";

type ButtonVariants = VariantsOf<(typeof Button)["klass"]>;

const Button = klassed(
  "button",
  {
    base: "inline-flex justify-center items-center rounded-xl outline-none select-none",
    variants: {
      color: {
        neutral: "bg-neutral-3 hover:bg-neutral-4 active:bg-neutral-5 text-neutral-11",
        primary: "bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-11",
      },
      size: {
        md: "h-8 px-3 py-1 font-medium text-base",
      },
    },
    defaultVariants: {
      color: "neutral",
      size: "md",
    },
  },
  {
    defaultProps: {
      type: "button",
    },
  }
);

export type { ButtonVariants };
export default Button;
