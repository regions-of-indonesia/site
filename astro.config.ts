import { AstroUserConfig } from "astro";

import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

export default {
  site: "https://regions-of-indonesia.netlify.app",
  integrations: [
    tailwind(),
    solid(),
    sitemap(),
    compress({
      Logger: 0,
    }),
  ],
  server: { host: true, port: 1708 },
  compressHTML: true,
} satisfies AstroUserConfig;
