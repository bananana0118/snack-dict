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
