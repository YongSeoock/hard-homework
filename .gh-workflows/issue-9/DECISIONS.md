# Design Decisions — Issue #9

> Append-only. Add a new table row per decision. Newest first (below header).

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| 2026-08-19 | 홈 토픽 카드 설명(요약) 제거 | 첫화면을 언어명만으로 정리. 정보는 주제 상세에서 계속 제공 | 카드에 요약 유지(첫화면 과밀) |
| 2026-08-19 | 홈·이전/다음 네비게이션을 버튼 스타일로 통일 | 이동 요소를 눈에 띄게 | 텍스트 링크 유지(가독성 낮음) |
| 2026-08-19 | 코드 예제 실행은 브라우저 Pyodide(WASM)로 유지 | opencode/LLM/서버 호출 0건 → 토큰 사용량 추가 없음 | 서버/LLM 실행(토큰·비용 발생, 불가) |
