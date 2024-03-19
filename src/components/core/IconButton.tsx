import { composed } from "@klass/solid";
import { compose, klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import { baseButtonVariants } from "./Button";

type IconButtonVariants = VariantsOf<typeof iconButtonVariants>;

const iconButtonVariants = compose(
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

const IconButton = composed("button", iconButtonVariants, {
  dp: {
    type: "button",
  },
});

export type { IconButtonVariants };
export default IconButton;
