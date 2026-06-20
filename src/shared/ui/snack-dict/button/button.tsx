import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/base/button"

import styles from "./button.module.css"

const snackDictButtonVariants = cva(
  styles.button,
  {
    variants: {
      variant: {
        primary: styles.primary,
        secondary: styles.secondary,
      },
      size: {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
        icon: styles.icon,
      },
      fullWidth: {
        true: styles.fullWidth,
        false: null,
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

type SnackDictButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
> &
  VariantProps<typeof snackDictButtonVariants>

type SnackDictMoreButtonProps = Omit<
  SnackDictButtonProps,
  "children" | "variant" | "size" | "fullWidth"
>

type SnackDictActionGroupProps = React.ComponentProps<"div"> & {
  mode: "single" | "dual"
  children: React.ReactNode
}

function SnackDictButton({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: SnackDictButtonProps) {
  return (
    <Button
      data-slot="snack-dict-button"
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth ? "true" : undefined}
      variant="unstyled"
      size="unstyled"
      className={cn(snackDictButtonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

function SnackDictActionGroup({
  className,
  mode,
  children,
  ...props
}: SnackDictActionGroupProps) {
  return (
    <div
      data-slot="snack-dict-action-group"
      data-mode={mode}
      className={cn(styles.actionGroup, styles[mode], className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SnackDictMoreButton({ className, ...props }: SnackDictMoreButtonProps) {
  return (
    <SnackDictButton
      data-slot="snack-dict-more-button"
      variant="secondary"
      size="lg"
      className={cn(styles.moreButton, className)}
      {...props}
    >
      더보기
      <ChevronDown aria-hidden="true" />
    </SnackDictButton>
  )
}

export { SnackDictActionGroup, SnackDictButton, snackDictButtonVariants, SnackDictMoreButton }
