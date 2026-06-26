# FSD 폴더 구조 & 레이어 규칙

> Feature-Sliced Design 구조 패턴에 대한 상세 규칙이다.

Snack Dict의 기본 아키텍처는 **Next.js App Router + FSD 기반 모듈러 모놀리스**이다.
상세 설계와 확장 기준은 `docs/architecture.md`를 기준으로 확인한다.

---

## 폴더 구조

```
src/
├── app/              # Next.js App Router (라우팅, 레이아웃, 프로바이더)
│   └── providers/    # QueryProvider, SupabaseProvider, AppProviders
├── widgets/          # 독립적 UI 블록 (조합된 feature 단위)
├── features/         # 비즈니스 기능 단위
│   └── [feature]/
│       ├── ui/       # UI 컴포넌트
│       ├── hooks/    # 커스텀 훅
│       ├── store/    # Zustand 스토어
│       ├── model/    # 도메인 로직, 서비스
│       └── types/    # 타입 정의
├── entities/         # 도메인 모델 (사용자, 메시지, 빌리지 등)
├── shared/           # 공용 유틸, 상수, 타입, UI
│   ├── ui/           # 공용 UI 컴포넌트
│   │   ├── base/     # Radix/shadcn 기반 primitive wrapper
│   │   └── snack-dict/ # Snack Dict 디자인 시스템 커스텀 컴포넌트
│   ├── hooks/        # 공용 커스텀 훅
│   ├── lib/          # 외부 라이브러리 래퍼 (supabase client 등)
│   ├── constants/    # 상수 정의
│   └── types/        # 공용 타입
```

---

## 레이어 계층 & 의존성 방향

```
app → widgets → features → entities → shared
```

- 상위 레이어는 하위 레이어만 import 가능
- 역방향 참조 절대 금지 (shared가 features를 import하면 안 됨)

---

## 핵심 규칙

### 1. 슬라이스 간 직접 참조 금지

같은 레이어 내의 슬라이스끼리 직접 import하지 않는다.

```typescript
// ✕ features/chat에서 features/voice를 직접 import
import { useVoice } from '@/features/voice/hooks/useVoice';

// ✓ shared를 통해 공유하거나, 상위 레이어(widgets)에서 조합
```

### 2. 배럴 파일로 public API 노출

각 슬라이스는 `index.ts`를 통해 외부에 노출할 것만 export한다.

```typescript
// features/chat/index.ts
export { ChatPanel } from './ui/ChatPanel';
export { useChatStore } from './store/useChatStore';
export type { Message } from './types';
```

### 3. app 레이어의 역할

- 라우팅과 레이아웃만 담당
- 비즈니스 로직 포함 금지
- 프로바이더 초기화 (`providers/` 디렉터리)

### 4. shared 레이어의 역할

- 프로젝트 전반에서 재사용되는 코드만 배치
- 특정 feature에 종속되는 코드는 해당 feature 슬라이스로 이동

### 5. UI 컴포넌트 배치

기본 UI primitive와 Snack Dict 전용 커스텀 UI를 분리한다.

#### `src/shared/ui/base/`

- Radix UI 또는 shadcn/ui 기반의 낮은 수준 컴포넌트만 배치한다.
- 컴포넌트 파일, Storybook, 테스트는 `src/shared/ui/base/[component]/`에 함께 둔다.
- HTML 기본 속성과 Radix/shadcn 동작을 최대한 유지하는 wrapper 역할만 담당한다.
- 앱 도메인, Snack Dict 브랜드 문구, feature 전용 상태, 비즈니스 로직을 포함하지 않는다.
- `shared/lib`, 외부 라이브러리, 스타일 토큰만 의존할 수 있다.

```typescript
// ✓ base button은 primitive 역할만 담당
import { Slot } from 'radix-ui';

import { cn } from '@/shared/lib/utils';
```

#### `src/shared/ui/snack-dict/[component]/`

- 여러 화면에서 재사용되는 Snack Dict 디자인 시스템 컴포넌트를 배치한다.
- `shared/ui/base` 컴포넌트를 조합하거나 확장해 Snack Dict 디자인 시스템 스타일과 variant를 정의한다.
- 컴포넌트 파일, CSS Modules, Storybook, 테스트, 프롬프트 문서는 같은 폴더에 함께 둔다.
- 외부에서 사용할 API는 해당 폴더의 `index.ts`에서 명시적으로 export한다.

