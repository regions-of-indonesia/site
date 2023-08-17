import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

import kobalte from "@kobalte/tailwindcss";

import coloradix, { mauve, orange } from "@coloradix/tailwindcss";

const radix = coloradix({
  mauve,
  orange,
})
  .alias({
    neutral: "mauve",
    primary: "orange",
  })
  .overlay(true)
  .enable(true);

export default {
  content: ["src/**/*.{astro,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      ...radix.colors,
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [radix.plugin, kobalte({})],
} satisfies Config;
