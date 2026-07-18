# Icon Usage

## Brand monogram

The geometric E monogram is the **only** brand icon for identity surfaces.

| Surface | Asset / component |
|---------|-------------------|
| Browser tab | `/favicon.ico`, `/favicon.svg` |
| Apple home screen | `/apple-touch-icon.png` |
| Android / PWA | `/android-chrome-192x192.png`, `/android-chrome-512x512.png` |
| Navigation / footer | `LogoMark.astro` |
| Loading | `BrandLoader.astro` |
| Social / OG | `/og-default.svg` (includes monogram) |
| Transparent export | `/logo-mark.svg` |
| Lockup export | `/logo.svg` |

Manifest: `/site.webmanifest`

---

## UI icons (non-brand)

Functional UI icons (menus, external links, status) may use simple stroke icons.

Rules:

- Do not reuse the monogram as a decorative bullet or list icon
- Do not mix the old shield-and-check glyph with the new mark
- Keep stroke icons optically balanced with `--color-text-muted` / `--color-accent`

---

## Loading

Use `BrandLoader` for page-level or section-level waiting states.

- CSS-only pulse (no JS required)
- Respects `prefers-reduced-motion`
- Keep size modest (≈28px) so it does not compete with content

---

## Sizes checklist

Verify recognition at:

- 16×16
- 32×32
- 48×48
- 96×96
- 192×192
- 512×512

If the E collapses at 16×16 after a redesign, thicken bars before shrinking the shield stroke.

---

## Accessibility

- Decorative marks in nav/footer: `aria-hidden="true"` with adjacent text label
- Standalone marks: provide accessible name via `aria-label` or `<title>`
- Maintain contrast of purple-on-dark and purple-on-light variants
