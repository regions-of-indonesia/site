import { klassed } from "@klass/solid";
import type { VariantsOf } from "@klass/core";

type IconButtonVariants = VariantsOf<(typeof IconButton)["klass"]>;

const IconButton = klassed(
  "button",
  {
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
      size: {
        sm: "w-7 h-7 p-px font-normal text-sm",
        md: "w-8 h-8 p-0.5 font-medium text-base",
      },
      variant: {
        default: "",
        outline: "",
      },
    },
    defaults: {
      color: "neutral",
      size: "md",
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
  },
  {
    dp: {
      type: "button",
    },
  }
);

export type { IconButtonVariants };
export default IconButton;
