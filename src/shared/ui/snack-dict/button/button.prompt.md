# Snack Button 프롬프트

## 역할

`SnackDictButton`은 Snack Dict 화면에서 사용하는 액션 버튼이다. shadcn/Radix 기반 `Button`을 직접 Snack Dict 디자인 시스템 스타일로 덮어쓰지 않고, base `Button`을 감싼 Snack Dict 전용 컴포넌트로 관리한다.

폴더명은 `snack-dict/button`처럼 역할명을 사용하고, 컴포넌트명은 base `Button`과 구분하기 위해 `SnackDictButton`을 사용한다.

## 기준 문서

수정 전 아래 문서를 먼저 확인한다.

- `agent-docs/fsd-structure.md`
- `agent-docs/styling.md`
- `agent-docs/react-tsx.md`
- `agent-docs/a11y-performance.md`
- `agent-docs/storybook.md`
- `src/shared/styles/tokens.css`
- `src/shared/styles/typography.css`

## Figma 기준

예시)
@https://www.figma.com/design/kHqISKYkNJisLcY7YHfEqg/%EA%BD%88%EC%9E%90%EC%82%AC%EC%A0%84-Copy-?node-id=568-8493&m=dev

색상별 차이

- 참고할 공통컴포넌트 노드ID: `565:2166` (primary)
- 참고할 공통컴포넌트 노드ID: `565:2234` (secondary)
- 참고할 공통컴포넌트 노드ID: `565:8493`

모바일 퍼스트를 기본으로 보고, PC 전용 차이는 필요한 경우 반응형 class로만 추가한다.

## 네이밍 규칙

- 기본 Snack Dict 버튼은 `snack-dict/button`의 `SnackDictButton`으로 관리한다.
- 버튼의 시각적 차이는 액션 버튼에 필요한 `variant`와 `size`로 표현한다.
- 단일/이중 주요 액션 배치는 `SnackDictActionGroup`이 담당한다.
- 마크업, 접근성 역할, 상호작용 의미가 버튼과 달라지면 별도 컴포넌트로 분리한다.

## 구현 규칙

- `src/shared/ui/button.tsx`의 base `Button`을 내부에서 사용한다.
- Snack Dict 디자인 시스템 스타일은 컴포넌트와 같은 폴더의 `button.module.css`에서 관리한다.
- 색상과 타이포그래피는 CSS Module 안에서 `--snack-dict-*` CSS 변수만 사용한다.
- 임의 hex 색상, 임의 폰트 크기, 임의 letter-spacing을 추가하지 않는다.
- Snack Dict 화면에 필요한 variant만 `SnackDictButton`에 둔다.
- feature나 widget에 종속된 문구, 데이터, 비즈니스 상태는 props로 주입한다.
- `SnackDictActionGroup`은 레이아웃만 담당하고, 버튼의 의미와 시각 variant는 children의 `SnackDictButton`이 담당한다.

## Variant

- `primary`: 주요 액션 버튼이다.
- `secondary`: 보조 액션 버튼이다.

## Size

- `sm`: 작은 보조 액션에 사용한다.
- `md`: 모바일 기본 액션 크기이다.
- `lg`: PC 또는 강조 주요 액션에 사용한다.
- `icon`: 아이콘 단독 버튼에 사용한다.

## Action Group

- `mode="single"`: 단일 전체 너비 주요 액션 배치에 사용한다.
- `mode="dual"`: 두 개의 전체 너비 주요 액션을 가로로 배치한다.

## 상태

Storybook과 구현에서 아래 상태를 확인한다.

- 기본
- hover
- focus-visible
- disabled

## 접근성

- 아이콘 단독 버튼은 반드시 `aria-label` 또는 동등한 접근 가능한 이름을 제공한다.
- focus 표시를 제거하지 않는다.

## Storybook 확인 항목

- Default
- Variants
- Sizes
- States
- Icon
- SingleAction
- DualAction
