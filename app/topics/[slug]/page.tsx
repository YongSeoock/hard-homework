import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, getTopic } from "@/lib/topics";
import TopicTabs from "@/components/TopicTabs";

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

      <TopicTabs topic={topic} />

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