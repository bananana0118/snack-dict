import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { SnackActionGroup, SnackButton, SnackMoreButton } from "./button"
import { DualAction, SingleAction, WithListExpansion } from "./button.stories"

describe("스낵 버튼", () => {
  it("스낵 디자인 데이터 슬롯과 기본 라벨을 렌더링한다", () => {
    const markup = renderToStaticMarkup(<SnackButton>검색</SnackButton>)

    expect(markup).toContain('data-slot="snack-button"')
    expect(markup).toContain("검색")
  })

  it("스토리북 컨트롤을 위한 액션 변형과 크기 속성을 적용한다", () => {
    const markup = renderToStaticMarkup(
      <SnackButton variant="secondary" size="sm">
        초기화
      </SnackButton>
    )

    expect(markup).toContain('data-variant="secondary"')
    expect(markup).toContain('data-size="sm"')
  })

  it("버튼 접근성과 네이티브 속성을 유지한다", () => {
    const markup = renderToStaticMarkup(
      <SnackButton variant="secondary" aria-label="초기화" disabled>
        초기화
      </SnackButton>
    )

    expect(markup).toContain('aria-label="초기화"')
    expect(markup).toContain("disabled")
  })

  it("전체 너비 액션 버튼을 레이아웃 스타일링용으로 표시한다", () => {
    const markup = renderToStaticMarkup(
      <SnackButton fullWidth variant="primary">
        저장
      </SnackButton>
    )

    expect(markup).toContain('data-full-width="true"')
    expect(markup).toContain("저장")
  })

  it("베이스와 스낵 레이어의 스타일 책임 분리를 유지한다", () => {
    const markup = renderToStaticMarkup(<SnackButton>검색</SnackButton>)

    expect(markup).not.toContain("hover:bg-muted")
    expect(markup).not.toContain("bg-primary")
    expect(markup).not.toContain("h-8")
    expect(markup).not.toContain("px-2.5")
  })
})

describe("스낵 액션 그룹", () => {
  it("단일 액션 레이아웃을 표시한다", () => {
    const markup = renderToStaticMarkup(
      <SnackActionGroup mode="single">
        <SnackButton fullWidth variant="primary" size="lg">
          선택 완료
        </SnackButton>
      </SnackActionGroup>
    )

    expect(markup).toContain('data-slot="snack-action-group"')
    expect(markup).toContain('data-mode="single"')
    expect(markup.match(/data-full-width="true"/g)).toHaveLength(1)
  })

  it("이중 액션 레이아웃을 표시한다", () => {
    const markup = renderToStaticMarkup(
      <SnackActionGroup mode="dual">
        <SnackButton fullWidth variant="secondary" size="lg">
          취소
        </SnackButton>
        <SnackButton fullWidth variant="primary" size="lg">
          저장
        </SnackButton>
      </SnackActionGroup>
    )

    expect(markup).toContain('data-mode="dual"')
    expect(markup.match(/data-full-width="true"/g)).toHaveLength(2)
  })
})

describe("더보기 버튼", () => {
  it("전용 더보기 버튼 슬롯과 고정 라벨을 렌더링한다", () => {
    const markup = renderToStaticMarkup(<SnackMoreButton />)

    expect(markup).toContain('data-slot="snack-more-button"')
    expect(markup).toContain("더보기")
  })

  it("뒤쪽 아이콘을 장식용으로 표시한다", () => {
    const markup = renderToStaticMarkup(<SnackMoreButton />)

    expect(markup).toContain('aria-hidden="true"')
  })

  it("네이티브 버튼 속성을 전달한다", () => {
    const markup = renderToStaticMarkup(
      <SnackMoreButton aria-label="더보기 버튼" disabled />
    )

    expect(markup).toContain('aria-label="더보기 버튼"')
    expect(markup).toContain("disabled")
  })

  it("더보기 버튼의 크기를 lg로 고정한다", () => {
    const markup = renderToStaticMarkup(<SnackMoreButton />)

    expect(markup).toContain('data-size="lg"')
    expect(markup).not.toContain('data-size="unstyled"')
  })
})

describe("더보기 버튼 스토리북 예시", () => {
  it("단일과 이중 액션 그룹 모드를 문서화한다", () => {
    const singleMarkup = renderToStaticMarkup(
      <>{SingleAction.render?.({}, {} as never)}</>
    )
    const dualMarkup = renderToStaticMarkup(<>{DualAction.render?.({}, {} as never)}</>)

    expect(singleMarkup).toContain('data-slot="snack-action-group"')
    expect(singleMarkup).toContain('data-mode="single"')
    expect(dualMarkup).toContain('data-mode="dual"')
    expect(singleMarkup.match(/data-full-width="true"/g)).toHaveLength(1)
    expect(dualMarkup.match(/data-full-width="true"/g)).toHaveLength(2)
  })

  it("초기 목 목록과 더보기 버튼으로 목록 확장 사례를 문서화한다", () => {
    const StoryRender = WithListExpansion.render

    expect(StoryRender).toBeDefined()

    const markup = renderToStaticMarkup(<>{StoryRender?.({}, {} as never)}</>)

    expect(markup).toContain('role="list"')
    expect(markup.match(/role="listitem"/g)).toHaveLength(4)
    expect(markup).toContain("더보기")
  })
})
