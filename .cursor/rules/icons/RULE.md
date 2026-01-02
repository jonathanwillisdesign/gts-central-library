---
description: "Guidelines for creating and managing icons in the GTS Central Library"
alwaysApply: false
globs:
  - "src/icons/**/*"
  - "src/components/Icon/**/*"
---

# Icon Management

## Overview

Icons in the GTS Central Library use an SVG sprite system. Individual SVG files are stored in `src/icons/svg/` and automatically combined into a sprite at build time using `vite-plugin-svg-icons`.

## File Structure

```
src/icons/
  ├── svg/                  # SVG icon files (one per icon)
  │   ├── arrow-right.svg
  │   ├── check.svg
  │   └── ...
  └── index.ts              # Type exports
```

## Adding a New Icon

### 1. Export SVG from Figma

- Export the icon as SVG from Figma
- Ensure the SVG uses `currentColor` for stroke/fill to inherit text color
- Use the `--gl-icon-stroke-width` CSS variable for stroke-based icons

### 2. Save the SVG file

Save the SVG to `src/icons/svg/` with a kebab-case filename:

```svg
<!-- src/icons/svg/check.svg -->
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5 12L10 17L19 8"
    stroke="currentColor"
    stroke-width="var(--gl-icon-stroke-width)"
    stroke-linecap="square"
    stroke-linejoin="miter"
  />
</svg>
```

### 3. Update the IconName type

Add the new icon name to the `IconName` type in `src/components/Icon/Icon.tsx`:

```tsx
export type IconName = "arrow-right" | "check";
```

### 4. Update stories (optional)

Add the new icon to the argTypes options in `src/stories/Icon.stories.tsx`:

```tsx
argTypes: {
  name: {
    control: "select",
    options: ["arrow-right", "check"],
    // ...
  },
},
```

## Key Requirements

1. **Use `currentColor`** - All icons must use `stroke="currentColor"` or `fill="currentColor"` to inherit text color
2. **Use stroke width token** - For stroke-based icons, use `stroke-width="var(--gl-icon-stroke-width)"` to support weight variants
3. **No hardcoded dimensions** - Use `viewBox` only; let CSS control size via the Icon component
4. **kebab-case filenames** - Icon filenames should be lowercase with hyphens (e.g., `arrow-right.svg`)

## Icon Component Usage

```tsx
import { Icon } from "@gts/central-library";

// Default (regular weight, medium size)
<Icon name="arrow-right" />

// Bold weight
<Icon name="arrow-right" weight="bold" />

// With size variant
<Icon name="arrow-right" size="large" weight="bold" />

// With custom className
<Icon name="arrow-right" className="custom-class" />
```

## How the Sprite System Works

1. **Build time**: `vite-plugin-svg-icons` scans `src/icons/svg/` and generates a sprite
2. **Runtime**: The sprite is injected into the DOM via `virtual:svg-icons-register`
3. **Usage**: The Icon component references symbols via `<use href="#icon-{name}">`

### Sprite Registration

The sprite is automatically registered in:
- `src/main.tsx` - For the main app
- `.storybook/preview.ts` - For Storybook

```tsx
import 'virtual:svg-icons-register'
```

## Design Token Integration

Icons use CSS classes from `Icon.module.css`:

- `.icon` - Base styles (display, flex-shrink, color inheritance)
- `.iconSmall` - 16x16px
- `.iconMedium` - 24x24px
- `.iconLarge` - 32x32px
- `.weightRegular` - Sets `--gl-icon-stroke-width: var(--gl-icon-stroke-regular)` (1)
- `.weightBold` - Sets `--gl-icon-stroke-width: var(--gl-icon-stroke-bold)` (1.5)

## Figma Reference

Icons are sourced from the GTS Central Library Figma file:

- Node: `4545-143062` (Icons set)
- Each icon has `weight=regular` and `weight=bold` variants
