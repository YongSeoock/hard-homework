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

export type Topic = {
  slug: string;
  title: string;
  category: "지원자격" | "우대사항";
  order: number;
  summary: string;
  concepts: Concept[];
  qa: QA[];
  code: CodeExample[];
};