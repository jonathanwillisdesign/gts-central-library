import React from "react";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Icon.module.css";

// Import icons as React components
import ArrowRightIcon from "../../icons/arrow-right.svg?react";

const iconMap = {
  "arrow-right": ArrowRightIcon,
  // Add more icons here as you import them
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
  /** Render prop to customize the underlying element */
  render?:
    | React.ReactElement
    | ((props: React.SVGProps<SVGSVGElement>) => React.ReactElement);
}

/**
 * Icon component for displaying SVG icons.
 * Uses SVGR to convert SVG files into React components.
 */
export const Icon = ({
  name,
  size,
  className,
  render,
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];

  const defaultProps = {
    className: clsx(iconVariants({ size }), className),
    "aria-hidden": true,
    ...props,
  } as React.SVGProps<SVGSVGElement> & Record<string, unknown>;

  const element = useRender({
    defaultTagName: "svg",
    render,
    props: defaultProps,
  });

  // If render prop is provided, use useRender result
  if (render) {
    return element;
  }

  // Otherwise, render the icon component directly
  return <IconComponent {...defaultProps} />;
};

