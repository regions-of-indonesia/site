import type { Config } from "tailwindcss";

import coloradix, { gray, red } from "@coloradix/tailwindcss";

const radix = coloradix({ gray, red }).alias({ neutral: "gray", primary: "red" }).overlay(true).enable(true);

export default {
  content: ["src/**/*.{astro,ts,tsx}"],
  theme: {
    colors: radix.colors,
    extend: {},
  },
  plugins: [radix.plugin],
} satisfies Config;
