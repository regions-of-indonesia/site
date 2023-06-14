import { klassed } from "@klass/solid";
import type { VariantsOf } from "@klass/core";

type IconButtonVariants = VariantsOf<(typeof IconButton)["klass"]>;

const IconButton = klassed(
  "button",
  {
    base: "inline-flex justify-center items-center rounded-xl outline-none select-none",
    variants: {
      color: {
        neutral: "bg-neutral-3 hover:bg-neutral-4 active:bg-neutral-5 text-neutral-11",
        primary: "bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-11",
      },
      size: {
        md: "w-8 h-8 p-1",
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

export type { IconButtonVariants };
export default IconButton;
