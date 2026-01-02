import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Icon.module.css";

// Import pre-built icon components
import { ArrowRightIcon, type IconWeight } from "../../icons";

const iconMap = {
  "arrow-right": ArrowRightIcon,
  // Add more icons here as you create them
} as const;

export type IconName = keyof typeof iconMap;

const iconVariants = cva(styles.icon, {
  variants: {
    size: {
      small: styles.iconSmall,
      medium: styles.iconMedium,
      large: styles.iconLarge,
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "name">,
    VariantProps<typeof iconVariants> {
  /** Icon name */
  name: IconName;
  /** Icon weight */
  weight?: IconWeight;
}

/**
 * Icon component for displaying SVG icons.
 * Icons are pre-built React components with weight variants.
 */
export const Icon = ({
  name,
  size,
  weight = "regular",
  className,
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <IconComponent
      weight={weight}
      className={clsx(iconVariants({ size }), className)}
      aria-hidden="true"
      {...props}
    />
  );
};
