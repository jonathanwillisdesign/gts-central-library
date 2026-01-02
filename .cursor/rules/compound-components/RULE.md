---
description: When building flexible, composable React components
alwaysApply: false
globs: ["src/components/**/*.tsx"]
---

# Compound Components Pattern

Use compound components to create flexible, composable APIs that give consumers control over rendering while maintaining internal component logic.

## When to Use Compound Components

Use this pattern when:
- A component has multiple related parts (e.g., Card → Header, Body, Footer)
- Consumers need control over layout and ordering of parts
- Parts share implicit state or context
- The component would otherwise have many props for optional sections

**Don't** use compound components for:
- Simple components with no sub-parts (e.g., Button, Badge)
- Components where the structure is always fixed

## Structure

### File Organization

```
src/components/
  ComponentName/
    ComponentName.tsx       # Main component + subcomponents
    ComponentName.module.css
    ComponentNameContext.tsx # Optional: shared context if needed
    index.ts
```

### Pattern Implementation

1. **Create subcomponents** as named exports attached to the main component
2. **Use React Context** for shared state between parts (when needed)
3. **Apply CSS Modules** with scoped classes for each part
4. **Support useRender** for flexible element rendering on subcomponents

## Example: Card Component

```typescript
import React, { createContext, useContext } from "react";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Card.module.css";

// Context for shared state (optional)
interface CardContextValue {
  variant: "elevated" | "outlined";
}

const CardContext = createContext<CardContextValue | null>(null);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card.* components must be used within a Card");
  }
  return context;
};

// Main Card component
const cardVariants = cva(styles.card, {
  variants: {
    variant: {
      elevated: styles.cardElevated,
      outlined: styles.cardOutlined,
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  render?: React.ReactElement | ((props: React.HTMLAttributes<HTMLDivElement>) => React.ReactElement);
}

const CardRoot = ({ variant = "elevated", className, children, render, ...props }: CardProps) => {
  const defaultProps = {
    className: clsx(cardVariants({ variant }), className),
    children,
    ...props,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: defaultProps,
  });

  return (
    <CardContext.Provider value={{ variant }}>
      {element}
    </CardContext.Provider>
  );
};

// Subcomponents
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  render?: React.ReactElement | ((props: React.HTMLAttributes<HTMLDivElement>) => React.ReactElement);
}

const CardHeader = ({ className, children, render, ...props }: CardHeaderProps) => {
  const defaultProps = {
    className: clsx(styles.cardHeader, className),
    children,
    ...props,
  };

  return useRender({
    defaultTagName: "div",
    render,
    props: defaultProps,
  });
};

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  render?: React.ReactElement | ((props: React.HTMLAttributes<HTMLDivElement>) => React.ReactElement);
}

const CardBody = ({ className, children, render, ...props }: CardBodyProps) => {
  const defaultProps = {
    className: clsx(styles.cardBody, className),
    children,
    ...props,
  };

  return useRender({
    defaultTagName: "div",
    render,
    props: defaultProps,
  });
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  render?: React.ReactElement | ((props: React.HTMLAttributes<HTMLDivElement>) => React.ReactElement);
}

const CardFooter = ({ className, children, render, ...props }: CardFooterProps) => {
  const defaultProps = {
    className: clsx(styles.cardFooter, className),
    children,
    ...props,
  };

  return useRender({
    defaultTagName: "div",
    render,
    props: defaultProps,
  });
};

// Attach subcomponents to main component
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
```

## Consumer Usage

```tsx
// Flexible ordering and optional parts
<Card variant="elevated">
  <Card.Header>
    <h2>Title</h2>
  </Card.Header>
  <Card.Body>
    <p>Content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Custom element rendering with render prop
<Card render={<article />}>
  <Card.Header render={<header />}>
    <h2>Semantic HTML</h2>
  </Card.Header>
  <Card.Body render={<main />}>
    <p>Using semantic elements</p>
  </Card.Body>
</Card>

// Reorder or omit parts as needed
<Card>
  <Card.Body>Body only, no header</Card.Body>
</Card>
```

## Index Export Pattern

```typescript
// index.ts
export { Card } from "./Card";
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from "./Card";
```

## Guidelines

### Naming
- Use `ComponentName.PartName` syntax (e.g., `Card.Header`)
- Keep part names semantic and descriptive
- Use `Root` suffix for internal main component (e.g., `CardRoot`)

### Context Usage
- Only add context when parts need to share state
- Provide helpful error messages when context is missing
- Keep context values minimal

### Styling
- Each subcomponent gets its own CSS class in the module
- Use design tokens (`--gl-*`) for all values
- Support className override on all parts

### Type Safety
- Export individual prop types for each subcomponent
- Extend appropriate HTML element attributes
- Use `VariantProps` from CVA where applicable

### Documentation
- Document the compound pattern in Storybook
- Show common composition patterns
- Demonstrate custom rendering with `render` prop

