import { defineConfig } from "astro/config";
import qwikdev from "@qwikdev/astro";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  experimental: {
    actions: true,
  },
  integrations: [qwikdev(), svelte()],
  output: "server",
});