```typescript
// ✓ snack-dict button은 base button을 감싼 Snack Dict 전용 컴포넌트
import { Button } from '@/shared/ui/base/button';
```

#### UI 컴포넌트 네이밍

- UI 컴포넌트 폴더명은 역할 기준의 단일 명사 또는 kebab-case를 사용한다. 예: `button`, `input`, `image-slider`, `snack-card`.
- 기본 컴포넌트 파일명은 폴더명과 맞춘다. 예: `src/shared/ui/snack-dict/input/input.tsx`.
- 같은 UI 슬라이스 안에서 책임이 분리되는 보조 컴포넌트는 lower camelCase 파일명으로 분리한다.
- 독립 스타일, Storybook, 테스트가 필요한 컴포넌트는 kebab-case 폴더로 분리하고 내부 파일은 lower camelCase를 사용할 수 있다. 예: `src/shared/ui/snack-dict/search-input/searchInput.tsx`.
- 다단어 constants 파일은 lower camelCase basename에 `.constants.ts`를 붙인다. 예: `iconAssets.constants.ts`, `imageAssets.constants.ts`.
- base 컴포넌트의 코드 심볼은 primitive 이름을 사용한다. 예: `Button`, `Input`.
- Snack Dict 디자인 시스템 컴포넌트의 코드 심볼은 `SnackDict` prefix를 사용한다. 예: `SnackDictInput`, `SnackDictSearchInput`.
- 외부 사용처는 내부 파일을 직접 import하지 않고 해당 폴더의 `index.ts` public API를 통해 import한다.

#### UI 에셋 네이밍과 상수화

- 반복 사용되는 정적 아이콘과 이미지 경로는 `shared/constants`의 상수로 관리한다. 예: `public/icons/*`, `public/images/*`.
- 정적 파일 경로는 TypeScript `enum`이 아니라 `as const` 객체 registry로 관리한다.
- 상수는 에셋의 의미가 드러나는 이름으로 작성하고, 사용처에서는 문자열 경로를 직접 쓰지 않고 registry를 참조한다.
- 한 컴포넌트 안에서만 쓰이는 lucide 아이콘은 해당 컴포넌트 파일에서 직접 import한다. 예: 검색 입력의 `Search`, clear 버튼의 `X`.
- 여러 컴포넌트가 같은 의미로 공유하는 아이콘 조합만 상수나 매핑으로 분리한다. 예: toast 상태 아이콘, 공통 빈 상태 아이콘.
- 단순 경로 registry는 `{ search: "/icons/search.svg" } as const` 형태로 작성하고, key 타입은 `keyof typeof ICON_ASSETS`처럼 registry에서 파생한다.
- 작은 장식용 정적 SVG 아이콘은 전용 아이콘 컴포넌트 안에서만 `<img alt="" aria-hidden="true">` 사용을 허용한다.
- 크기 메타데이터가 필요한 이미지는 `{ src, width, height } as const` 형태로 관리하고, key 타입은 `keyof typeof IMAGE_ASSETS`처럼 registry에서 파생한다.
- 이미지 registry는 기본적으로 `src`, `width`, `height` 같은 에셋 메타데이터만 관리하고, `alt`, `priority`, 렌더링 크기 같은 판단은 사용 컴포넌트에서 정한다.
- 로고처럼 의미가 완전히 고정된 에셋만 예외적으로 registry에 기본 label을 둘 수 있다.
- lucide-react 아이콘은 정적 파일이 아니므로 정적 에셋 registry 대상에 포함하지 않는다.

#### FSD 레이어별 커스텀 컴포넌트 위치

- 특정 기능에만 필요한 UI는 `src/features/[feature]/ui/`에 둔다.
- 특정 도메인 모델 표현에 종속되는 UI는 `src/entities/[entity]/ui/`에 둔다.
- 여러 feature와 entity를 조합하는 화면 블록은 `src/widgets/`에 둔다.
- `shared` 레이어의 UI는 `features`, `entities`, `widgets`, `app`을 import하지 않는다.

---

## 상태 관리 배치

| 상태 종류 | 도구 | 배치 위치 |
|-----------|------|-----------|
| 서버 데이터 | TanStack React Query | `features/[feature]/hooks/` |
| 클라이언트 전역 상태 | Zustand | `features/[feature]/store/` |
| 공용 클라이언트 상태 | Zustand | `shared/store/` |
