import type { Config } from "tailwindcss";

import coloradix, { gray, indigo } from "@coloradix/tailwindcss";

const radix = coloradix({
  gray,
  indigo,
})
  .alias({
    neutral: "gray",
    primary: "indigo",
  })
  .overlay(true)
  .enable(true);

export default {
  content: ["src/**/*.{astro,ts,tsx}"],
  theme: {
    colors: radix.colors,
    extend: {},
  },
  plugins: [radix.plugin],
} satisfies Config;
