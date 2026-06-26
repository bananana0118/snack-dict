# SnackDictAccordion

`SnackDictAccordion`은 Snack Dict 화면에서 사용하는 기본 접힘/펼침 UI 컴포넌트다.
Radix 기반 base `Accordion`을 직접 화면에서 스타일링하지 않고, Snack Dict 전용 스타일과 구조를 이 컴포넌트에서 관리한다.

## 사용 기준

- 여러 화면에서 반복되는 접힘/펼침 UI는 `SnackDictAccordion`을 사용한다.
- 특정 콘텐츠가 고정된 섹션은 이 컴포넌트를 기반으로 전용 컴포넌트를 만든다.
- 접근성, 키보드 동작, `data-state`는 base accordion의 Radix primitive에 맡긴다.
- 제목, 선, 여백, 화살표 회전 같은 시각 표현은 CSS Module에서 관리한다.

## 파일 기준

- 기본 컴포넌트 파일명은 `accordion.tsx`를 사용한다.
- 외부 사용처는 `src/shared/ui/snack-dict/accordion`의 public API만 import한다.
- Storybook과 테스트는 같은 폴더에 함께 둔다.
