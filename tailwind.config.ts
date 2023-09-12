import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

import kobalte from "@kobalte/tailwindcss";

import coloradix, { mauve, red } from "@coloradix/tailwindcss";

const radix = coloradix({
  mauve,
  red,
})
  .alias({
    neutral: "mauve",
    primary: "red",
  })
  .build();

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
  safelist: ["lucide"],
  plugins: [
    radix.plugin,
    plugin(({ addComponents }) => {
      addComponents({
        ".lucide": {
          width: "20px",
          height: "20px",
          strokeWidth: "1.5",
        },
      });
    }),
    kobalte({}),
  ],
} satisfies Config;
