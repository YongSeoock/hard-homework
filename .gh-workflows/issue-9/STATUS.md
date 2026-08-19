# Issue #9: 토큰 사용량 확인을 위한 간단한 작업 요청

| Key | Value |
|-----|-------|
| Branch | `issue_#9` |
| Started | 2026-08-19 |
| Status | in-progress |
| Issue | https://github.com/YongSeoock/hard-homework/issues/9 |
| Labels | — |
| Assignee | YongSeoock |

## Context
- 첫화면(홈) 토픽 카드의 설명(요약)이 깔끔하지 않음 → 설명 제거, 언어명만 표시 요청.
- 홈 버튼과 이전/다음 언어로 넘어가는 네비게이션을 눈에 띄는 버튼으로 개선 요청.
- 코드 예제 실행 시 opencode-go 토큰 사용량이 추가로 발생하는지 확인 요청.
- 사전 조사(코드 확인): 파이썬 예제 실행 경로는 `PythonRunner` → **Pyodide(브라우저 내 WASM)** 로 실행.
  opencode/LLM/서버 호출 0건 → **토큰 사용량 추가 발생 없음**. 최초 1회 CDN에서 Pyodide WASM(약 10MB) 다운로드 외 네트워크 없음.
  실행 불가(runnable:false) 예제는 실행 버튼이 없음.

## Checklist
- [x] 홈 첫화면 토픽 카드에서 설명(요약) 제거 — 언어명만 표시
- [x] 홈 버튼·이전/다음 언어 네비게이션을 눈에 띄는 버튼 스타일로 개선
- [x] 코드 예제 실행 토큰 사용량 검증 및 문서화(파이썬 = 브라우저 Pyodide → 토큰 0건)
- [x] check-types + 빌드 + 브라우저 실측(카드 / 네비게이션 버튼 / 예제 실행)
- [x] verify 게이트 통과 + PR 준비

## Last Position
- 구현 완료: 홈 카드 설명 제거, 네비게이션 버튼 강조, 토큰 검증 문서화. 실측/검증 대기.

## Discussion
> Append-only. Newest discussion rounds at top (below header).

| Date | Scope | New Items | Decisions |
|------|-------|-----------|-----------|
| — | — | — | — |

## Verification
| Date | Status | Checks Passed | Failures |
|------|--------|---------------|----------|
| 2026-08-19 | passed | 5/5 | None |
