# Figma references

Drop exported Figma frames here, then point the agent at them when designing UI.

## Layout (mirror the module convention)

```
figma/
  <module>/
    <frame-name>.png      # exported frame image (required) — File > Export, 2x PNG
    <frame-name>.svg      # optional vector export (crisp icons / shapes)
    <frame-name>.css      # optional: Figma right-click > "Copy as CSS"
    tokens.json           # optional: colors / spacing / typography tokens
```

Example: `figma/auth/login.png`, `figma/billing/invoice-list.png`.

## How to use

1. Export the frame from Figma (PNG 2x is enough; add SVG for vector assets).
2. Copy it into `figma/<module>/`.
3. Tell the agent which frame to build, e.g.:

   > Build the login screen from `figma/auth/login.png`.

4. The agent reads the image, extracts a design spec (layout, colors, spacing,
   typography, components), confirms the UI stack, then implements.

## Accuracy notes

- A PNG gives **pixel-approximate**, not pixel-perfect — colors/spacing are read
  by eye. For higher fidelity, also drop:
  - exact hex colors + font names (or `tokens.json`),
  - SVG for icons/logos,
  - `Copy as CSS` snippets for tricky elements.
- Static images can't show hover/animation/responsive behavior — call those out
  in the request so the agent doesn't guess.

> Binary exports (`*.png`, `*.svg`) are design inputs, not source — keep them out
> of build artifacts. Add to `.gitignore` if you don't want them versioned.
