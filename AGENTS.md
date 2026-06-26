<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Skills

아래 조건에 해당하면 반드시 해당 문서를 먼저 읽은 뒤 작업하세요.
문서를 읽지 않고 작업하지 마세요.

| 조건                                        | 반드시 읽을 문서                 |
| ------------------------------------------- | -------------------------------- |
| 파일/폴더 생성, import 경로 결정            | `agent-docs/fsd-structure.md`    |
| className, 스타일 관련 코드 수정            | `agent-docs/styling.md`          |
| git commit, branch, PR 작성                 | `agent-docs/git-workflow.md`     |
| HTML 태그, aria 속성, 이미지/비디오         | `agent-docs/a11y-performance.md` |
| React 컴포넌트 작성, 훅 사용, TSX 타입 선언 | `agent-docs/react-tsx.md`        |
| Storybook 관련 작업                         | `agent-docs/storybook.md`        |
| Snack Dict 디자인 방향, 시각적 의사결정     | `agent-docs/design-guide.md`     |

## Planning Rule

모든 작업은 먼저 작업 계획을 제시한 뒤 진행합니다.

- 구현 또는 수정 작업 전, 반드시 `<proposed_plan>`을 먼저 제시합니다.
- **큰 변경, 파일 생성/이동/삭제, 구조 변경, 여러 파일에 걸친 수정**은 사용자 확인 후 진행합니다.
- **작은 범위의 단순 수정**은 계획 제시 후 바로 진행할 수 있습니다.
- 규칙 문서와 충돌하거나 영향 범위가 불분명한 경우에는 먼저 사용자에게 확인합니다.

## Project Defaults

이 프로젝트의 기본 기준은 아래와 같습니다.

- Next.js 16
- App Router 사용
- TypeScript 사용
- `src/` 디렉터리 사용
- FSD 구조 기반으로 폴더 구성
- 패키지 매니저는 `pnpm` 사용
- 스타일링은 Tailwind CSS + shadcn/ui + CSS Modules 조합 사용
- 공통 UI 및 디자인 확인은 Storybook 기준으로 관리
