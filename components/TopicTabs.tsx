"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Topic, PlainSection } from "@/lib/topics/types";
import BoldText from "./BoldText";
import VisualBlock from "./VisualBlock";
import PythonRunner from "./PythonRunner";
import CodeBlock from "./CodeBlock";

function extractTerms(plain?: PlainSection[]): string[] {
  const set = new Set<string>();
  for (const s of plain ?? []) {
    for (const p of s.paragraphs) {
      const matches = p.match(/\*\*([^*]+)\*\*/g);
      if (matches) for (const m of matches) set.add(m.slice(2, -2));
    }
  }
  return [...set];
}

function highlightTerms(text: string, terms: string[]): ReactNode[] {
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  let nodes: ReactNode[] = [text];
  for (const term of sorted) {
    const next: ReactNode[] = [];
    for (const node of nodes) {
      if (typeof node !== "string") {
        next.push(node);
        continue;
      }
      const parts = node.split(term);
      if (parts.length === 1) {
        next.push(node);
        continue;
      }
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) next.push(<strong key={`${term}-${i}`}>{term}</strong>);
        if (parts[i]) next.push(parts[i]);
      }
    }
    nodes = next;
  }
  return nodes;
}

export default function TopicTabs({ topic }: { topic: Topic }) {
  const terms = useMemo(() => extractTerms(topic.plain), [topic.plain]);

  const tabs = useMemo(() => {
    const list: { id: string; label: string }[] = [];
    if (topic.plain && topic.plain.length > 0) {
      list.push({ id: "plain", label: "쉽게 풀어쓰기" });
    }
    list.push({ id: "concepts", label: "핵심 개념" });
    if (topic.visuals && topic.visuals.length > 0) {
      list.push({ id: "visuals", label: "한눈에 보기" });
    }
    list.push({ id: "qa", label: "예상 면접 Q&A" });
    list.push({ id: "code", label: "코드 예제" });
    return list;
  }, [topic]);

  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    setActive(tabs.some((t) => t.id === fromHash) ? fromHash : tabs[0]?.id);
  }, [tabs]);

  const activate = (id: string) => {
    setActive(id);
    try {
      window.location.hash = id;
    } catch {
      /* ignore */
    }
  };

  const activeTab = active ?? tabs[0]?.id;

  return (
    <div className="topic-tabs">
      <div className="tab-bar" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            onClick={() => activate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-panel">
        {activeTab === "plain" && topic.plain && (
          <section className="section plain-section">
            {topic.plain.map((p, i) => (
              <div className="plain-block" key={i}>
                <h3>{p.title}</h3>
                {p.paragraphs.map((text, j) => (
                  <p key={j}>
                    <BoldText text={text} />
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}

        {activeTab === "concepts" && (
          <section className="section">
            {topic.concepts.map((c, i) => (
              <div className="concept" key={i}>
                <h3>{c.heading}</h3>
                {c.paragraphs.map((text, j) => (
                  <p key={j}>{highlightTerms(text, terms)}</p>
                ))}
                {c.keyPoints && (
                  <ul className="keypoints">
                    {c.keyPoints.map((k, j) => (
                      <li key={j}>{highlightTerms(k, terms)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {activeTab === "visuals" && topic.visuals && (
          <section className="section">
            <VisualBlock visuals={topic.visuals} />
          </section>
        )}

        {activeTab === "qa" && (
          <section className="section">
            {topic.qa.map((q, i) => (
              <div className="qa-item" key={i}>
                <div className="q">{q.question}</div>
                <div className="a">{q.answer}</div>
              </div>
            ))}
          </section>
        )}

        {activeTab === "code" && (
          <section className="section">
            {topic.code.map((ex, i) => (
              <div className="code-example" key={i}>
                <div className="code-title">{ex.title}</div>
                {ex.description && <p className="code-desc">{ex.description}</p>}
                {ex.language === "python" ? (
                  <PythonRunner code={ex.code} title={ex.title} />
                ) : (
                  <CodeBlock language={ex.language} code={ex.code} />
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}