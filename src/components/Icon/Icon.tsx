import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Icon.module.css";

// Import pre-built icon components
import { ArrowRightIcon } from "../../icons";

const iconMap = {
  "arrow-right": ArrowRightIcon,
  // Add more icons here as you create them
} as const;

export type IconName = keyof typeof iconMap;
export type IconWeight = "regular" | "bold";

const iconVariants = cva(styles.icon, {
  variants: {
    size: {
      small: styles.iconSmall,
      medium: styles.iconMedium,
      large: styles.iconLarge,
    },
    weight: {
      regular: styles.weightRegular,
      bold: styles.weightBold,
    },
  },
  defaultVariants: {
    size: "medium",
    weight: "regular",
  },
});

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "name">,
    VariantProps<typeof iconVariants> {
  /** Icon name */
  name: IconName;
}

/**
 * Icon component for displaying SVG icons.
 * Icons are pre-built React components with weight variants.
 */
export const Icon = ({
  name,
  size,
  weight,
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
      className={clsx(iconVariants({ size, weight }), className)}
      aria-hidden="true"
      {...props}
    />
  );
};
