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
    colors: radix.colors,
    extend: {},
  },
  plugins: [radix.plugin, kobalte({})],
} satisfies Config;
