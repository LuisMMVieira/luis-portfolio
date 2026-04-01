import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import react from "@astrojs/react";

export default defineConfig({
  // Output a fully static site.
  output: "static",

  site: "https://luisvieira.design",

  devToolbar: {
    enabled: false,
  },

  server: {
    host: "0.0.0.0",
  },

  integrations: [mdx(), sitemap(), react()],

  vite: {
    server: {
      headers: {
        "X-Frame-Options": "ALLOWALL",
      },
    },
  },
});