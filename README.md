# GTS Central Library

A design system and component library for the **Locker Room** product at adidas. This library provides a centralized collection of design tokens, React components, and utilities to ensure visual consistency and accelerate development.

## Purpose

GTS Central Library serves as the single source of truth for:

- **Design Tokens** — Colors, typography, spacing, motion, and shadows as CSS custom properties
- **React Components** — Production-ready, accessible components built with TypeScript
- **Icons** — A curated icon set optimized for the Locker Room ecosystem

This package is designed to be consumed by AI-powered design and development tools such as [Figma Make](https://www.figma.com) and [Lovable](https://lovable.dev), enabling rapid prototyping and consistent implementation across platforms.

## Installation

```bash
npm install gts-central-library
```

```bash
bun add gts-central-library
```

## Quick Start

Import the global styles to access all design tokens:

```tsx
import 'gts-central-library/styles';
```

Use components in your application:

```tsx
import { Button, Icon } from 'gts-central-library';

function App() {
  return (
    <Button variant="primary" size="medium">
      Get Started
      <Icon name="arrow-right" />
    </Button>
  );
}
```

## Design Tokens

All tokens use the `--gl-` prefix and are organized by category:

| Category   | Prefix                     | Example                        |
| ---------- | -------------------------- | ------------------------------ |
| Colors     | `--gl-color-*`             | `--gl-color-brand-primary`     |
| Typography | `--gl-body-font-set-*`     | `--gl-body-font-set-medium`    |
| Spacing    | `--gl-spacing-*`           | `--gl-spacing-16`              |
| Motion     | `--gl-motion-*`            | `--gl-motion-duration-normal`  |
| Shadows    | `--gl-web-shadow-*`        | `--gl-web-shadow-elevation-1`  |

## Documentation

Run Storybook locally to explore components and tokens:

```bash
bun install
bun run storybook
```

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- CSS Modules + CSS Custom Properties
- Class Variance Authority for component variants
- Storybook for documentation

## License

Proprietary — adidas internal use only.
