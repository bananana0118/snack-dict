# Snack Input 프롬프트

## 역할

`SnackDictInput`은 Snack Dict 화면에서 사용하는 기본 한 줄 입력 컴포넌트다. shadcn/Radix 기반 `Input`을 직접 Snack Dict 디자인 시스템 스타일로 덮어쓰지 않고, base `Input`을 감싼 Snack Dict 전용 컴포넌트로 관리한다.

입력 계열 컴포넌트는 다음처럼 나누어 관리한다.

- `SnackDictInput`: 한 줄 텍스트 입력
- `SnackDictTextarea`: 여러 줄 텍스트 입력
- `SnackDictSearchInput`: 검색 아이콘이 포함된 검색 입력. 독립 스타일과 상호작용이 있어 `snack-dict/search-input`에서 관리한다.

Figma에서 입력창이 단순한 `div`와 텍스트로 표현되어 있어도, 코드에서는 실제 입력 가능한 form element를 사용한다.

검색 로직, API 호출, 라우팅은 shared UI에 넣지 않고 상위 feature 또는 widget에서 처리한다.

폴더명은 `snack-dict/input`, `snack-dict/search-input`처럼 역할명을 사용하고, 컴포넌트명은 base `Input`과 구분하기 위해 `SnackDict` prefix를 사용한다.

## 기준 문서

수정 전 아래 문서를 먼저 확인한다.

- `AGENTS.md`
- `agent-docs/design-guide.md`
- `agent-docs/fsd-structure.md`
- `agent-docs/styling.md`
- `agent-docs/react-tsx.md`
- `agent-docs/a11y-performance.md`
- `agent-docs/storybook.md`
- `src/shared/styles/tokens.css`
- `src/shared/styles/typography.css`

## Figma 기준

Figma file key는 공개 저장소에 기록하지 않는다.
Figma file key는 `FIGMA_SNACK_DICT_FILE_KEY` 환경변수를 기준으로 사용한다.
`FIGMA_SNACK_DICT_FILE_KEY`를 읽을 수 없는 경우 Figma 기반 구현을 진행하지 않고, 필요한 환경변수 이름을 보고한다.

Figma URL 형식:

`https://www.figma.com/design/{FIGMA_SNACK_DICT_FILE_KEY}/%EA%BD%88%EC%9E%90%EC%82%AC%EC%A0%84-Copy-?node-id=565-1864&m=dev`

참고 대상:

- 검색 입력창
- placeholder: `과자명 검색`
- search icon
- node-id: `565:1864`

node-id는 Figma 구조 변경으로 달라질 수 있으므로,
고정 기준으로만 삼지 않고 컴포넌트명, 프레임명, placeholder 텍스트를 함께 확인한다.

모바일 퍼스트를 기본으로 보고, PC 전용 차이는 필요한 경우 반응형 class로만 추가한다.

## 네이밍 규칙

- 기본 입력 컴포넌트는 `snack-dict/input`의 `SnackDictInput`으로 관리한다.
- 여러 줄 입력은 `SnackDictTextarea`로 관리한다.
- 검색 전용 입력은 `snack-dict/search-input`의 `SnackDictSearchInput`으로 관리한다.
- 입력값, placeholder, disabled, invalid, 검색 실행 여부는 props로 제어한다.
- 마크업, 접근성 역할, 상호작용 의미가 입력 필드와 달라지면 별도 컴포넌트로 분리한다.

## 구현 규칙

- `SnackDictInput`은 base `Input`을 내부에서 사용한다.
- `SnackDictTextarea`는 실제 `textarea` 요소 또는 base textarea가 있다면 해당 컴포넌트를 사용한다.
- `SnackDictSearchInput`은 검색 입력 의미가 드러나도록 `input`을 기반으로 구현한다.
- Snack Dict 디자인 시스템 스타일은 컴포넌트와 같은 폴더의 CSS Module에서 관리한다. 예: `input.module.css`, `searchInput.module.css`.
- 색상과 타이포그래피는 CSS Module 안에서 `--snack-dict-*` CSS 변수만 사용한다.
- 임의 hex 색상, 임의 폰트 크기, 임의 letter-spacing을 추가하지 않는다.
- feature나 widget에 종속된 문구, 데이터, 비즈니스 상태는 props로 주입한다.
- shared UI에는 검색 API 호출, 라우팅, feature 전용 상태를 넣지 않는다.
- `value`, `defaultValue`, `onChange`, `onSearch`, `disabled`, `invalid` 같은 상태는 props로 주입한다.
- 검색 아이콘이 장식이면 `aria-hidden="true"`로 처리한다.
- 검색 아이콘이 실행 버튼이면 `button` 요소와 접근 가능한 이름을 제공한다.

## 상태

Storybook과 구현에서 아래 상태를 확인한다.

- 기본
- 입력값 있음
- placeholder
- focus-visible
- disabled
- invalid
- search input

## 접근성

- 입력창에는 접근 가능한 이름을 제공한다.
- placeholder만 label의 대체 수단으로 사용하지 않는다.
- 화면에 보이는 label이 없는 경우 `aria-label` 또는 연결된 label을 사용한다.
- invalid 상태가 있다면 `aria-invalid`를 제공한다.
- 에러 메시지가 있다면 `aria-describedby`로 연결한다.
- focus 표시를 제거하지 않는다.
- disabled 상태에서 입력과 검색 실행이 모두 비활성화되어야 한다.

## Storybook 확인 항목

- Default
- WithValue
- Placeholder
- Focus
- Disabled
- Invalid
- Textarea
- SearchInput
- SearchInputWithAction
