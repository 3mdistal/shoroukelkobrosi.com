import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://alicealexandra.com",
  integrations: [
    mdx(),
    sitemap(),
    svelte({
      configFile:
        "/Users/monkey/Downloads/Coding Projects/teenylilapps/apps/alicealexandra.com/svelte.config.js",
    }),
    qwikdev(),
  ],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  experimental: {
    contentCollectionCache: true,
  },
});
