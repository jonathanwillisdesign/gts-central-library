# Adidas Design System CSS Structure

This directory contains the organized CSS structure for the Adidas Design System, built with PostCSS.

## Directory Structure

```
src/styles/
├── base/
│   └── reset.css          # Base reset styles
├── tokens/
│   ├── fonts.css          # Font face declarations
│   ├── colors.css         # Color design tokens
│   ├── motion.css         # Motion/animation tokens
│   ├── shadows.css        # Shadow tokens
│   ├── spacing.css        # Spacing tokens
│   └── typography.css     # Typography tokens
├── utilities/             # Utility classes (future)
└── index.css             # Main entry point
```

## Usage

The main stylesheet is imported in `src/main.tsx`:

```tsx
import './styles/index.css'
```

All design tokens are available as CSS custom properties (variables) prefixed with `--gl-`.

## Design Tokens

### Colors
All color tokens are defined in `tokens/colors.css` and follow the Adidas design system naming convention:
- `--gl-color-*` - Base colors
- `--gl-color-brand-*` - Brand colors
- `--gl-color-background-*` - Background colors
- `--gl-color-text-*` - Text colors
- `--gl-color-border-*` - Border colors

### Typography
Typography tokens are organized by type:
- Body fonts: `--gl-body-font-set-*`
- Heading fonts: `--gl-heading-font-set-*`
- Statement fonts: `--gl-statement-font-set-*`
- Button fonts: `--gl-button-font-set-*`
- Link fonts: `--gl-link-font-set-*`

### Spacing
Spacing tokens use a consistent scale:
- `--gl-spacing-0000` through `--gl-spacing-1500`

### Motion
Animation and transition tokens:
- `--gl-motion-duration-*` - Duration values
- `--gl-motion-easing-*` - Easing functions

## PostCSS

This project uses PostCSS with Autoprefixer for vendor prefixing. Configuration is in `postcss.config.js` at the project root.

## Adding New Styles

1. **Design Tokens**: Add to the appropriate file in `tokens/`
2. **Base Styles**: Add to `base/`
3. **Utilities**: Add to `utilities/`
4. **Components**: Create component-specific styles as needed

## Fonts

Adidas fonts are loaded from the CDN:
- AdihausDIN (Regular, Bold)
- AdihausDIN Cn (Medium Italic)
- AdineuePRO (Regular, Bold)
- adidasFG (Compressed Bold)

Fonts are defined in `tokens/fonts.css` and will be loaded automatically when the stylesheet is imported.

