import React from "react";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Icon } from "../Icon";
import styles from "./Button.module.css";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.buttonPrimary,
      secondary: styles.buttonSecondary,
      tertiary: styles.buttonTertiary,
    },
    mode: {
      base: styles.buttonBase,
      destructive: styles.buttonDestructive,
    },
    state: {
      default: "",
      loading: styles.buttonLoading,
      disabled: styles.buttonDisabled,
    },
  },
  compoundVariants: [
    // Primary Base
    {
      variant: "primary",
      mode: "base",
      className: styles.buttonPrimaryBase,
    },
    // Primary Destructive
    {
      variant: "primary",
      mode: "destructive",
      className: styles.buttonPrimaryDestructive,
    },
    // Secondary Base
    {
      variant: "secondary",
      mode: "base",
      className: styles.buttonSecondaryBase,
    },
    // Secondary Destructive
    {
      variant: "secondary",
      mode: "destructive",
      className: styles.buttonSecondaryDestructive,
    },
    // Tertiary Base
    {
      variant: "tertiary",
      mode: "base",
      className: styles.buttonTertiaryBase,
    },
    // Tertiary Destructive
    {
      variant: "tertiary",
      mode: "destructive",
      className: styles.buttonTertiaryDestructive,
    },
  ],
  defaultVariants: {
    variant: "primary",
    mode: "base",
    state: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button label text */
  label?: string;
  /** Show arrow icon */
  showArrow?: boolean;
  /** Children override label */
  children?: React.ReactNode;
  /** Render prop to customize the underlying element */
  render?:
    | React.ReactElement
    | ((
        props: React.ButtonHTMLAttributes<HTMLButtonElement>
      ) => React.ReactElement);
}


/**
 * Button component following the adidas Locker Room design system.
 * Supports multiple variants, modes, and states.
 * Uses Base UI's useRender for flexible element rendering.
 */
export const Button = ({
  label = "Call to action",
  mode = "base",
  variant = "primary",
  state = "default",
  showArrow = true,
  children,
  className,
  disabled,
  render,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || state === "disabled";
  const displayState = isDisabled ? "disabled" : state;

  const defaultProps = {
    type: "button" as const,
    className: clsx(
      buttonVariants({ variant, mode, state: displayState }),
      className
    ),
    disabled: isDisabled,
    "aria-busy": state === "loading",
    children: (
      <span className={styles.content}>
        <span className={styles.label}>{children || label}</span>
        {showArrow && <Icon name="arrow-right" className={styles.arrow} />}
      </span>
    ),
    ...props,
  } as Record<string, unknown>;

  const element = useRender({
    defaultTagName: "button",
    render,
    props: defaultProps,
  });

  return element;
};
