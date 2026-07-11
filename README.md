# ElliottSecurity Platform

Static cybersecurity knowledge platform built with Astro 7, TypeScript, Tailwind CSS 4, and Markdown content collections. Designed for Cloudflare Pages deployment with zero server runtime.

## Features

- Six content collections: articles, projects, threat hunts, detections, homelab, and products
- Detection engineering pages with downloadable rule artifacts, revision history, and MITRE mapping
- Knowledge graph: tag index, related content, and cross-collection linking
- SEO: canonical URLs, Open Graph, Twitter Cards, JSON-LD (Organization, WebSite, Article, BreadcrumbList, CollectionPage)
- Fully static output — all pages pre-rendered at build time

## Requirements

- Node.js >= 22.12.0
- npm

## Installation

```bash
git clone https://github.com/elliottsecurity/ElliottSecurity-Website.git
cd ElliottSecurity-Website
npm install
```

## Development

Start the dev server (background mode recommended):

```bash
astro dev --background
```

Manage the background server:

```bash
astro dev status
astro dev logs
astro dev stop
```

Or use the npm script:

```bash
npm run dev
```

The site runs at `http://localhost:4321`.

## Build and Preview

```bash
npm run build
npm run preview
npm run check
```

Production output is written to `dist/`.

## Publishing Content

Add Markdown files under `src/content/{collection}/`. Each collection schema is defined in `src/content.config.ts`.

| Collection | Path | URL prefix |
| --- | --- | --- |
| Articles | `src/content/articles/` | `/articles/{slug}/` |
| Projects | `src/content/projects/` | `/projects/{slug}/` |
| Threat Hunts | `src/content/threat-hunts/` | `/threat-hunts/{slug}/` |
| Detections | `src/content/detections/` | `/detection-engineering/{slug}/` |
| Homelab | `src/content/homelab/` | `/homelab/{slug}/` |
| Products | `src/content/products/` | `/products/{slug}/` |

Set `draft: true` in frontmatter to hide entries from production builds.

Detection rule downloads go in `public/detections/{slug}/`.

## Deployment (Cloudflare Pages)

1. Connect the GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: 22 or later

Security headers and caching rules are configured in `public/_headers`. `robots.txt` references the auto-generated sitemap at `/sitemap-index.xml`.

For custom domains, set `site` in `astro.config.mjs` and `SITE.url` in `src/config/site.ts`.

## Project Structure

```
src/
├── components/     UI, content, detection, and SEO components
├── config/         Site metadata and navigation
├── content/        Markdown content collections
├── layouts/        Page layouts
├── lib/            Content queries, SEO, structured data, knowledge engine
├── pages/          Routes (static + dynamic)
└── styles/         Global CSS and Tailwind theme
```

## Documentation

- [ARCHITECT.md](./ARCHITECT.md) — platform architecture
- [PRODUCT_VISION.md](./PRODUCT_VISION.md) — product goals
- [ROADMAP.md](./ROADMAP.md) — planned work
- [CHANGELOG.md](./CHANGELOG.md) — release history
- [PROJECT_RULES.md](./PROJECT_RULES.md) — engineering conventions

## License

See repository license file.
