import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
  SnackDictAccordion,
  SnackDictAccordionContent,
  SnackDictAccordionItem,
  SnackDictAccordionTrigger,
} from "@/shared/ui/snack-dict/accordion";

import styles from "./criteriaAccordion.module.css";

const CRITERIA_ACCORDION_VALUE = "criteria";

const CATEGORY_TAGS = [
  { label: "봉지", className: styles.bag },
  { label: "비스킷", className: styles.biscuit },
  { label: "파이", className: styles.pie },
  { label: "초콜릿", className: styles.chocolate },
  { label: "젤리", className: styles.jelly },
  { label: "캔디&껌", className: styles.candyGum },
] as const;

const TASTE_TAGS = [
  { label: "달콤", className: styles.sweet },
  { label: "상큼", className: styles.sour },
  { label: "짭짤", className: styles.salty },
  { label: "매콤", className: styles.spicy },
  { label: "쌉싸름", className: styles.bitter },
  { label: "느끼", className: styles.rich },
] as const;

type SnackDictCriteriaAccordionProps = {
  className?: string;
  defaultOpen?: boolean;
};

function SnackDictCriteriaAccordion({
  className,
  defaultOpen = true,
}: SnackDictCriteriaAccordionProps) {
  return (
    <SnackDictAccordion
      data-slot="snack-dict-criteria-accordion"
      type="single"
      defaultValue={defaultOpen ? CRITERIA_ACCORDION_VALUE : undefined}
      collapsible
      className={cn(styles.criteriaAccordion, className)}
    >
      <SnackDictAccordionItem value={CRITERIA_ACCORDION_VALUE}>
        <SnackDictAccordionTrigger>꽈자사전 등록 기준</SnackDictAccordionTrigger>
        <SnackDictAccordionContent>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>분류(카테고리) 기준</h3>
            <p className={styles.description}>
              모든 과자는 아래 기준에 따라 하나의 분류만 가져요.
            </p>
            <TagList items={CATEGORY_TAGS} type="category" />
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>맛 표기 종류</h3>
            <p className={styles.description}>
              {"누구나 먹었을 때 공통적으로 느끼는 맛을 표기해요.\n과자에서 주로 느껴지는 맛, 6가지를 기준으로 구분했어요. 강하게 느껴지는 맛 순서로 표기했어요. (메인맛→서브맛순)"}
            </p>
            <TagList items={TASTE_TAGS} type="taste" />
          </section>
        </SnackDictAccordionContent>
      </SnackDictAccordionItem>
    </SnackDictAccordion>
  );
}

type TagListProps = {
  items: readonly {
    className: string;
    label: string;
  }[];
  type: "category" | "taste";
};

function TagList({ items, type }: TagListProps) {
  return (
    <div className={styles.tagList} aria-label={type === "category" ? "과자 분류" : "맛 종류"}>
      {items.map((item) => (
        <span
          key={item.label}
          className={cn(styles.tag, styles[type], item.className)}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

export { SnackDictCriteriaAccordion };
export type { SnackDictCriteriaAccordionProps };
