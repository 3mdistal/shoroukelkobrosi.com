import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://alicealexandra.com",
  integrations: [mdx(), sitemap(), svelte()],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
