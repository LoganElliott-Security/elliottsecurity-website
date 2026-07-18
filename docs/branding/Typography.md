# Typography

Typography tokens live in `src/styles/tokens.css` and `src/styles/typography.css`.

---

## Families

| Token | Stack | Use |
|-------|-------|-----|
| `--font-sans` | Inter, ui-sans-serif, system-ui | UI, body, wordmark |
| `--font-mono` | JetBrains Mono, ui-monospace | Code, detections, technical meta |

The monogram **E** is not Inter and must never be substituted with a font glyph.

---

## Scale

| Style | Token / class | Weight |
|-------|---------------|--------|
| Display XL | `--font-size-display-xl` / `.type-display-xl` | Bold |
| Display | `--font-size-display` / `.type-display` | Bold |
| H1–H4 | `--font-size-h1` … `--font-size-h4` | Semibold |
| Body Large | `--font-size-body-lg` / `.type-body-lg` | Regular |
| Body | `--font-size-body` / `.type-body` | Regular |
| Small | `--font-size-small` / `.type-small` | Regular |
| Caption / eyebrow | `--font-size-caption` / `.type-eyebrow` | Medium |
| Mono | `--font-size-mono` / `.type-mono` | Regular |

---

## Wordmark

When using `logo.svg` lockup:

- Weight: 600
- Color: `--color-text` on dark, `--color-bg` / near-black on light
- Tracking: slightly tight (`-0.02em` to `-0.025em`)
- Do not bold, outline, or gradient-fill the wordmark text

---

## Hierarchy rules

1. Brand mark / wordmark is the strongest identity signal in the first viewport.
2. One primary headline per section.
3. Eyebrows use accent purple and uppercase caption tracking — sparingly.
