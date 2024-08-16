import { defineConfig } from 'astro/config';
import qwikdev from "@qwikdev/astro";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [qwikdev(), svelte()]
});