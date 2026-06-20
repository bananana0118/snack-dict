# 접근성 & 성능 최적화

> 시맨틱 마크업, ARIA 접근성, 이미지/애니메이션 성능 최적화 규칙이다.

---

## 접근성 (A11y)

### 시맨틱 마크업

- `div` 남용 금지 → 용도에 맞는 시맨틱 태그 우선 사용
- 랜드마크: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- 콘텐츠 구조: `<section>`, `<article>`, `<h2>`~`<h6>`

```tsx
// ✕
<div className="nav-wrapper">
  <div className="nav-item">메뉴</div>
</div>

// ✓
<nav aria-label="메인 내비게이션">
  <a href="/menu">메뉴</a>
</nav>
```

### 헤딩 계층 구조

- 페이지당 `<h1>` 하나만 사용
- 헤딩 레벨을 건너뛰지 않음 (h2 → h4 금지, h2 → h3 사용)

### ARIA 속성

- 네이티브 HTML 시맨틱이 충분하면 ARIA 사용하지 않음
- 동적 UI 상태에는 적절한 ARIA 속성 활용

```tsx
// 드롭다운 토글
<button aria-expanded={isOpen} aria-controls="menu-panel">메뉴</button>
<div id="menu-panel" role="menu" hidden={!isOpen}>...</div>
```

### 인터랙티브 요소

- 모든 클릭 가능한 요소에 `:hover`, `:focus`, `:active` 상태 정의
- 키보드 접근 가능해야 함 (Tab, Enter, Escape)
- 포커스 표시(outline) 제거 금지

```tsx
// ✕ 포커스 표시 제거
<button className="outline-none">클릭</button>

// ✓ 포커스 표시 유지 또는 커스텀
<button className="focus-visible:ring-2 focus-visible:ring-blue-500">클릭</button>
```

### 이미지 접근성

- `next/image` 사용 시 `alt` 속성 필수
- 장식용 이미지는 `alt=""` 사용 (빈 문자열)
- 정보 전달 이미지는 내용을 설명하는 alt 텍스트 작성

### 비디오/버튼 구조 분리

- 비디오 컨트롤과 액션 버튼을 구조적으로 분리
- 통계 정보는 부모 요소에 `aria-label`로 통합 정보 제공

---

## 성능 최적화

### 애니메이션

- GPU 가속 속성만 사용: `transform`, `opacity`
- `width`, `height`, `top`, `left` 등 레이아웃 트리거 속성으로 애니메이션 금지
- UX 모션은 CSS 기반 우선, Framer Motion 지양

```css
/* ✕ 레이아웃 트리거 */
.animate { transition: width 0.3s, top 0.3s; }

/* ✓ GPU 가속 */
.animate { transition: transform 0.3s, opacity 0.3s; }
```

### 이미지 최적화

- `next/image` 컴포넌트로 CLS(Cumulative Layout Shift) 방지
- 주요 이미지(LCP 후보)에만 선별적으로 `priority` 적용
- 나머지 이미지는 기본 lazy loading 유지

```tsx
// LCP 이미지 (히어로, 메인 배너 등)
<Image src="/hero.webp" alt="메인 배너" priority />

// 일반 이미지 (기본 lazy loading)
<Image src="/thumbnail.webp" alt="썸네일" />
```

### 비디오 최적화

- `IntersectionObserver`를 활용한 lazy loading
- 뷰포트에 진입할 때만 비디오 로드/재생

### 번들 최적화

- 동적 import(`next/dynamic`)로 초기 번들 크기 최소화
- Phaser 등 대용량 라이브러리는 필요 시점에 동적 로드

```tsx
import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import('@/widgets/game/GameCanvas'), {
  ssr: false,
  loading: () => <div>게임 로딩 중...</div>,
});
```
