import { defineConfig } from "astro/config";

export default defineConfig({
  // Output a fully static site.
  output: "static",
  site: "https://your-site-url.com",
  devToolbar: {
    enabled: false,
  },
});
