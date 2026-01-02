---
description: "Use bun as the package manager for all operations in this project"
alwaysApply: true
---

# Bun Package Manager Rules

## Package Manager
Always use `bun` instead of `npm`, `yarn`, or `pnpm` for:
- Installing dependencies: `bun install`
- Running scripts: `bun run <script>`
- Adding packages: `bun add <package>`
- Adding dev dependencies: `bun add -d <package>`
- Removing packages: `bun remove <package>`

## Node.js Version
- Use Node.js version 20.19+ or 22.12+ (required by Vite 7.2.4)
- Current project uses Node.js 22.21.1 via nvm

## Development Commands
- Use `bun run dev` to start the development server
- Use `bun run build` to build the project
- Use `bun run preview` to preview the production build

