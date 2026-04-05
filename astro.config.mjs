import { defineConfig } from "astro/config";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// Dev-only: save kanban board state to disk
function kanbanSavePlugin() {
  return {
    name: "kanban-save",
    configureServer(server) {
      server.middlewares.use("/api/kanban", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const data = JSON.parse(body);
            const file = resolve("src/data/kanban.json");
            writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    },
  };
}

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
    plugins: [kanbanSavePlugin()],
    server: {
      headers: {
        "X-Frame-Options": "ALLOWALL",
      },
    },
  },
});