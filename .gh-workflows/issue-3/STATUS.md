# Issue #3: 공부 페이지 변경 요청

| Key | Value |
|-----|-------|
| Branch | `issue_#3` |
| Started | 2026-08-18 |
| Status | in-progress |
| Issue | https://github.com/YongSeoock/hard-homework/issues/3 |
| Labels | — |
| Assignee | YongSeoock |

## Context
- 기존 학습 페이지가 텍스트 위주라 가독성이 낮다는 피드백에 따라 시각적 자료와 코드 실행 기능 추가.
- 요구사항: ① 텍스트 위주 설명 + 시각적 자료 구축, ② 코드 예제를 실제 실행해볼 수 있는 환경 구축.

## Checklist
- [x] Topic 타입에 visuals(비교표/단계 흐름) 필드 추가
- [x] CSS 기반 시각 컴포넌트(VisualBlock: 비교표, 단계 흐름) — 10개 주제에 적용
- [x] Python 실행 환경(Pyodide) — python 코드 예제에 실행 버튼 + 에디터 + 출력
- [x] 브라우저 실측: Pyodide로 자료구조 예제 실행, 출력 확인 (합격/불합격 판정 결과)

## Last Position
- 구현 완료. `bun run dev` → http://localhost:3000 에서 시각 자료 및 Python 실행 확인.

## Discussion
> Append-only. Newest discussion rounds at top (below header).

| Date | Scope | New Items | Decisions |
|------|-------|-----------|-----------|
| — | — | — | — |

## Verification
| Date | Status | Checks Passed | Failures |
|------|--------|---------------|----------|
| 2026-08-18 | passed | 5/5 | None |
