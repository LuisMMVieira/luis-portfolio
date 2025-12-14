import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

export default defineConfig({
  // Output a fully static site.
  output: "static",

  site: "https://your-site-url.com",

  devToolbar: {
    enabled: false,
  },

  integrations: [mdx()],
});