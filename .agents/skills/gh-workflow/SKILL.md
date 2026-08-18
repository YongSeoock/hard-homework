---
name: gh-workflow
description: Full issue-to-PR lifecycle powered by the Bun CLI automation script (bun .agents/skills/gh-workflow/scripts/workflow.ts). Manages status, decisions, sessions, verification gates, and hybrid PR creation.
---

# GH Workflow (CLI Powered)

이 프로젝트는 `.agents/skills/gh-workflow/scripts/workflow.ts`에 위치한 **Bun CLI 스크립트**를 사용하여 이슈-to-PR 라이프사이클을 자동 제어합니다.

AI 에이전트는 규칙을 수동으로 적용하거나 파일을 직접 타이핑하지 않고, **CLI 스크립트(`bun .agents/skills/gh-workflow/scripts/workflow.ts <cmd>`)를 호출하여 상태를 동기화**합니다.

---

## 🚨 CRITICAL SAFETY RULES (안전 수칙)

1. **작업 공간 불결(Dirty Working Tree) 시 절대 자동 정돈 금지**:
   - `start` 실행 시 Working tree가 깨끗하지 않다는 에러가 발생하면, **에이전트는 절대로 `git stash`, `git commit`, `git reset` 등 환경 변경 명령을 임의로 수행하지 마십시오.**
   - **즉시 작업을 중단하고 사용자에게**: *"현재 작업 공간에 커밋되지 않은 파일이 남아 있습니다. 작업을 직접 커밋, stash, 또는 푸시하여 환경을 정돈한 후 다시 시도해 주세요."* 라고 안내하십시오.
2. **직접 실행 경로 사용**:
   - `package.json` 미동기화 상황에서도 정상 구동되도록 항상 `bun .agents/skills/gh-workflow/scripts/workflow.ts <cmd>` 직접 경로를 사용하여 실행하십시오. (단축 별칭: `bun run workflow <cmd>`)

---

## Lifecycle Overview

```
┌──────────┐    ┌───────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  START   │───→│  DISCUSS  │───→│  IMPLEMENT   │───→│  VERIFY  │───→│    PR    │───→│  MERGED  │
└──────────┘    └───────────┘    └──────────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Commands Specification

### 1. 이슈 시작: `/gh-start-issue N`
* **Agent Action**: `bun .agents/skills/gh-workflow/scripts/workflow.ts start <N>` 실행
* **내부 처리**: Git Clean 확인 $\rightarrow$ `issue_#N` 브랜치 전환 $\rightarrow$ `gh issue view` 정보 조회 $\rightarrow$ `.gh-workflows/issue-N/` 및 `STATUS.md`, `DECISIONS.md`, `sessions/YYYY-MM-DD-HHMM.md` 생성.

### 2. 논의 구체화: `/gh-discuss-issue N`
* **Agent Action**:
  1. 사용자에게 Scope, Edge Cases, Acceptance Criteria를 인터랙티브하게 질의.
  2. 논의된 결과를 `.gh-workflows/issue-N/discuss_input.json` 형식으로 작성:
     ```json
     {
       "scopeSummary": "...",
       "newItems": ["추가 구현 1", "추가 구현 2"],
       "decisionsSummary": "...",
       "decisions": [{"decision": "...", "rationale": "...", "alternatives": "..."}]
     }
     ```
  3. `bun .agents/skills/gh-workflow/scripts/workflow.ts discuss <N>` 실행 (스크립트가 STATUS.md/DECISIONS.md 갱신 및 GitHub 코멘트 자동 업로드).

### 3. 작업 재개: `/gh-continue-issue [N]`
* **Agent Action**: `bun .agents/skills/gh-workflow/scripts/workflow.ts continue` 실행
* **내부 처리**: 현재 브랜치 감지 $\rightarrow$ 새로운 고유 세션 로그 `sessions/YYYY-MM-DD-HHMM.md` 자동 생성.

### 4. 사전 검증 게이트: `/gh-verify-issue [N]`
* **Agent Action**: `bun .agents/skills/gh-workflow/scripts/workflow.ts verify` 실행
* **내부 처리**: 
  1. Checklist 미완료 여부 검사
  2. `bun run check-types` 타입 체크 실행
  3. `CHANGELOG.md` [Unreleased]에 `#N` 등록 여부 확인
  4. DECISIONS 자가 일관성 확인
  5. Uncommitted 파일 검사
  * 검증 결과를 `STATUS.md` 내 Verification 섹션에 자동 갱신하고 Git 커밋.

### 5. PR 접수 (하이브리드): `/gh-pr-issue [N]`
* **Agent Action (2단계 프로세스)**:
  1. **초안 생성**: `bun .agents/skills/gh-workflow/scripts/workflow.ts pr` 실행 $\rightarrow$ `.gh-workflows/issue-N/pr_draft.md` 파일이 자동 조립됨.
  2. **본문 보강**: 에이전트가 `pr_draft.md` 파일을 읽고, 구현의 디테일과 뉘앙스를 마크다운 문장으로 고품질 보강 후 저장.
  3. **제출**: `bun .agents/skills/gh-workflow/scripts/workflow.ts pr --submit` 실행 $\rightarrow$ 원격 푸시 및 GitHub PR 생성(`gh pr create`).

### 6. 현황 조회: `/gh-status-issue [N]`
* **Agent Action**: `bun .agents/skills/gh-workflow/scripts/workflow.ts status` 실행
* **내부 처리**: 모든 이슈의 상태 및 진척률 요약 출력.
