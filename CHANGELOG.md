# Changelog

All notable changes to ElliottSecurity Platform will be documented in this file.

This project follows Semantic Versioning.

---

# [Unreleased]

## Added

- Centralized design token system (`tokens.css`, `theme.css`, `typography.css`, `animations.css`, `utilities.css`)
- Future theme stubs: dark (default), light, high-contrast
- Atmosphere backgrounds with layered purple gradients, vignette, and subtle noise

## Changed

- Brand palette migrated from cyan to ElliottSecurity purple tokens
- Navigation, footer, buttons, cards, tags, code blocks, and homepage redesigned on tokens
- Markdown prose, callouts, and tables styled via design tokens
- Brand assets (favicon, apple-touch-icon, OG image) updated to purple system
- Full PWA icon set generated from `public/brand/logo.svg` (favicon.ico/svg, apple-touch-icon.png, android-chrome 192/512)
- Geometric ElliottSecurity monogram (custom E in hexagonal shield) as primary brand mark
- Brand documentation under `docs/branding/`
- `LogoMark` and `BrandLoader` components for nav, footer, and loading states

## Planned

- Client-side search UI
- RSS feed
- Research content collection
- Theme switcher UI (tokens already support light / high-contrast)

---

# v1.0.0-rc.1

## Production Readiness Release

Date: 2026-07-11

### Added

- `@astrojs/sitemap` integration with `sitemap-index.xml`
- Custom 404 page with navigation recovery
- Global Organization and WebSite JSON-LD on every page
- CollectionPage and BreadcrumbList schema on listing pages
- `CoverImage` component with lazy loading and broken-image fallback
- `EmptyState` component for collection and tag listing pages
- Homepage detection engineering section
- `npm run check` script with `@astrojs/check`
- Production README with install, content, and deployment guides

### Changed

- SEO metadata: canonical URLs, Open Graph image alt, improved robots directives
- Cloudflare `_headers`: HTML revalidation, immutable `/_astro/` assets, sitemap caching
- Navigation: removed broken `/research` link, Escape key closes mobile menu
- Removed template `example.md` project and unused markdown/search dead code
- Updated placeholder copy across homepage and collection listings
- Version bumped to `1.0.0-rc.1`

### Fixed

- `StructuredData.astro` import path
- TypeScript errors in remark callouts, detections resolver, and navigation focus

---

# v0.3.0-beta.1

## Foundation Release

Date

TBD

### Added

- Astro 7
- Tailwind CSS
- Base Layout
- Responsive Navigation
- Footer
- Global Styling
- Site Configuration
- Project Documentation
- Cloudflare Pages deployment
- GitHub repository
- Initial engineering architecture

### Documentation

Added

- ARCHITECT.md
- PRODUCT_VISION.md
- ROADMAP.md
- CHANGELOG.md

### Infrastructure

Established

- Repository conventions
- Folder conventions
- TypeScript conventions
- Git workflow
- Deployment strategy

---

# Release Notes

This release establishes the engineering foundation of ElliottSecurity Platform.

The primary objective is long-term maintainability.

Future releases will focus on Markdown publishing and content automation rather than redesigning the architecture.

---

# Semantic Versioning

Major

Breaking architectural changes.

Example

2.0.0

---

Minor

New platform features.

Example

1.4.0

---

Patch

Bug fixes.

Example

1.4.2

---

# Commit Conventions

The project follows Conventional Commits.

Examples

feat:

fix:

docs:

refactor:

style:

perf:

test:

build:

ci:

chore:

---

# Release Workflow

Feature Branch

↓

Review

↓

Merge to Main

↓

GitHub

↓

Cloudflare Pages

↓

Production

---

# Deployment Policy

Only the main branch deploys to production.

Every production deployment should correspond to a documented version in this file.

---

# Documentation Policy

Every release should update

CHANGELOG.md

ROADMAP.md

Documentation

Version numbers

when applicable.

---

# Project Philosophy

The changelog should describe meaningful engineering progress rather than every small commit.

Releases should tell the story of how the platform evolves over time.