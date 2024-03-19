import { composed } from "@klass/solid";
import { compose, klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type ButtonVariants = VariantsOf<typeof buttonVariants>;

const baseButtonVariants = klass({
  base: [
    "inline-flex items-center justify-center rounded-xl outline-none select-none transition-transform",
    "focus-visible:ring-1 focus-visible:ring-offset-1",
    "active:scale-95",
  ],
  variants: {
    color: {
      neutral: "",
      primary: "",
    },
    variant: {
      default: "",
      outline: "",
    },
  },
  defaults: {
    color: "neutral",
    variant: "default",
  },
  compounds: [
    [
      { variant: "default", color: "neutral" },
      ["bg-neutral-9 text-white", "hover:bg-neutral-10", "focus-visible:ring-offset-neutral-1 focus-visible:ring-neutral-10"],
    ],
    [
      { variant: "default", color: "primary" },
      ["bg-primary-9 text-white", "hover:bg-primary-10", "focus-visible:ring-offset-primary-1 focus-visible:ring-primary-10"],
    ],
    [
      { variant: "outline", color: "neutral" },
      [
        "border border-neutral-6 text-neutral-11",
        "hover:border-neutral-7",
        "focus-visible:ring-offset-neutral-1 focus-visible:ring-neutral-10",
      ],
    ],
    [
      { variant: "outline", color: "primary" },
      [
        "border border-primary-6 text-primary-11",
        "hover:border-primary-7",
        "focus-visible:ring-offset-primary-1 focus-visible:ring-primary-10",
      ],
    ],
  ],
});

const buttonVariants = compose(
  baseButtonVariants,
  klass({
    variants: {
      size: {
        sm: "h-7 px-3 py-px font-normal text-sm",
        md: "h-8 px-4 py-0.5 font-medium text-base",
      },
    },
    defaults: {
      size: "md",
    },
  })
);

const Button = composed("button", buttonVariants, {
  dp: {
    type: "button",
  },
});

export type { ButtonVariants };
export { baseButtonVariants, buttonVariants };
export default Button;
