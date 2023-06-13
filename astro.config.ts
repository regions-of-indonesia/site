import { AstroUserConfig } from "astro";

import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

export default {
  site: "https://regions-of-indonesia.netlify.app",
  integrations: [solid(), tailwind(), sitemap(), compress()],
  server: { host: true, port: 1708 },
  compressHTML: true,
} satisfies AstroUserConfig;
