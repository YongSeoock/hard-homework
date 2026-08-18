import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, getTopic } from "@/lib/topics";
import CodeBlock from "@/components/CodeBlock";
import VisualBlock from "@/components/VisualBlock";
import PythonRunner from "@/components/PythonRunner";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return { title: "주제를 찾을 수 없습니다" };
  return { title: `${topic.title} — 사미텍 면접 준비` };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const index = topics.findIndex((t) => t.slug === topic.slug);
  const prev = index > 0 ? topics[index - 1] : null;
  const next = index < topics.length - 1 ? topics[index + 1] : null;

  return (
    <div className="container">
      <div className="topic-header">
        <div className="crumbs">
          <Link href="/">홈</Link> / {topic.title}
        </div>
        <h1>{topic.title}</h1>
        <span
          className={`tag ${
            topic.category === "지원자격" ? "tag-qualification" : "tag-preferred"
          }`}
        >
          {topic.category}
        </span>
        <p className="summary">{topic.summary}</p>
      </div>

      <section className="section">
        <h2>핵심 개념</h2>
        {topic.concepts.map((c, i) => (
          <div className="concept" key={i}>
            <h3>{c.heading}</h3>
            {c.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {c.keyPoints && (
              <ul className="keypoints">
                {c.keyPoints.map((k, j) => (
                  <li key={j}>{k}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {topic.visuals && topic.visuals.length > 0 && (
        <section className="section">
          <h2>한눈에 보기</h2>
          <VisualBlock visuals={topic.visuals} />
        </section>
      )}

      <section className="section">
        <h2>예상 면접 Q&amp;A</h2>
        {topic.qa.map((q, i) => (
          <div className="qa-item" key={i}>
            <div className="q">{q.question}</div>
            <div className="a">{q.answer}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>코드 예제</h2>
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

      <nav className="footer-nav">
        {prev ? (
          <Link href={`/topics/${prev.slug}`}>← {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/topics/${next.slug}`}>{next.title} →</Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}