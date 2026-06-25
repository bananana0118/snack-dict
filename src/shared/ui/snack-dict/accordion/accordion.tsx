"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/base/accordion";
import { SnackDictIcon } from "@/shared/ui/snack-dict/icon";

import styles from "./accordion.module.css";

function SnackDictAccordion({
  className,
  ...props
}: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion
      data-slot="snack-dict-accordion"
      className={cn(styles.accordion, className)}
      {...props}
    />
  );
}

function SnackDictAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      data-slot="snack-dict-accordion-item"
      className={cn(styles.item, className)}
      {...props}
    />
  );
}

function SnackDictAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      data-slot="snack-dict-accordion-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    >
      <span className={styles.triggerText}>{children}</span>
      <span
        data-slot="snack-dict-accordion-trigger-icon-box"
        className={styles.triggerIconBox}
      >
        <SnackDictIcon
          data-slot="snack-dict-accordion-trigger-icon"
          name="arrowDown"
          className={styles.triggerIcon}
        />
      </span>
    </AccordionTrigger>
  );
}

function SnackDictAccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionContent>) {
  return (
    <AccordionContent
      data-slot="snack-dict-accordion-content"
      className={cn(styles.content, className)}
      {...props}
    >
      <div className={styles.contentInner}>{children}</div>
    </AccordionContent>
  );
}

export {
  SnackDictAccordion,
  SnackDictAccordionContent,
  SnackDictAccordionItem,
  SnackDictAccordionTrigger,
};
