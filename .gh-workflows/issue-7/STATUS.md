# Issue #7: 공부 시간부족에 따른 내용 변경

| Key | Value |
|-----|-------|
| Branch | `issue_#7` |
| Started | 2026-08-19 |
| Status | in-progress |
| Issue | https://github.com/YongSeoock/hard-homework/issues/7 |
| Labels | — |
| Assignee | YongSeoock |

## Context
- 내일(8/20) 15시 면접 전 전체 학습이 어려워, "사이트에 질문하면 맞는지/틀린지 답해주는 기능" 요청.
- 요구 제약: 질문할 때마다 비용이 발생하면 안 되고 **전부 무료**여야 함.
- 타당성 검증: OMP 같은 실제 LLM(OpenAI 등 API)은 **호출당 과금 → 유료**라 무료 요구를 위배.
  - 채택 방안: 사이트 자체 콘텐츠(예상 Q&A·핵심 개념·쉽게 풀어쓰기)를 브라우저에서 검색해
    즉답하는 **로컬 검색 챗봇** — API/네트워크 호출 0건, 100% 무료, 오프라인 동작.

## Checklist
- [x] QA 검색 인덱스 구축(전 주제 QA·핵심 개념·쉽게 풀어쓰기) + 한국어 토큰/동의어 매칭
- [x] /ask 질문하기 페이지 + 채팅 UI(질문 입력 → 즉답 + 출처 링크)
- [x] 결과 없음 폴백(관련 주제 추천 + 예시 질문 안내)
- [x] 홈 화면에 질문하기 링크 연결
- [x] check-types 통과 + 빌드 및 브라우저 실측(무료 확인: 네트워크/API 호출 0건)

## Last Position
- 무료 질문하기 구현 완료(/ask). 검색 스코어링(조사 제거·동의어·바이그램) + 채팅 UI + 홈 링크. 실측 대기 중.

## Discussion
> Append-only. Newest discussion rounds at top (below header).

| Date | Scope | New Items | Decisions |
|------|-------|-----------|-----------|
| — | — | — | — |

## Verification
| Date | Status | Checks Passed | Failures |
|------|--------|---------------|----------|
| — | not-run | — | — |
