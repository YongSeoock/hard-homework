# Design Decisions — Issue #7

> Append-only. Add a new table row per decision. Newest first (below header).

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| 2026-08-19 | LLM API(OpenAI 등) 기반 챗봇 채택 불가 | 호출당 과금 구조로 "전부 무료" 요구를 위배 | 사용자가 부담(거부됨) / 사용량 제한(요구 미충족) |
| 2026-08-19 | 사이트 콘텐츠 기반 로컬 검색 챗봇으로 구현 | API·네트워크 호출 0건 — 100% 무료, 오프라인 즉답, 면접 당일까지 사용 가능 | WebLLM(브라우저 로컬 모델) — 모델 다운로드 수백 MB, 한국어 품질/속도 불안정 |
| 2026-08-19 | /ask 전용 페이지 + 홈 링크로 제공 | 최소 구현, 기존 페이지 패턴(study-method)과 일관 | 전역 플로팅 챗 위젯 — 모든 페이지 수정·복잡도 증가 |
| 2026-08-19 | 검색 스코어링: 조사 제거 + 동의어 확장 + 바이그램 폴백 | API 없이도 자연스러운 질문에 즉답(state가 뭐야? → state, 상태 → state) | 형태소 분석기 — 외부 의존성·번들 증가 |
