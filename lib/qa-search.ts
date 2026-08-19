import { topics } from "./topics";

// ==========================================
// 무료 Q&A 검색 — 사이트 콘텐츠 기반 로컬 매칭
// 외부 API/네트워크 호출 0건, 100% 무료
// ==========================================

export type QaHitKind = "qa" | "concept" | "plain" | "visual";

export type QaHit = {
  topicSlug: string;
  topicTitle: string;
  kind: QaHitKind;
  /** 주제 페이지 탭 해시(딥링크) */
  tab: string;
  title: string;
  body: string;
  score: number;
};

type IndexEntry = {
  topicSlug: string;
  topicTitle: string;
  kind: QaHitKind;
  tab: string;
  title: string;
  body: string;
  titleReady: string;
  bodyReady: string;
  haystackNoSpace: string;
};

// 조사/기능어 — 검색 점수에 노이즈만 주는 토큰
const STOPWORDS = new Set([
  "은", "는", "이", "가", "을", "를", "들", "에", "에서", "의", "와", "과", "도", "만",
  "까지", "에게", "한테", "로", "으로", "란", "라는", "면", "하면", "해서", "라고",
  "같은", "어떤", "무엇", "뭐", "뭐야", "뭘", "뭔", "뭔지", "무엇을", "나", "요", "까",
  "수", "것", "거", "건", "게", "네", "져", "인지", "는지", "은지", "일까", "알려줘",
  "알려주", "설명해", "설명해줘", "말해", "말해줘", "해줘", "줘", "어떻게", "왜",
  "있니", "없니", "하는", "한다", "합니다", "입니다", "없다", "있다", "되는", "대해",
  "대해서", "관해", "관해서", "맞나", "맞는지", "틀린지", "물어볼", "하고싶어", "싶어",
  "궁금해", "궁금", "있어", "있나", "있나요", "없어", "알고싶어", "언제", "쓰나요",
  "쓸까", "쓸까요", "어디서", "누가", "뭐가", "뭐고", "어떤게", "어떤것", "가르쳐줘",
]);

// 사용자 표현(한국어 별칭 등) → 콘텐츠 표준 용어 확장
const ALIASES: Record<string, string[]> = {
  상태: ["state"],
  상태값: ["state"],
  스테이트: ["state"],
  키: ["key"],
  훅: ["hook", "hooks"],
  훅스: ["hooks"],
  프롭스: ["props"],
  프로퍼티: ["props"],
  컴포넌트: ["component"],
  리액트: ["react"],
  돔: ["dom"],
  가상돔: ["virtual", "dom"],
  쿠버네티스: ["kubernetes"],
  도커: ["docker"],
  파이썬: ["python"],
  파이선: ["python"],
  포스트그레: ["postgresql"],
  포스트그레스: ["postgresql"],
  프롬프트: ["prompt"],
  프롬프팅: ["prompt"],
  프롬프트엔지니어링: ["prompt", "engineering"],
  엔지니어링: ["engineering"],
  툴: ["tool", "tools"],
  함수호출: ["function", "calling"],
  함수콜링: ["function", "calling"],
  에이전트: ["agent"],
  벡터: ["vector"],
  임베딩: ["embedding"],
  파인튜닝: ["fine", "tuning"],
  스프링: ["spring"],
  자바: ["java"],
  노드: ["node"],
  넥스트: ["nextjs", "next"],
  넥스트제이에스: ["nextjs", "next"],
  nextjs: ["next"],
  엘엘엠: ["llm"],
  대형언어모델: ["llm", "large", "language"],
};

// 명사 뒤에 붙는 조사 제거 (예: state가 → state)
const PARTICLE =
  /(들에게서|에서|으로부터|으로|에게|한테|까지|들|이라|라는|이라는|은지|는지|인지|일까|과|와|를|을|이|가|은|는|의|도|만|란|로|나|요)$/;

