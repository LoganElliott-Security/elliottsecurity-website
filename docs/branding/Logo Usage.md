# Logo Usage

## Primary mark

Use the geometric monogram (`logo-mark.svg` / `LogoMark.astro`) as the default brand signal.

Use the lockup (`logo.svg`) when horizontal space allows and the full product name should appear beside the mark (marketing surfaces, presentations, documents).

---

## Clear space

Maintain clear space equal to **the height of the monogram's middle E bar** on all sides.

No other logos, text, or UI controls may enter this zone.

```
        [ clear ]
  [ clear ] MARK [ clear ]
        [ clear ]
```

Minimum clear space at 32px mark size: **6px** on each side.

---

## Minimum sizes

| Context | Minimum |
|---------|---------|
| Favicon / tab | 16×16 px |
| Navigation mark | 24×24 px (preferred 32×32 container) |
| Footer mark | 24×24 px |
| Touch / PWA | 180×180 px |
| Print / dense UI | 24×24 px |

Do not scale the monogram below 16×16.

---

## Approved color variations

1. **Gradient (default)** — Primary → Hover → Accent purple on transparent or dark surfaces  
2. **Solid primary** — `#7C3AED` monochrome mark when gradients are unsupported  
3. **Solid light** — `#F8FAFC` mark on saturated purple or photo backgrounds  
4. **Solid dark** — `#09090B` mark on light / white backgrounds  

---

## Background usage

### Dark (preferred)

- Background: `#09090B` or `#111118`
- Use gradient or solid primary purple mark

### Light

- Background: `#FFFFFF` or `#F8FAFC`
- Use solid primary `#7C3AED` or dark `#09090B` mark
- Ensure WCAG AA contrast for adjacent text

### App icon / maskable

- Always place the mark on `#09090B` rounded square
- Keep safe zone padding (~12.5% inset for maskable icons)

---

## Incorrect usage

Do not:

- Stretch, skew, or rotate the mark
- Recolor with non-brand hues (cyan, neon green, red)
- Add drop shadows, outer glows, bevels, or outlines beyond the defined shield stroke
- Place the mark on busy photography without a solid scrim
- Replace the custom E with a system font “E”
- Separate the E from the hexagonal enclosure (they are one mark)
- Use the old shield-and-check icon

---

## Regeneration

```bash
node scripts/generate-brand-icons.mjs
```

Updates favicon, apple-touch, and Android Chrome assets from `public/brand/logo.svg`.
