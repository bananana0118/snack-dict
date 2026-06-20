# 스타일링 규칙 (Tailwind CSS v4 + shadcn/ui + CSS Modules)

> Tailwind CSS v4, shadcn/ui, CSS Modules 기반의 스타일링 규칙이다.

---

## 기본 원칙

- Tailwind CSS는 구조적 스타일을 빠르게 조립하는 용도로 사용
- shadcn/ui 컴포넌트를 접근성 있는 UI 빌딩 블록으로 활용
- CSS Modules는 Snack Dict 디자인 시스템 컴포넌트의 세밀한 표현 스타일에 사용
- 인라인 스타일(`style={{}}`) 사용 최소화
- 매직 넘버 지양 → Tailwind 디자인 토큰 및 CSS 커스텀 프로퍼티 활용

---

## 스타일 책임 분리

Tailwind CSS, shadcn/ui, CSS Modules는 함께 사용하되 같은 스타일 속성을 중복 제어하지 않는다.

### Tailwind CSS가 담당하는 영역

- 레이아웃: `flex`, `grid`, `items-*`, `justify-*`
- 간격: `gap-*`, `p-*`, `m-*`
- 반응형: `sm:*`, `md:*`, `lg:*`
- 단순 크기 조절: `h-*`, `w-*`, `px-*`, `py-*`
- 페이지와 섹션의 조립 스타일

### CSS Modules가 담당하는 영역

- Snack Dict 디자인 시스템 컴포넌트의 브랜드 색상, 배경, border, shadow
- hover, focus, pressed, selected 같은 세밀한 상태 스타일
- 내부 요소 selector: `.button svg`, `.item[data-active='true']`
- 복잡한 컴포넌트 variant
- `--snack-dict-*` CSS 변수 기반의 Snack Dict 디자인 시스템 스타일
- 컴포넌트 CSS Module의 기본 클래스는 `.root`가 아니라 파일명 또는 역할명으로 작성

### shadcn/ui가 담당하는 영역

- Radix UI 기반의 접근성, 키보드 인터랙션, primitive 동작
- `shared/ui/base`의 낮은 수준 UI building block
- Snack Dict 디자인 시스템 스타일이 필요한 경우 base 컴포넌트를 직접 덮어쓰기보다 `shared/ui/snack-dict/*`에서 감싸서 확장

```tsx
// ✓ 구조는 Tailwind로 조립
<section className="flex flex-col gap-4 p-4 md:grid md:grid-cols-2">
  <SnackDictButton variant="primary">저장</SnackDictButton>
</section>
```

```css
/* ✓ Snack Dict 버튼의 세밀한 표현은 CSS Modules로 관리 */
.primary {
  background: var(--snack-dict-color-gray-90);
  color: #ffffff;
}

.primary:hover {
  background: var(--snack-dict-color-gray-70);
}
```

```css
/* ✓ button.module.css의 기본 클래스는 파일명과 맞춘다 */
.button svg {
  flex-shrink: 0;
}
```

### 중복 제어 금지

같은 속성군을 Tailwind와 CSS Modules가 동시에 제어하지 않는다.

```tsx
// ✕ background를 Tailwind와 CSS Modules가 동시에 제어
<button className={`${styles.primary} bg-red-500`}>저장</button>

// ✓ background는 CSS Modules가 담당하고, 배치는 Tailwind가 담당
<button className={`${styles.primary} inline-flex items-center gap-2`}>저장</button>
```

## Tailwind CSS 규칙

### 클래스 정렬 순서

레이아웃 → 박스 모델 → 타이포그래피 → 비주얼 → 기타 순서로 작성한다.

```tsx
// ✓ 권장 순서
<div className="flex items-center gap-4 p-4 text-sm text-gray-700 bg-white rounded-lg shadow-md" />
```

### 반응형 디자인

모바일 퍼스트로 작성하고, 큰 화면에 대한 스타일을 브레이크포인트로 추가한다.

```tsx
// ✓ 모바일 퍼스트
<div className="flex flex-col md:flex-row lg:gap-8" />
```

### 조건부 클래스

`tailwind-merge`를 사용하여 클래스를 안전하게 병합한다.

```typescript
import { twMerge } from 'tailwind-merge';

const buttonClass = twMerge(
  'px-4 py-2 rounded-lg',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed',
);
```

### 금지 사항

```tsx
// ✕ 매직 넘버
<div className="w-[347px] mt-[13px]" />

// ✓ 디자인 토큰 활용
<div className="w-full max-w-sm mt-3" />
```

---

## shadcn/ui 규칙

### 컴포넌트 활용

- 기본 UI 요소(Button, Input, Dialog 등)는 shadcn/ui 컴포넌트를 우선 사용
- 커스터마이징이 필요하면 shadcn/ui 컴포넌트를 `shared/ui/snack-dict/*`에서 확장하여 사용
- 직접 구현하기 전에 shadcn/ui에 해당 컴포넌트가 있는지 먼저 확인

### 변형(Variants) 활용

```tsx
// ✓ variant prop으로 스타일 분기
<Button variant="destructive" size="sm">삭제</Button>

// ✕ 직접 클래스 오버라이드
<Button className="bg-red-500 text-white text-sm px-3 py-1">삭제</Button>
```

---

## 아이콘

- Lucide React 라이브러리를 사용
- 아이콘 크기는 Tailwind 유틸리티 클래스로 지정

```tsx
import { MessageCircle } from 'lucide-react';

<MessageCircle className="size-5 text-gray-500" />
```
