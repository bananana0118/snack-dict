import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Input } from "@/shared/ui/base/input"

import styles from "./input.module.css"

type SnackDictInputProps = React.ComponentProps<typeof Input>

const DEFAULT_SEARCH_PLACEHOLDER = "과자명 검색"

function SnackDictInput({
  className,
  placeholder = DEFAULT_SEARCH_PLACEHOLDER,
  type = "text",
  ...props
}: SnackDictInputProps) {
  return (
    <Input
      data-slot="snack-dict-input"
      type={type}
      placeholder={placeholder}
      className={cn(styles.input, className)}
      {...props}
    />
  )
}

export { DEFAULT_SEARCH_PLACEHOLDER, SnackDictInput }
export type { SnackDictInputProps }
