---
description: "Project directory structure and conventions for the GTS Central Library"
alwaysApply: false
---

# Project Structure

This document outlines the directory structure and conventions for the GTS Central Library design system.

## Root Directory

```
gts-central-library/
├── .cursor/rules/         # Cursor IDE rules and conventions
├── .storybook/            # Storybook configuration
├── public/                # Static assets served at root
├── src/                   # Source code
├── package.json           # Dependencies and scripts (uses Bun)
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
└── eslint.config.js       # Linting rules
```

## Source Directory (`src/`)

```
src/
├── components/            # Reusable UI components
├── icons/                 # SVG icon components
├── stories/               # Storybook stories
│   └── Tokens/            # Design token documentation (MDX)
├── styles/                # Global styles and design tokens
│   ├── base/              # CSS reset and base styles
│   ├── tokens/            # Design token definitions
│   └── utilities/         # Utility classes
├── main.tsx               # Application entry point
└── index.css              # Global styles entry
```

## Key Conventions

### Components (`src/components/`)

Each component lives in its own folder with this structure:

```
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.module.css # CSS Module styles
└── index.ts                 # Public exports
```

### Icons (`src/icons/`)

SVG icon components that use `currentColor` for styling flexibility. Each icon is a separate file with a barrel export in `index.ts`.

### Design Tokens (`src/styles/tokens/`)

CSS custom properties using the `--gl-` prefix, organized by category:

- **colors.css** — Color palette and semantic colors
- **typography.css** — Font families, sizes, weights
- **spacing.css** — Spacing scale
- **motion.css** — Animation durations and easing
- **shadows.css** — Shadow definitions
- **fonts.css** — @font-face declarations

### Stories (`src/stories/`)

Storybook stories for components and design token documentation. Token docs use MDX format in the `Tokens/` subfolder.

### Storybook (`.storybook/`)

Configuration for Storybook including Figma integration. Contains `main.ts`, `preview.ts`, and custom assets.

## Technology Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Bun** as package manager
- **CSS Modules** + **CVA** for component styling
- **Storybook** for documentation
