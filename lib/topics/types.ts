export type CodeExample = {
  title: string;
  description?: string;
  language: string;
  code: string;
  /** false면 브라우저(Pyodide)에서 실행 불가한 예제(외부 API/키 필요) — 실행기 대신 안내+코드블록으로 표시 */
  runnable?: boolean;
};

export type Concept = {
  heading: string;
  paragraphs: string[];
  keyPoints?: string[];
};

export type QA = {
  question: string;
  answer: string;
};

export type CompareRow = {
  label: string;
  left: string;
  right: string;
};

export type VisualStep = {
  title: string;
  description: string;
};

export type Visual =
  | {
      kind: "compare";
      title: string;
      leftHeader: string;
      rightHeader: string;
      rows: CompareRow[];
    }
  | { kind: "steps"; title: string; steps: VisualStep[] };

export type PlainSection = {
  title: string;
  paragraphs: string[];
};

export type Topic = {
  slug: string;
  title: string;
  category: "지원자격" | "우대사항";
  order: number;
  summary: string;
  concepts: Concept[];
  qa: QA[];
  code: CodeExample[];
  visuals?: Visual[];
  plain?: PlainSection[];
};