function norm(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// 원형 + 조사 제거형 + 동의어 확장 — 원형을 유지해 '차이'같은 단어가 깨지지 않게 함
function formsFor(raw: string): string[] {
  const out = [raw];
  const stripped = raw.replace(PARTICLE, "");
  if (stripped !== raw && stripped.length >= 2) out.push(stripped);
  const aliased = ALIASES[stripped] ?? ALIASES[raw];
  if (aliased) out.push(...aliased);
  return out;
}

function tokenize(text: string): string[] {
  const out: string[] = [];
  for (const raw of norm(text).split(" ")) {
    if (!raw) continue;
    const stripped = raw.replace(PARTICLE, "");
    if (STOPWORDS.has(raw) || STOPWORDS.has(stripped)) continue;
    out.push(raw);
  }
  return out;
}

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];
  for (const t of topics) {
    for (const q of t.qa) {
      const body = q.answer;
      entries.push({
        topicSlug: t.slug,
        topicTitle: t.title,
        kind: "qa",
        tab: "qa",
        title: q.question,
        body,
        titleReady: norm(q.question),
        bodyReady: norm(body),
        haystackNoSpace: norm(`${q.question} ${body}`).replace(/\s+/g, ""),
      });
    }
    for (const c of t.concepts) {
      const body = [...c.paragraphs, ...(c.keyPoints ?? [])].join(" ");
      entries.push({
        topicSlug: t.slug,
        topicTitle: t.title,
        kind: "concept",
        tab: "concepts",
        title: c.heading,
        body,
        titleReady: norm(c.heading),
        bodyReady: norm(body),
        haystackNoSpace: norm(`${c.heading} ${body}`).replace(/\s+/g, ""),
      });
    }
    for (const p of t.plain ?? []) {
      const body = p.paragraphs.join(" ");
      entries.push({
        topicSlug: t.slug,
        topicTitle: t.title,
        kind: "plain",
        tab: "plain",
        title: p.title,
        body,
        titleReady: norm(p.title),
        bodyReady: norm(body),
        haystackNoSpace: norm(`${p.title} ${body}`).replace(/\s+/g, ""),
      });
    }
    for (const v of t.visuals ?? []) {
      const body =
        v.kind === "compare"
          ? v.rows.map((r) => `${r.label} ${r.left} ${r.right}`).join(" ")
          : v.steps.map((s) => `${s.title} ${s.description}`).join(" ");
      entries.push({
        topicSlug: t.slug,
        topicTitle: t.title,
        kind: "visual",
        tab: "visuals",
        title: v.title,
        body,
        titleReady: norm(v.title),
        bodyReady: norm(body),
        haystackNoSpace: norm(`${v.title} ${body}`).replace(/\s+/g, ""),
      });
    }
  }
  return entries;
}

const ENTRIES = buildIndex();
const BIGRAM_CAP = 8;
/** 토큰 매칭 없이 바이그램 노이즈만으로 올라온 허위 답을 걸러내는 최소 점수 */
const MIN_SCORE = 1.0;

function bigrams(text: string): Set<string> {
  const t = norm(text).replace(/\s+/g, "");
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

export function searchQuestions(query: string, limit = 3): QaHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const qNorm = norm(query);
  const qBigrams = bigrams(query);
  const scored: (IndexEntry & { score: number })[] = [];

  for (const e of ENTRIES) {
    let score = 0;
    let allMatched = true;
    for (const rawToken of tokens) {
      const forms = formsFor(rawToken);
      const titleHit = forms.some((f) => e.titleReady.includes(f));
      const bodyHit = !titleHit && forms.some((f) => e.bodyReady.includes(f));
      if (titleHit) score += 3;
      else if (bodyHit) score += 1.5;
      else allMatched = false;
    }
    if (allMatched && tokens.length > 1) score += 2;
    if (qNorm.length >= 2 && (e.titleReady.includes(qNorm) || e.bodyReady.includes(qNorm))) {
      score += 1;
    }

    let inter = 0;
    for (const b of qBigrams) {
      if (e.haystackNoSpace.includes(b)) {
        inter++;
        if (inter >= BIGRAM_CAP) break;
      }
    }
    score += inter * 0.2;

    if (score >= MIN_SCORE) scored.push({ ...e, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored
    .slice(0, limit)
    .map(({ titleReady, bodyReady, haystackNoSpace, ...hit }) => hit);
}