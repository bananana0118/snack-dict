import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { SnackDictIcon } from "@/shared/ui/snack-dict/icon";

import type { SnackDictInputProps } from "../input";
import { DEFAULT_SEARCH_PLACEHOLDER, SnackDictInput } from "../input";
import styles from "./searchInput.module.css";

type SnackDictSearchInputProps = Omit<SnackDictInputProps, "type"> & {
  active?: boolean;
  clearButtonLabel?: string;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  searchButtonLabel?: string;
};

function SnackDictSearchInput({
  active = false,
  className,
  clearButtonLabel = "검색어 지우기",
  disabled,
  onClear,
  onKeyDown,
  onSearch,
  placeholder = DEFAULT_SEARCH_PLACEHOLDER,
  searchButtonLabel = "검색",
  value,
  ...props
}: SnackDictSearchInputProps) {
  const hasValue = value != null && String(value).length > 0;

  function handleSearch(value: string) {
    onSearch?.(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented || event.key !== "Enter" || !onSearch) {
      return;
    }

    handleSearch(event.currentTarget.value);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    const input = event.currentTarget.parentElement?.querySelector<HTMLInputElement>(
      "[data-slot='snack-dict-input']",
    );

    handleSearch(input?.value ?? "");
  }

  return (
    <div
      data-slot="snack-dict-search-input"
      data-active={active ? "true" : undefined}
      data-has-action={onSearch ? "true" : undefined}
      className={cn(styles.searchInput, className)}
    >
      {active ? (
        <SnackDictIcon
          data-slot="snack-dict-search-leading-icon"
          name="arrowLeft"
          className={styles.searchLeadingIcon}
        />
      ) : null}
      <SnackDictInput
        type="search"
        disabled={disabled}
        placeholder={placeholder}
        className={cn(styles.searchField, active && styles.searchFieldActive)}
        onKeyDown={handleKeyDown}
        value={value}
        {...props}
      />
      {active && hasValue && onClear ? (
        <button
          data-slot="snack-dict-search-clear-button"
          type="button"
          className={styles.searchClearButton}
          aria-label={clearButtonLabel}
          disabled={disabled}
          onClick={onClear}
        >
          <SnackDictIcon name="cancel" />
        </button>
      ) : null}
      {onSearch ? (
        <button
          data-slot="snack-dict-search-button"
          type="button"
          className={cn(styles.searchButton, active && styles.searchButtonActive)}
          aria-label={searchButtonLabel}
          disabled={disabled}
          onClick={handleButtonClick}
        >
          <SnackDictIcon name="search" />
        </button>
      ) : (
        <SnackDictIcon
          data-slot="snack-dict-search-icon"
          name="search"
          className={cn(styles.searchIcon, active && styles.searchIconActive)}
        />
      )}
    </div>
  );
}

export { SnackDictSearchInput };
export type { SnackDictSearchInputProps };
