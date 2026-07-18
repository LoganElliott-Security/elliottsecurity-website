# Spacing

Spacing tokens are defined in `src/styles/tokens.css` as `--space-*`.

---

## Scale

| Token | Value |
|-------|-------|
| `--space-1` | 0.25rem |
| `--space-2` | 0.5rem |
| `--space-3` | 0.75rem |
| `--space-4` | 1rem |
| `--space-5` | 1.25rem |
| `--space-6` | 1.5rem |
| `--space-8` | 2rem |
| `--space-10` | 2.5rem |
| `--space-12` | 3rem |
| `--space-16` | 4rem |
| `--space-20` | 5rem |
| `--space-24` | 6rem |
| `--space-section` | 5rem |
| `--space-section-sm` | 3.5rem |

---

## Brand mark spacing

| Context | Guidance |
|---------|----------|
| Nav mark ↔ wordmark | `--space-2` to `0.625rem` gap |
| Logo clear space | ≥ height of the E middle bar |
| Section padding | `.section-padding` (token-driven) |
| Card internal | `--space-6` default |

---

## Layout principles

- Prefer large, intentional whitespace over dense dashboard packing.
- One composition per hero viewport.
- Align mark and type to a consistent baseline grid using the spacing scale.
- Do not invent one-off pixel values for brand placement.
