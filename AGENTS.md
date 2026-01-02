# GTS Central Library - Design System Agent

## Overview

This is a design system and component library for the **Locker Room** product at adidas. The library provides a centralized collection of design tokens, components, and utilities to ensure consistency across the Locker Room application.

## Project Structure

### Design Tokens

The design system includes comprehensive CSS custom properties (tokens) organized by category:

- **Colors** (`src/styles/tokens/colors.css`): Brand colors, semantic colors, background colors, border colors, text colors, and component-specific colors
- **Typography** (`src/styles/tokens/typography.css`): Font families, sizes, weights, line heights, and letter spacing for body and heading text
- **Spacing** (`src/styles/tokens/spacing.css`): Consistent spacing scale from 0px to 150px
- **Shadows** (`src/styles/tokens/shadows.css`): Text shadow definitions for web and app contexts
- **Motion** (`src/styles/tokens/motion.css`): Animation durations and easing functions
- **Fonts** (`src/styles/tokens/fonts.css`): Font face declarations for AdihausDIN, AdineuePRO, and adidasFG

### Token Naming Convention

All tokens follow the `--gl-` prefix pattern:

- `--gl-color-*` for colors
- `--gl-body-font-set-*` and `--gl-heading-font-set-*` for typography
- `--gl-spacing-*` for spacing
- `--gl-motion-*` for motion/animation
- `--gl-web-shadow-*` and `--gl-app-shadow-*` for shadows

## Technology Stack

- **React 19.2.0** with TypeScript
- **Vite 6.x** for build tooling
- **CSS Modules** for component styling
- **Class Variance Authority (CVA)** for variant management
- **clsx** for conditional class merging
- **Base UI** (`@base-ui/react/use-render`) for flexible element rendering
- **CSS Custom Properties** for design tokens
- **PostCSS** with Autoprefixer
- **Bun** as package manager

## Development Guidelines

### Adding New Tokens

1. Add tokens to the appropriate token file in `src/styles/tokens/`
2. Follow the existing naming convention with `--gl-` prefix
3. Document token usage in Storybook
4. Ensure tokens are imported in `src/styles/index.css`

### Component Development

- **CSS Modules**: All components MUST use CSS Modules (`.module.css`) for styling
- **CVA**: Use `class-variance-authority` for managing component variants
- **Design Tokens**: Always use design tokens (`--gl-*`) instead of hardcoded values
- **Base UI useRender**: Use `@base-ui/react/use-render` for flexible element rendering (slot/asChild pattern)
- **TypeScript**: Follow React best practices with proper TypeScript typing
- **File Structure**: Components should follow the structure:
  ```
  src/components/ComponentName/
    ComponentName.tsx
    ComponentName.module.css
    index.ts
  ```

### Storybook Integration

- Storybook is configured with Figma addon for design-to-code synchronization
- **DO NOT create stories for interactive states** (hover, pressed, focused-hover)
- Interactive states are handled by CSS and demonstrated through user interaction
- Only create stories for: default states, disabled states, loading states, and static visual variants
- Token documentation is available in Storybook
- Components should have corresponding stories

See `.cursor/rules/component-development/RULE.md` for detailed component development guidelines.

## Key Features

- Comprehensive design token system
- Brand-aligned color palette
- Typography system with multiple font sets
- Consistent spacing scale
- Motion/animation tokens
- Figma integration for design handoff

## Documentation

- Token documentation is available in Storybook
- Component documentation includes usage examples
- Design tokens are documented with visual examples
