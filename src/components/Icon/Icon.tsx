import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import styles from "./Icon.module.css";

// Icon names correspond to SVG files in src/icons/svg/
// e.g., "arrow-right" -> src/icons/svg/arrow-right.svg
export type IconName = "arrow-right";
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
  /** Icon name - corresponds to SVG file in src/icons/svg/ */
  name: IconName;
}

/**
 * Icon component for displaying SVG icons from the sprite.
 * Icons are loaded from the SVG sprite generated at build time.
 */
export const Icon = ({
  name,
  size,
  weight,
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      className={clsx(iconVariants({ size, weight }), className)}
      aria-hidden="true"
      {...props}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
