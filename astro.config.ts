import { AstroUserConfig } from "astro";

import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

export default {
  integrations: [solid(), tailwind()],
  server: { host: true, port: 1708 },
  compressHTML: true,
} satisfies AstroUserConfig;
