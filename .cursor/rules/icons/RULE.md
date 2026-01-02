---
description: "Guidelines for creating and managing icons in the GTS Central Library"
alwaysApply: false
globs:
  - "src/icons/**/*"
  - "src/components/Icon/**/*"
---

# Icon Management

## Overview

Icons in the GTS Central Library are pre-built React components stored in `src/icons/`. This approach ensures reliability across all environments (Storybook, Vite, etc.) without relying on build-time SVG transformations.

## File Structure

```
src/icons/
  ├── index.ts              # Barrel export for all icons
  ├── ArrowRightIcon.tsx    # Icon component with weight variants
  ├── CheckIcon.tsx         # Another icon example
  └── ...
```

## Icon Component Pattern

Each icon follows this pattern:

```tsx
import React from "react";

export type IconWeight = "regular" | "bold";

interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  weight?: IconWeight;
}

export const ArrowRightIcon = ({
  weight = "regular",
  ...props
}: IconComponentProps) => {
  if (weight === "bold") {
    return (
      <svg
        viewBox="0 0 25 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Bold weight path */}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Regular weight path */}
    </svg>
  );
};
```

## Key Requirements

1. **Use `currentColor`** - All icons must use `fill="currentColor"` to inherit text color
2. **Support weights** - Icons should support `regular` and `bold` weight variants
3. **Spread props** - Always spread `...props` on the SVG element for className, style, etc.
4. **No hardcoded dimensions** - Use viewBox only; let CSS control size via the Icon component
5. **Export from index** - Add every new icon to `src/icons/index.ts`

## Adding a New Icon

1. **Get the SVG from Figma** - Export both regular and bold weight variants
2. **Create the component file** in `src/icons/`:

```tsx
// src/icons/CheckIcon.tsx
import React from "react";

export type IconWeight = "regular" | "bold";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  weight?: IconWeight;
}

export const CheckIcon = ({ weight = "regular", ...props }: CheckIconProps) => {
  if (weight === "bold") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="..." fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="..." fill="currentColor" />
    </svg>
  );
};
```

3. **Export from index.ts**:

```tsx
export { CheckIcon } from "./CheckIcon";
```

4. **Add to iconMap** in `src/components/Icon/Icon.tsx`:

```tsx
import { CheckIcon } from "../../icons";

const iconMap = {
  "arrow-right": ArrowRightIcon,
  check: CheckIcon,
} as const;
```

5. **Update Icon stories** to include the new icon in argTypes options

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
<Icon name="arrow-right" className="text-blue-500" />
```

## Design Token Integration

Icons use these CSS classes from `Icon.module.css`:

- `.icon` - Base styles (display, flex-shrink, fill)
- `.iconSmall` - 16x16px
- `.iconMedium` - 24x24px
- `.iconLarge` - 32x32px

## Figma Reference

Icons are sourced from the GTS Central Library Figma file:

- Node: `4545-143062` (Icons set)
- Each icon has `weight=regular` and `weight=bold` variants
