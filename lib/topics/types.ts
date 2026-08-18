export type CodeExample = {
  title: string;
  description?: string;
  language: string;
  code: string;
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
};