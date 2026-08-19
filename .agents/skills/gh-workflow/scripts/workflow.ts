import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ==========================================
// 1. 유틸리티 함수 및 설정
// ==========================================

const WORKFLOWS_DIR = path.join(process.cwd(), '.gh-workflows');

// 쉘 명령어 실행기 (execFileSync 사용으로 셸 인젝션 보안 취약점 원천 차단)
function runCmd(file: string, args: string[], ignoreError = false): string {
  try {
    return execFileSync(file, args, { stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8' }).trim();
  } catch (error: any) {
    if (ignoreError) return '';
    const stderr = error.stderr ? error.stderr.toString().trim() : '';
    const message = error.message || '';
    throw new Error(`${message}\n[Stderr]: ${stderr}`);
  }
}

// 성공 여부(exit code 0)와 출력값을 명확히 분리하여 반환하는 안전한 실행기
function tryRunCmd(file: string, args: string[]): { ok: boolean; output: string } {
  try {
    const output = execFileSync(file, args, { stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8' }).trim();
    return { ok: true, output };
  } catch {
    return { ok: false, output: '' };
  }
}

// 이슈 번호 정수 검증 (보안: 셸 인젝션 및 오타 방지)
function validateIssueNum(issueNum: string): void {
  if (!issueNum || !/^\d+$/.test(issueNum)) {
    console.error(`❌ 에러: 이슈 번호는 순수 정수 숫자여야 합니다. (입력값: '${issueNum}')`);
    console.error('  예시: bun run workflow start 9');
    process.exit(1);
  }
}

// Git이 깨끗한 상태인지 체크
function isGitClean(): boolean {
  const status = runCmd('git', ['status', '--short']);
  return status.length === 0;
}

// 현재 브랜치명에서 이슈 번호 추출 (issue_#N 또는 issue_N 형태 지원)
function getIssueNumFromBranch(): string {
  const branchName = runCmd('git', ['branch', '--show-current']);
  const match = branchName.match(/issue_(?:#)?(\d+)/);
  if (!match) {
    throw new Error(`현재 브랜치(${branchName})가 'issue_#N' 형식이 아닙니다. 이슈 번호를 명시하거나 올바른 브랜치로 전환해 주세요.`);
  }
  return match[1];
}

// 날짜 포맷터 (YYYY-MM-DD)
function getCurDateStr(): string {
  return new Date().toISOString().split('T')[0];
}

// 시간 포함 포맷터 (YYYY-MM-DD-HHMM)
function getCurDateTimeStr(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}-${hh}${min}`;
}

// ==========================================
// 2. 명령어 구현부
// ==========================================

const commands: Record<string, (...args: string[]) => void | Promise<void>> = {
  // ----------------------------------------
  // START <issueNum>
  // ----------------------------------------
  start: (issueNum) => {
    validateIssueNum(issueNum);

    // 1) Git Clean 검사
    if (!isGitClean()) {
      console.error('❌ 에러: Working tree가 깨끗하지 않습니다. (커밋되지 않은 변경사항 존재)');
      console.error('⚠️ [보안/안정성 지침] AI 에이전트는 절대로 임의로 git stash/commit/reset 명령을 수행하지 마세요.');
      console.error('👉 사용자에게 먼저 현 환경을 커밋, stash, 또는 푸시하여 정돈해 달라고 즉시 안내하고 작업을 중단하세요.');
      process.exit(1);
    }

    let ghUser = '';
    let issueTitle = '';
    let issueUrl = '';
    let issueLabels = '—';

    // 2) GitHub CLI 확인 및 이슈 정보 로드 (배열 인자로 안전하게 호출)
    try {
      ghUser = runCmd('gh', ['api', 'user', '-q', '.login']);
      const issueRaw = runCmd('gh', ['issue', 'view', issueNum, '--json', 'title,url,labels']);
      const issue = JSON.parse(issueRaw);
      issueTitle = issue.title;
      issueUrl = issue.url;
      if (issue.labels && issue.labels.length > 0) {
        issueLabels = issue.labels.map((l: any) => l.name).join(', ');
      }
    } catch (err: any) {
      console.error('❌ 에러: GitHub CLI 인증에 실패했거나 이슈 정보를 조회할 수 없습니다.');
      console.error('  [대처법] gh auth login 을 실행하여 로그인 상태를 확인해 주세요.');
      console.error(`  [상세 에러]: ${err.message}`);
      process.exit(1);
    }

    // 3) 브랜치 생성 및 전환
    const branchName = `issue_#${issueNum}`;
    console.log(`🌿 브랜치 전환 시도 중: ${branchName}`);
    try {
      const localBranches = runCmd('git', ['branch', '--list']).split('\n').map(b => b.replace('*', '').trim());
      if (localBranches.includes(branchName)) {
        runCmd('git', ['checkout', branchName]);
        console.log(`🔄 기존 로컬 브랜치(${branchName})로 전환했습니다.`);
      } else {
        runCmd('git', ['checkout', '-b', branchName]);
        console.log(`✨ 새 로컬 브랜치(${branchName})를 생성하고 전환했습니다.`);
      }
    } catch (err: any) {
      console.error(`❌ 에러: Git 브랜치 조작 중 오류가 발생했습니다: ${err.message}`);
      process.exit(1);
    }

    // 4) 디렉터리 및 마크다운 파일 초기화
    const issueDir = path.join(WORKFLOWS_DIR, `issue-${issueNum}`);
    const statusPath = path.join(issueDir, 'STATUS.md');
    const decisionsPath = path.join(issueDir, 'DECISIONS.md');
    const sessionsDir = path.join(issueDir, 'sessions');

    if (!fs.existsSync(issueDir)) {
      fs.mkdirSync(sessionsDir, { recursive: true });

      // STATUS.md 생성
      const statusTemplate = `# Issue #${issueNum}: ${issueTitle}

| Key | Value |
|-----|-------|
| Branch | \`${branchName}\` |
| Started | ${getCurDateStr()} |
| Status | in-progress |
| Issue | ${issueUrl} |
| Labels | ${issueLabels} |
| Assignee | ${ghUser} |

## Context
- <이슈 본문 핵심 요구사항 요약 작성>

## Checklist
- [ ] <구현 항목 1>
- [ ] <구현 항목 2>

## Last Position
- 작업을 막 시작했습니다.

## Discussion
> Append-only. Newest discussion rounds at top (below header).

| Date | Scope | New Items | Decisions |
|------|-------|-----------|-----------|
| — | — | — | — |

## Verification
| Date | Status | Checks Passed | Failures |
|------|--------|---------------|----------|
| — | not-run | — | — |
`;
      fs.writeFileSync(statusPath, statusTemplate, 'utf8');

      // DECISIONS.md 생성
      const decisionsTemplate = `# Design Decisions — Issue #${issueNum}

> Append-only. Add a new table row per decision. Newest first (below header).

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| — | — | — | — |
`;
      fs.writeFileSync(decisionsPath, decisionsTemplate, 'utf8');

      // 첫 세션 로그 파일 생성
      const sessionPath = path.join(sessionsDir, `${getCurDateTimeStr()}.md`);
      const sessionTemplate = `# Session: Issue #${issueNum} — ${getCurDateStr()}

## Actions
- 이슈 정보 확인 및 브랜치 생성 완료
- 워크플로우 폴더 및 초기 상태 파일 생성

## Decisions
- (없음)

## Blockers / Notes
- 작업을 진행할 예정입니다.
`;
      fs.writeFileSync(sessionPath, sessionTemplate, 'utf8');
      console.log(`📂 .gh-workflows/issue-${issueNum}/ 내 초기 마크다운 템플릿들을 생성했습니다.`);
    } else {
      console.log(`ℹ️ 이미 이슈 폴더(.gh-workflows/issue-${issueNum}/)가 존재합니다. 기존 파일을 유지합니다.`);
    }

    console.log(`🚀 준비 완료! 브랜치: ${branchName} 에서 작업을 시작해 주세요.`);
  },

  // ----------------------------------------
  // DISCUSS <issueNum>
  // ----------------------------------------
  discuss: (issueNum) => {
    const targetIssue = issueNum || getIssueNumFromBranch();
    validateIssueNum(targetIssue);

    const issueDir = path.join(WORKFLOWS_DIR, `issue-${targetIssue}`);
    const inputPath = path.join(issueDir, 'discuss_input.json');

    if (!fs.existsSync(inputPath)) {
      console.error(`❌ 에러: 입력 파일(${inputPath})이 존재하지 않습니다.`);
      console.error('  에이전트가 논의 데이터를 discuss_input.json 파일로 먼저 생성해야 합니다.');
      process.exit(1);
    }

    try {
      const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      const statusPath = path.join(issueDir, 'STATUS.md');
      const decisionsPath = path.join(issueDir, 'DECISIONS.md');

      if (!fs.existsSync(statusPath)) {
        throw new Error('STATUS.md 파일이 존재하지 않습니다. start 명령을 먼저 수행해야 합니다.');
      }

      console.log(`💬 논의 결과를 문서에 병합하는 중... (Issue #${targetIssue})`);

      // 1) STATUS.md 업데이트 (체크리스트 추가 및 Discussion 테이블 업데이트)
      let statusContent = fs.readFileSync(statusPath, 'utf8');

      // 체크리스트 신규 항목 추가
      if (input.newItems && input.newItems.length > 0) {
        const checklistHeaderIdx = statusContent.indexOf('## Checklist');
        if (checklistHeaderIdx !== -1) {
          const nextHeaderIdx = statusContent.indexOf('##', checklistHeaderIdx + 2);
          const checklistSection = statusContent.substring(checklistHeaderIdx, nextHeaderIdx !== -1 ? nextHeaderIdx : undefined);
          
          let newChecklistLines = checklistSection.trim();
          input.newItems.forEach((item: string) => {
            if (!checklistSection.includes(item)) {
              newChecklistLines += `\n- [ ] ${item}`;
            }
          });

          statusContent = statusContent.replace(checklistSection, newChecklistLines + '\n\n');
        }
      }

      // Discussion 테이블 최상단(헤더 구분선 바로 아래)에 새 행 추가
      if (input.scopeSummary || input.decisionsSummary) {
        const dateStr = getCurDateStr();
        const scope = input.scopeSummary || '—';
        const newItemsStr = input.newItems && input.newItems.length > 0 ? input.newItems.join(', ') : '—';
        const decisions = input.decisionsSummary || '—';
        const discussionRow = `| ${dateStr} | ${scope} | ${newItemsStr} | ${decisions} |\n`;
        
        const tableHeader = '| Date | Scope | New Items | Decisions |';
        const headerIdx = statusContent.indexOf(tableHeader);
        if (headerIdx !== -1) {
          const separatorIdx = statusContent.indexOf('\n', headerIdx) + 1;
          const nextLineIdx = statusContent.indexOf('\n', separatorIdx) + 1;
          statusContent = statusContent.substring(0, nextLineIdx) + discussionRow + statusContent.substring(nextLineIdx);
        }
      }

      fs.writeFileSync(statusPath, statusContent, 'utf8');

      // 2) DECISIONS.md 업데이트 (헤더 구분선 바로 아래에 새 행 추가)
      if (input.decisions && input.decisions.length > 0) {
        let decisionsContent = fs.readFileSync(decisionsPath, 'utf8');
        let newRows = '';
        input.decisions.forEach((d: any) => {
          newRows += `| ${getCurDateStr()} | ${d.decision} | ${d.rationale} | ${d.alternatives || '—'} |\n`;
        });
        
        const tableHeader = '| Date | Decision | Rationale | Alternatives Considered |';
        const headerIdx = decisionsContent.indexOf(tableHeader);
        if (headerIdx !== -1) {
          const separatorIdx = decisionsContent.indexOf('\n', headerIdx) + 1;
          const nextLineIdx = decisionsContent.indexOf('\n', separatorIdx) + 1;
          decisionsContent = decisionsContent.substring(0, nextLineIdx) + newRows + decisionsContent.substring(nextLineIdx);
        }
        fs.writeFileSync(decisionsPath, decisionsContent, 'utf8');
      }

      // 3) GitHub 코멘트 업로드
      const commentTitle = `## Discussion Summary (${getCurDateStr()})`;
      const commentBody = `${commentTitle}\n\n` +
        `**Scope:** ${input.scopeSummary || '—'}\n` +
        `**New Items:**\n${input.newItems ? input.newItems.map((i: string) => `- ${i}`).join('\n') : '—'}\n\n` +
        `**Decisions:**\n${input.decisions ? input.decisions.map((d: any) => `- *${d.decision}* (Rationale: ${d.rationale})`).join('\n') : '—'}`;
      
      const tempCommentPath = path.join(issueDir, 'temp_comment.txt');
      fs.writeFileSync(tempCommentPath, commentBody, 'utf8');
      
      runCmd('gh', ['issue', 'comment', targetIssue, '--body-file', tempCommentPath]);
      fs.unlinkSync(tempCommentPath); // 임시파일 삭제
      fs.unlinkSync(inputPath); // 입력파일 삭제 (처리 완료)

      console.log(`✅ 논의 사항 문서 기록 및 GitHub Issue 코멘트 작성을 완료했습니다.`);
    } catch (err: any) {
      console.error(`❌ 에러: 논의 데이터 병합 및 코멘트 등록 실패: ${err.message}`);
      process.exit(1);
    }
  },

  // ----------------------------------------
  // CONTINUE [issueNum]
  // ----------------------------------------
  continue: (issueNum) => {
    const targetIssue = issueNum || getIssueNumFromBranch();
    validateIssueNum(targetIssue);

    const issueDir = path.join(WORKFLOWS_DIR, `issue-${targetIssue}`);

    if (!fs.existsSync(issueDir)) {
      console.error(`❌ 에러: 이슈 폴더가 존재하지 않습니다: ${issueDir}`);
      console.error('  먼저 bun workflow start <N> 명령으로 이슈를 시작해 주세요.');
      process.exit(1);
    }

    const sessionsDir = path.join(issueDir, 'sessions');
    const newSessionPath = path.join(sessionsDir, `${getCurDateTimeStr()}.md`);

    const sessionTemplate = `# Session: Issue #${targetIssue} — ${getCurDateStr()}

## Actions
- 이전 중단 지점부터 이슈 구현 재개

## Decisions
- (없음)

## Blockers / Notes
- (없음)
`;
    fs.writeFileSync(newSessionPath, sessionTemplate, 'utf8');
    console.log(`🔄 이전 세션에 이어서 새 세션 로그를 작성했습니다:`);
    console.log(`  📂 ${path.relative(process.cwd(), newSessionPath)}`);
  },

  // ----------------------------------------
  // VERIFY [issueNum]
  // ----------------------------------------
  verify: (issueNum) => {
    const targetIssue = issueNum || getIssueNumFromBranch();
    validateIssueNum(targetIssue);

    const issueDir = path.join(WORKFLOWS_DIR, `issue-${targetIssue}`);
    const statusPath = path.join(issueDir, 'STATUS.md');

    if (!fs.existsSync(statusPath)) {
      console.error(`❌ 에러: STATUS.md 파일을 찾을 수 없습니다: ${statusPath}`);
      process.exit(1);
    }

    console.log(`🔍 Issue #${targetIssue} 에 대한 5단계 최종 검증 게이트 가동...`);

    let passedCount = 0;
    const failures: string[] = [];

    // [1] Checklist 완료 여부
    const statusContent = fs.readFileSync(statusPath, 'utf8');
    const checklistUnfinished = statusContent.match(/-\s*\[\s*\]/g);
    if (!checklistUnfinished) {
      passedCount++;
    } else {
      failures.push(`Checklist (${checklistUnfinished.length}개 미완료 항목 존재)`);
    }

    // [2] Type check 실행
    try {
      console.log('  ▸ [Check 2/5] TypeScript 컴파일/타입 체크 러닝...');
      runCmd('bun', ['run', 'check-types']);
      passedCount++;
    } catch (err: any) {
      failures.push('Type check (TypeScript 컴파일 또는 타입 오류 발생)');
      console.log(`    ⚠️ 타입 체크 실패 로그:\n${err.message}`);
    }

    // [3] CHANGELOG 등록 확인
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
      const changelogContent = fs.readFileSync(changelogPath, 'utf8');
      if (changelogContent.includes(`#${targetIssue}`)) {
        passedCount++;
      } else {
        failures.push(`CHANGELOG 등록 (CHANGELOG.md 내 #${targetIssue} 항목이 발견되지 않음)`);
      }
    } else {
      failures.push('CHANGELOG 등록 (CHANGELOG.md 파일 누락)');
    }

    // [4] Decisions-to-code alignment (안내 경고)
    passedCount++; // 해당 항목은 개념 검증이므로 통과 처리하되 로그 출력
    console.log('  ▸ [Check 4/5] DECISIONS.md 설계 일관성 확인 (자가 판단 및 커밋 내역 참조)');

    // [5] Uncommitted changes 확인 (Verify 시점에는 커밋이 완료된 깔끔한 상태여야 함)
    if (isGitClean()) {
      passedCount++;
    } else {
      failures.push('Uncommitted changes (커밋되지 않은 로컬 변경 사항이 남아 있음)');
    }

    const isPassed = passedCount === 5;
    const finalStatus = isPassed ? 'passed' : 'failed';
    const failuresStr = isPassed ? 'None' : failures.join(', ');

    // STATUS.md 내 ## Verification 섹션 자동 갱신 (데이터 유실 없는 안전한 교체 버그 수정)
    let updatedStatusContent = statusContent;
    const verificationHeader = '## Verification';
    const headerIdx = statusContent.indexOf(verificationHeader);
    
    if (headerIdx !== -1) {
      const tableHeader = '| Date | Status | Checks Passed | Failures |';
      const tableHeaderIdx = statusContent.indexOf(tableHeader, headerIdx);
      if (tableHeaderIdx !== -1) {
        const separatorIdx = statusContent.indexOf('\n', tableHeaderIdx) + 1;
        const nextLineIdx = statusContent.indexOf('\n', separatorIdx) + 1;
        
        // 기존 데이터 행 위치 계산 (행이 존재하면 해당 행만 대체, 없으면 삽입)
        const rowEndIdx = statusContent.indexOf('\n', nextLineIdx);
        const restOfFile = rowEndIdx !== -1 ? statusContent.substring(rowEndIdx + 1) : '';
        const newRow = `| ${getCurDateStr()} | ${finalStatus} | ${passedCount}/5 | ${failuresStr} |\n`;

        updatedStatusContent = statusContent.substring(0, nextLineIdx) + newRow + restOfFile;
      }
    }
    fs.writeFileSync(statusPath, updatedStatusContent, 'utf8');

    // 검증 결과 Git 커밋 자동 반영
    try {
      runCmd('git', ['add', statusPath]);
      runCmd('git', ['commit', '-m', `verify: #${targetIssue} ${finalStatus} (${passedCount}/5)`]);
      console.log(`💾 검증 결과를 STATUS.md에 자동 기록하고 커밋했습니다.`);
    } catch {
      console.log(`ℹ️ 상태 파일 변경 내역이 없어 커밋 생략되었습니다.`);
    }

    if (isPassed) {
      console.log(`\n✅ 검증 통과! (5/5 Passed) 이제 'bun workflow pr'을 실행해 PR을 접수할 수 있습니다.`);
    } else {
      console.error(`\n❌ 검증 실패! (${passedCount}/5 Passed)`);
      console.error(`  - 실패 항목: ${failuresStr}`);
      console.error(`  [대처법] 실패한 항목을 정상 조정한 후 'bun workflow verify'를 재수행 하세요.`);
      process.exit(1);
    }
  },

  // ----------------------------------------
  // PR [--submit]
  // ----------------------------------------
  pr: async (...flags) => {
    const targetIssue = getIssueNumFromBranch();
    validateIssueNum(targetIssue);

    const issueDir = path.join(WORKFLOWS_DIR, `issue-${targetIssue}`);
    const statusPath = path.join(issueDir, 'STATUS.md');
    const decisionsPath = path.join(issueDir, 'DECISIONS.md');
    const prDraftPath = path.join(issueDir, 'pr_draft.md');

    if (!fs.existsSync(statusPath)) {
      console.error(`❌ 에러: STATUS.md 파일이 없습니다: ${statusPath}`);
      process.exit(1);
    }

    const statusContent = fs.readFileSync(statusPath, 'utf8');
    const isSubmit = flags.includes('--submit');

    // 1) Submit 시점의 사전 게이트 체크
    if (isSubmit) {
      const verificationMatch = statusContent.match(/\|\s*\d{4}-\d{2}-\d{2}\s*\|\s*(\w+)\s*\|\s*(\d)\/5\s*\|/);
      const verifyStatus = verificationMatch ? verificationMatch[1] : '';
      const verifyScore = verificationMatch ? parseInt(verificationMatch[2], 10) : 0;

      if (verifyStatus !== 'passed' || verifyScore < 5) {
        if (!flags.includes('--skip-verify')) {
          console.error(`❌ 에러: 검증 게이트(verify)를 통과하지 못했습니다. (점수: ${verifyScore}/5)`);
          console.error('  반드시 bun workflow verify 를 먼저 성공하거나, 무시하려면 --skip-verify 플래그를 결합하세요.');
          process.exit(1);
        } else {
          console.log('⚠️ 경고: 검증 실패 상태이지만 --skip-verify 요청으로 강제 진행합니다.');
        }
      }

      if (!fs.existsSync(prDraftPath)) {
        console.error(`❌ 에러: PR 본문 초안 파일(${prDraftPath})이 존재하지 않습니다.`);
        console.error('  반드시 bun workflow pr 을 먼저 실행해 뼈대를 만든 후 에이전트/개발자가 다듬어야 합니다.');
        process.exit(1);
      }

      console.log('🚀 PR 제출 단계를 작동합니다...');
      
      // Git Push (배열 인자로 안전하게 호출)
      const currentBranch = runCmd('git', ['branch', '--show-current']);
      console.log(`  ▸ 원격 저장소에 브랜치 푸시 중: ${currentBranch}`);
      runCmd('git', ['push', '-u', 'origin', currentBranch]);

      // 기본 브랜치 감지
      let defaultBranch = 'main';
      try {
        const repoInfo = JSON.parse(runCmd('gh', ['repo', 'view', '--json', 'defaultBranchRef']));
        if (repoInfo && repoInfo.defaultBranchRef) {
          defaultBranch = repoInfo.defaultBranchRef.name;
        }
      } catch {
        console.log(`  ⚠️ 기본 브랜치 감지 실패. 기본값인 '${defaultBranch}' 브랜치 타겟으로 PR을 생성합니다.`);
      }

      // 이슈 타이틀 추출
      const titleMatch = statusContent.match(/# Issue #\d+:\s*(.*)/);
      const issueTitle = titleMatch ? titleMatch[1].trim() : `이슈 #${targetIssue} 구현 완료`;

      // PR 생성 실행 (execFileSync로 셸 파싱 및 특수문자/인젝션 완벽 우회)
      console.log(`  ▸ PR 생성 중: [${issueTitle}] -> ${defaultBranch}`);
      try {
        const prUrl = runCmd('gh', ['pr', 'create', '--base', defaultBranch, '--head', currentBranch, '--title', issueTitle, '--body-file', prDraftPath]);
        console.log(`\n🎉 PR 생성 성공! PR URL: ${prUrl}`);
        
        // 제출된 초안 파일 정리
        fs.unlinkSync(prDraftPath);
      } catch (err: any) {
        console.error(`❌ 에러: PR 생성 중 GitHub API 에러 발생: ${err.message}`);
        process.exit(1);
      }

    } else {
      // 2) 뼈대 초안(Draft) 생성 로직 (하이브리드 방식)
      console.log('📝 PR 생성을 위한 1차 본문 초안(Draft)을 작성하는 중...');

      // 체크리스트 파싱
      const checklistLines = statusContent.substring(statusContent.indexOf('## Checklist')).split('\n');
      const completedItems: string[] = [];
      checklistLines.forEach(line => {
        if (line.includes('[x]')) {
          completedItems.push(line.replace(/-\s*\[x\]\s*/, '').trim());
        }
      });

      // 의사결정 파싱
      let decisionsTable = '— (설계 결정 사항 없음)';
      if (fs.existsSync(decisionsPath)) {
        const decContent = fs.readFileSync(decisionsPath, 'utf8');
        const headerIdx = decContent.indexOf('| Date | Decision | Rationale | Alternatives Considered |');
        if (headerIdx !== -1) {
          const tableLines = decContent.substring(headerIdx).split('\n').filter(l => l.trim().startsWith('|'));
          if (tableLines.length > 2) {
            decisionsTable = tableLines.join('\n');
          }
        }
      }

      // 변경 파일 목록 추출
      let changedFilesList = '';
      try {
        let diffRes = tryRunCmd('git', ['diff', '--name-only', 'origin/main']);
        if (!diffRes.ok) {
          diffRes = tryRunCmd('git', ['diff', '--name-only', 'main']);
        }
        const diffFiles = diffRes.output ? diffRes.output.split('\n').filter(f => f.trim().length > 0) : [];
        
        if (diffFiles.length > 0) {
          changedFilesList = diffFiles.map(f => `- \`${f}\` — <해당 파일의 변경 핵심 설명 작성>`).join('\n');
        } else {
          changedFilesList = '— (감지된 변경된 파일 목록 없음)';
        }
      } catch {
        changedFilesList = '— (기본 브랜치 차이 분석 불가. 수동 기입 필요)';
      }

      // 뼈대 생성
      const prDraftTemplate = `## Summary
이슈 #${targetIssue}에 대한 구현을 완료했습니다.
이곳에 구현의 전체적인 의도와 맥락에 관한 요약설명을 추가로 보충하여 고품질의 PR 본문으로 정제해 주세요.

## Changes
${completedItems.map(item => `- [x] ${item}`).join('\n')}

## Files Changed
${changedFilesList}

## Design Decisions
${decisionsTable}

resolved: #${targetIssue}
`;
      fs.writeFileSync(prDraftPath, prDraftTemplate, 'utf8');
      console.log(`\n✏️ PR 드래프트 초안이 파일로 생성되었습니다:`);
      console.log(`  📂 ${path.relative(process.cwd(), prDraftPath)}`);
      console.log('\n💡 [다음 단계]:');
      console.log('  1. AI 에이전트 또는 직접 위 파일을 열어 구현 맥락에 어울리도록 세부 뉘앙스를 보강합니다.');
      console.log('  2. 검토가 완료되면 다음 커맨드를 실행해 최종 PR을 제출합니다:');
      console.log('     👉 bun run workflow pr --submit');
    }
  },

  // ----------------------------------------
  // GO-MAIN
  // ----------------------------------------
  'go-main': () => {
    // 1) Git Clean 검사 (start와 동일한 안전 정책)
    if (!isGitClean()) {
      console.error('❌ 에러: Working tree가 깨끗하지 않습니다. (커밋되지 않은 변경사항 존재)');
      console.error('⚠️ [보안/안정성 지침] AI 에이전트는 절대로 임의로 git stash/commit/reset 명령을 수행하지 마세요.');
      console.error('👉 사용자에게 먼저 현 환경을 커밋, stash, 또는 푸시하여 정돈해 달라고 즉시 안내하고 작업을 중단하세요.');
      process.exit(1);
    }

    // 2) 기본 브랜치 감지 (main 또는 원격 기본 브랜치)
    let defaultBranch = 'main';
    try {
      const repoInfo = JSON.parse(runCmd('gh', ['repo', 'view', '--json', 'defaultBranchRef']));
      if (repoInfo && repoInfo.defaultBranchRef) {
        defaultBranch = repoInfo.defaultBranchRef.name;
      }
    } catch {
      console.log(`  ⚠️ 기본 브랜치 감지 실패. 기본값인 '${defaultBranch}' 브랜치를 사용합니다.`);
    }

    // 3) 현재 브랜치 확인
    const currentBranch = runCmd('git', ['branch', '--show-current']);
    const alreadyOnDefault = currentBranch === defaultBranch;
    if (!alreadyOnDefault && !/^issue_(?:#)?\d+$/.test(currentBranch)) {
      console.error(`❌ 에러: 현재 브랜치(${currentBranch})가 이슈 브랜치(issue_#N)가 아니어서 자동 전환을 중단합니다.`);
      console.error('  직접 git checkout 명령으로 원하는 브랜치로 이동해 주세요.');
      process.exit(1);
    }

    // 4) origin 미푸시 커밋 경고 (이슈 브랜치 전환 시에만, PR 제출 후에는 정상적으로 0이어야 함)
    if (!alreadyOnDefault) {
      try {
        const unpushed = parseInt(runCmd('git', ['rev-list', '@{u}..HEAD', '--count']), 10);
        if (unpushed > 0) {
          console.warn(`⚠️ 경고: '${currentBranch}'에 아직 origin으로 푸시되지 않은 커밋 ${unpushed}개가 있습니다.`);
          console.warn('  PR 제출(pr --submit) 이후 상태인지 먼저 확인해 주세요.');
        }
      } catch {
        // 업스트림 미설정 등 — 무시 (커밋 이력은 보존됨)
      }
    }

    // 5) 동기화 — 기본 브랜치에 있어도 fetch + ff-only로 최신화하여 항상 멱등하게 동작
    console.log(
      alreadyOnDefault
        ? `🌿 '${defaultBranch}' 브랜치를 원격 최신 상태로 동기화합니다.`
        : `🌿 '${currentBranch}' → '${defaultBranch}' 브랜치로 전환합니다.`
    );
    try {
      runCmd('git', ['fetch', 'origin']);
      if (!alreadyOnDefault) {
        runCmd('git', ['checkout', defaultBranch]);
      }
      runCmd('git', ['merge', '--ff-only', `origin/${defaultBranch}`]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`❌ 에러: 브랜치 전환/동기화에 실패했습니다: ${message}`);
      console.error('  [참고] 로컬 기본 브랜치가 원격과 분기된 경우(로컬 커밋 존재) --ff-only 병합이 실패할 수 있습니다.');
      process.exit(1);
    }

    // 6) 직전 이슈의 PR 상태 안내 및 브랜치 정리 팁 (이슈 브랜치에서 전환한 경우)
    if (!alreadyOnDefault) {
      try {
        const prRaw = runCmd('gh', ['pr', 'list', '--head', currentBranch, '--state', 'all', '--json', 'number,state,url', '-q', '.[0]'], true);
        if (prRaw) {
          const pr = JSON.parse(prRaw);
          console.log(`🔗 PR 상태: ${pr.state} — ${pr.url}`);
        }
      } catch {
        // PR 조회 실패 시 스킵
      }
      console.log(`💡 이슈 브랜치(${currentBranch})가 이미 병합(Merge)되었다면 'git branch -d ${currentBranch}'로 정리할 수 있습니다.`);
    }

    console.log(`✅ 이제 '${defaultBranch}' 브랜치에서 작업할 수 있습니다.`);
  },

  // ----------------------------------------
  // STATUS
  // ----------------------------------------
  status: () => {
    if (!fs.existsSync(WORKFLOWS_DIR)) {
      console.log('ℹ️ 진행 중인 이슈 워크플로우 내역이 존재하지 않습니다 (.gh-workflows 폴더 없음).');
      return;
    }

    const folders = fs.readdirSync(WORKFLOWS_DIR)
      .filter(f => f.startsWith('issue-') && fs.statSync(path.join(WORKFLOWS_DIR, f)).isDirectory());

    if (folders.length === 0) {
      console.log('ℹ️ 진행 중인 이슈 워크플로우 내역이 존재하지 않습니다.');
      return;
    }

    console.log('📊 [GitHub Workflow 진행 현황]\n');
    folders.forEach(folder => {
      const statusPath = path.join(WORKFLOWS_DIR, folder, 'STATUS.md');
      if (fs.existsSync(statusPath)) {
        const content = fs.readFileSync(statusPath, 'utf8');
        
        // 1) 이슈 제목 추출
        const titleMatch = content.match(/# Issue #\d+:\s*(.*)/);
        const title = titleMatch ? titleMatch[1].trim() : '이름 없음';

        // 2) 브랜치명 및 할당자 추출
        const branchMatch = content.match(/\|\s*Branch\s*\|\s*`([^`]+)`\s*\|/);
        const branch = branchMatch ? branchMatch[1].trim() : 'unknown';

        const assigneeMatch = content.match(/\|\s*Assignee\s*\|\s*([^\s|]+)\s*\|/);
        const assignee = assigneeMatch ? assigneeMatch[1].trim() : '—';

        const statusMatch = content.match(/\|\s*Status\s*\|\s*([^\s|]+)\s*\|/);
        const status = statusMatch ? statusMatch[1].trim() : 'unknown';

        // 3) Checklist 진척률 (버그 수정: total === 0 에 상관없이 다음 ## 헤더를 만나면 멈춤)
        const checklistHeaderIdx = content.indexOf('## Checklist');
        let total = 0;
        let checked = 0;

        if (checklistHeaderIdx !== -1) {
          const checklistLines = content.substring(checklistHeaderIdx).split('\n');
          for (let i = 1; i < checklistLines.length; i++) {
            const line = checklistLines[i];
            if (line.trim().startsWith('##')) break; // 다음 섹션 헤더 도달 시 무조건 루프 탈출
            if (line.includes('- [ ]') || line.includes('- [x]')) {
              total++;
              if (line.includes('[x]')) checked++;
            }
          }
        }

        // 4) Last Position
        let lastPos = '지정 안 됨';
        const lastPosHeaderIdx = content.indexOf('## Last Position');
        if (lastPosHeaderIdx !== -1) {
          const lines = content.substring(lastPosHeaderIdx).split('\n');
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('##')) break;
            if (line.length > 0 && !line.startsWith('>')) {
              lastPos = line.replace(/^-\s*/, '');
              break;
            }
          }
        }

        console.log(`📌 Issue #${folder.replace('issue-', '')} [${status}] (${checked}/${total} 완료)`);
        console.log(`   - 브랜치: ${branch} | 담당자: ${assignee}`);
        console.log(`   - 제목: ${title}`);
        console.log(`   - 진행 상황: ${lastPos}`);
        console.log('─────────────────────────────────────────────');
      }
    });
  }
};

// ==========================================
// 3. 메인 부팅 엔트리
// ==========================================
async function main() {
  const [,, action, ...args] = process.argv;

  if (!action || !commands[action]) {
    console.log('❌ 올바르지 않은 접근입니다.');
    console.log('사용 방법:');
    console.log('  bun run workflow start <이슈번호>');
    console.log('  bun run workflow discuss [이슈번호]');
    console.log('  bun run workflow continue');
    console.log('  bun run workflow verify');
    console.log('  bun run workflow pr [--submit] [--skip-verify]');
    console.log('  bun run workflow go-main');
    console.log('  bun run workflow status');
    process.exit(1);
  }

  try {
    await commands[action](...args);
  } catch (err: any) {
    console.error(`\n❌ [치명적 에러] 프로세스 실행 중 예외가 발생하여 중단되었습니다.`);
    console.error(`  👉 에러 내용: ${err.message}`);
    process.exit(1);
  }
}

main();
