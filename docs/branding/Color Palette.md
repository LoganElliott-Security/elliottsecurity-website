# Color Palette

All brand colors are defined as design tokens in `src/styles/tokens.css`.

Components must consume tokens — never hardcode ad-hoc brand colors.

---

## Brand purple

| Token | Hex | Role |
|-------|-----|------|
| `--color-primary` | `#7C3AED` | Primary brand purple |
| `--color-primary-hover` | `#8B5CF6` | Hover / secondary purple |
| `--color-accent` | `#A855F7` | Highlight purple |
| `--color-soft` | `#C084FC` | Soft emphasis |
| `--color-highlight` | `#DDD6FE` | Light highlight |

Gradient (logo / CTAs):

```
#7C3AED → #8B5CF6 → #A855F7
```

Use subtle gradients only. No neon.

---

## Surfaces (dark default)

| Token | Hex |
|-------|-----|
| `--color-bg` | `#09090B` |
| `--color-bg-secondary` | `#111118` |
| `--color-surface` | `#181824` |
| `--color-surface-elevated` | `#202030` |
| `--color-border` | `#2A2A38` |

---

## Text

| Token | Hex |
|-------|-----|
| `--color-text` | `#F8FAFC` |
| `--color-text-secondary` | `#CBD5E1` |
| `--color-text-muted` | `#94A3B8` |
| `--color-disabled` | `#64748B` |

---

## Status

| Token | Hex |
|-------|-----|
| `--color-success` | `#22C55E` |
| `--color-warning` | `#F59E0B` |
| `--color-danger` | `#EF4444` |

Status colors are semantic — do not use them as brand accents.

---

## Contrast

- Purple CTAs on dark backgrounds meet WCAG AA for large text / UI components when paired with `--color-primary-foreground` (`#F8FAFC`).
- On light themes, use solid primary purple on white; verify body text contrast separately.
- Favicons use `#09090B` fallback so the mark remains visible in light browser chrome.

---

## Theme readiness

Tokens support:

- `dark` (default)
- `light`
- `high-contrast`

Switching themes must only change token values — not component markup.
