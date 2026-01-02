# Component Development Guidelines

## Styling Approach

### CSS Modules
- All components MUST use CSS Modules (`.module.css`) for styling
- Import styles as: `import styles from "./Component.module.css"`
- Use camelCase class names in CSS modules
- Reference classes using `styles.className` syntax

### Class Variance Authority (CVA)
- Use `cva` (class-variance-authority) for managing component variants
- Define variants using the `cva` function with proper variant configurations
- Use `clsx` for conditional class merging
- Combine CVA with CSS modules for type-safe styling

### Design Tokens
- Always use design tokens (`--gl-*`) instead of hardcoded values
- Reference tokens in CSS modules: `var(--gl-color-text, #000000)`
- Never hardcode colors, spacing, typography, or motion values

## Component Structure

### Base UI useRender
- Use `@base-ui/react/use-render` for flexible element rendering
- Components should accept a `render` prop to allow custom element rendering
- This enables slot/asChild-like functionality for maximum flexibility

Example:
```typescript
import { useRender } from "@base-ui/react/use-render";

export const Button = ({ render, ...props }: ButtonProps) => {
  const element = useRender({
    defaultTagName: "button",
    render,
    props: defaultProps,
  });
  return element;
};
```

### Component Props
- Extend appropriate HTML element attributes
- Use TypeScript for type safety
- Document props with JSDoc comments
- Support both controlled and uncontrolled patterns where applicable

## Storybook Stories

### Story Guidelines
- DO NOT create stories for interactive states (hover, pressed, focused-hover)
- Interactive states should be handled by CSS and demonstrated through user interaction
- Only create stories for:
  - Default states
  - Disabled states
  - Loading states
  - Static visual variants
- Use the "All Variants" story pattern to showcase all combinations in one view

### Story Organization
- Group stories by variant, then by mode
- Use descriptive names: `PrimaryBase`, `SecondaryDestructive`, etc.
- Include a comprehensive "All Variants" story for visual reference

## File Structure

```
src/
  components/
    ComponentName/
      ComponentName.tsx
      ComponentName.module.css
      index.ts
```

## Example Component Template

```typescript
import React from "react";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Component.module.css";

const componentVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  render?: React.ReactElement | ((props: any) => React.ReactElement);
}

export const Component = ({
  variant,
  className,
  render,
  ...props
}: ComponentProps) => {
  const defaultProps = {
    className: clsx(componentVariants({ variant }), className),
    ...props,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: defaultProps,
  });

  return element;
};
```

