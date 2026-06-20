---
description: "storybook: Story 작성 및 컴포넌트 문서화 규칙"
globs: **/*.stories.@(ts|tsx|js|jsx
alwaysApply: false
---

# storybook (Story 작성 규칙)

## 적용 범위

- Storybook Story 파일(`.stories.tsx`) 작성 시 적용된다.
- 컴포넌트 문서화를 목표로 한다.

---

## 1. 기본 개념

Storybook은 **Args를 기반으로 Controls를 자동 생성**하고, 상호작용이 필요한 경우 **play function**으로 시나리오를 재현하는 흐름을 제공한다.

**핵심 원칙:**

- Story 파일은 **CSF (Component Story Format)** 3.0 포맷을 사용한다.
- 상태는 **args**로 표현하고 Controls로 조절 가능하게 유지한다.
- 사용자 행동이 중요한 컴포넌트는 **play function**으로 재현한다.

---

## 2. Story 파일 및 폴더 구조 (FSD & Co-location)

### 폴더 및 파일 배치

- 컴포넌트 파일(`*.tsx`), 스타일 파일(`*.module.css`), 스토리 파일(`*.stories.tsx`)은 동일한 폴더 내에 함께 배치(Co-location)한다.
- 공통 컴포넌트는 `src/shared/ui/` 내에 배치한다.

### 스토리북 Title 계층화 (FSD 기준)

- `title` 속성을 활용하여 shadcn 기반 컴포넌트와 CSS Modules 기반 커스텀 컴포넌트를 명확히 분리한다.
  - shadcn (Radix UI) 기반 컴포넌트: `Shared/UI/Base/[컴포넌트명]`
  - Snack Dict 디자인 시스템 컴포넌트: `Shared/UI/SnackDict/[컴포넌트명]`
  - 특정 Feature에 속한 컴포넌트: `Features/[Feature명]/[컴포넌트명]`

### 기본 구조 (shadcn 기반 예시)

```tsx
// src/shared/ui/base/button/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Shared/UI/Base/Button", // FSD 경로와 역할에 맞는 Title 지정
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### 기본 구조 (Snack Dict 디자인 시스템 예시)

```tsx
// src/shared/ui/snack-dict/card/card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SnackCard } from "./card";

const meta = {
  title: "Shared/UI/SnackDict/Card",
  component: SnackCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SnackCard>;

export default meta;
type Story = StoryObj<typeof meta>;
```

---

## 3. 필수 Story 종류

모든 컴포넌트는 최소한 다음 Story를 포함해야 한다:

### **Default Story (필수)**

기본 상태를 보여주는 Story

```tsx
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "버튼",
  },
};
```

### **Variants Story (필수)**

컴포넌트의 모든 변형을 보여주는 Story

```tsx
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "버튼",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "버튼",
  },
};
```

### **States Story (필수)**

상태별 표현 (hover, focus, disabled 등)

```tsx
export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "버튼",
  },
};
```

### **Responsive Story (선택)**

반응형 동작이 중요한 경우에만 추가

```tsx
export const Responsive: Story = {
  args: {
    children: "버튼",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
```

---

## 4. Controls & Args 활용

### Args로 상태 표현

컴포넌트의 모든 상태는 args로 표현하여 Controls 패널에서 조작 가능하게 만든다.

```tsx
const meta = {
  title: "Shared/UI/Base/Input",
  component: Input,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;
```

**주의사항:**

- 함수(이벤트 핸들러)는 args로 전달하되, `action()`을 활용한다.
- 복잡한 객체는 Controls에서 편집하기 어려우므로 적절히 제한한다.

---

<!-- TODO: @storybook/test 패키지 설치 후 아래 주석을 해제하여 사용하세요.

## 5. Play Function으로 인터랙션 재현

사용자 행동이 중요한 컴포넌트는 play function을 사용하여 클릭/입력/토글 등의 시나리오를 재현한다.

### 기본 예시
```tsx
import { expect, userEvent, within } from '@storybook/test';

export const WithInteraction: Story = {
  args: {
    variant: 'primary',
    children: '클릭하세요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // 클릭 인터랙션
    await userEvent.click(button);

    // 검증
    await expect(button).toHaveFocus();
  },
};
```

### 복잡한 인터랙션 예시
```tsx
export const FormSubmit: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 입력
    const input = canvas.getByLabelText('이름');
    await userEvent.type(input, '홍길동');

    // 제출
    const submitButton = canvas.getByRole('button', { name: /제출/i });
    await userEvent.click(submitButton);

    // 검증
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: '홍길동',
    });
  },
};
```
-->

---

## 6. 문서화 태그 활용

### autodocs 태그

자동으로 문서를 생성하려면 `tags: ['autodocs']`를 추가한다.

```tsx
const meta = {
  title: "Shared/UI/Base/Button",
  component: Button,
  tags: ["autodocs"], // 자동 문서 생성
} satisfies Meta<typeof Button>;
```

### JSDoc 주석 활용

컴포넌트의 props에 JSDoc 주석을 추가하면 자동으로 문서에 반영된다.

```tsx
interface ButtonProps {
  /**
   * 버튼의 시각적 스타일을 결정합니다.
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "outline";

  /**
   * 버튼의 크기를 결정합니다.
   */
  size?: "sm" | "md" | "lg";
}
```

---

## 7. 주의사항 및 권장사항

### ✅ 권장사항

- **모든 컴포넌트는 최소 1개 이상의 Story를 작성**한다.
- **Controls를 통해 모든 주요 props를 조작 가능**하게 만든다.
- **play function은 핵심 인터랙션에만 사용**한다. (과도한 사용 지양)
- Story 이름은 명확하고 설명적으로 작성한다.

### ❌ 지양사항

- Story에서 API 호출이나 비즈니스 로직을 테스트하지 않는다.
- 너무 많은 Story로 파일을 복잡하게 만들지 않는다.

---

## 8. 환경 설정 가이드 (Tailwind & shadcn 연동)

shadcn/ui 컴포넌트는 Tailwind CSS와 CSS 변수에 의존하므로, 전역 스타일(`.storybook/preview.ts`)이 반드시 설정되어야 한다.

```typescript
// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; // Tailwind 및 shadcn 전역 변수 필수 임포트

const preview: Preview = {
  // ... parameters 설정
};
export default preview;
```

---

## 참고 자료

- [Storybook 공식 문서](https://storybook.js.org/)
- [Component Story Format (CSF)](https://storybook.js.org/docs/api/csf)
- [Play function](https://storybook.js.org/docs/writing-stories/play-function)
