# Luis Vieira Portfolio

This repository contains the source code for **Luis Vieira’s** portfolio, a single‑page static site built with [Astro](https://astro.build). The site features a clean, purposeful design with minimal CSS and is fully headless‑CMS ready via **Decap CMS**.

## Features

- **Astro** static site with a modular architecture.
- Plain CSS reset and custom CSS variables in a single global stylesheet (`src/styles/global.css`).
- Minimal JavaScript stub (`src/scripts/main.js`) ready for enhancements.
- Content stored in Git and editable via **Decap CMS** at `/admin`.
- Sections for hero, about, selected work, currently, background and contact with anchor links (`#hero`, `#about`, `#selected‑work`, `#currently`, `#background`, `#contact`).
- Easily deployable to Vercel with preview URLs for every PR and SSL on production.

## Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   By default Astro serves the site at `http://localhost:4321`. The Decap CMS is available locally at `http://localhost:4321/admin/` thanks to `local_backend: true`.

## Build & Preview

To generate a production build and preview it locally:

```bash
npm run build
npm run preview
```

The built files will be output to the `dist` directory.

## Deployment

This project outputs static HTML, CSS and JavaScript. It can be deployed anywhere static files are served. To deploy on Vercel:

1. **Create a GitHub repository** and push this code.
2. **Import the repository into Vercel** via the Vercel dashboard.
3. Set the **build command** to `npm run build` and the **output directory** to `dist`.
4. When connected, Vercel will build preview deployments for every pull request and deploy the `main` branch to production with automatic HTTPS.

## CMS Authentication

Decap CMS uses the GitHub backend to commit content changes. The CMS configuration is located at `public/admin/config.yml`. It currently targets the repository `LuisMMVieira/luis-portfolio` on the `main` branch. If you fork or rename this repository, update the `repo` field accordingly.

For local development the CMS runs in `local_backend` mode and does not require authentication. In production, when hosted on Vercel and connected to GitHub, the CMS will prompt you to authenticate with GitHub to commit edits.

---

Built with ❤️ by Luis Vieira.