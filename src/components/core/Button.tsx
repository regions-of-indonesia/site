import { klassed } from "@klass/solid";
import type { VariantsOf } from "@klass/core";

type ButtonVariants = VariantsOf<(typeof Button)["klass"]>;

const Button = klassed(
  "button",
  {
    base: "inline-flex items-center justify-center rounded-xl outline-none select-none focus-visible:ring-1 focus-visible:ring-offset-1 active:scale-95 transition-transform",
    variants: {
      color: {
        neutral: "bg-neutral-9 hover:bg-neutral-10 focus-visible:ring-offset-neutral-2 focus-visible:ring-neutral-10 text-white",
        primary: "bg-primary-9 hover:bg-primary-10 focus-visible:ring-offset-primary-2 focus-visible:ring-primary-10 text-white",
      },
      size: {
        md: "h-8 px-4 py-0.5 font-medium text-base",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
  {
    dp: {
      type: "button",
    },
  }
);

export type { ButtonVariants };
export default Button;
