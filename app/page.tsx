import Link from "next/link";
import { topics } from "@/lib/topics";

export default function Home() {
  const qualification = topics.filter((t) => t.category === "지원자격");
  const preferred = topics.filter((t) => t.category === "우대사항");

  return (
    <div className="container">
      <div className="hero">
        <h1>사미텍 면접 준비 — 기초 공부 자료</h1>
<p className="sub">
          지원자격과 우대사항에 적힌 기술들의 핵심 개념 · 예상 면접 Q&amp;A · 코드 예제를
          한곳에 모았습니다.
        </p>
        <p className="sub" style={{ marginTop: "0.75rem" }}>
          👉 먼저{" "}
          <Link href="/study-method">
            <strong>공부 방법</strong>
          </Link>
          을 읽고 시작하세요. (비전공자 눈높이 설명이 왜 옳은지 + 2일 계획)
        </p>
      </div>

      <section className="category">
        <h2>
          지원자격 <span className="badge">우선순위 1</span>
        </h2>
        <div className="topic-grid">
          {qualification.map((t) => (
            <Link className="topic-card" href={`/topics/${t.slug}`} key={t.slug}>
              <span className="title">{t.title}</span>
              <span className="summary">{t.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="category">
        <h2>
          우대사항 <span className="badge">우선순위 2</span>
        </h2>
        <div className="topic-grid">
          {preferred.map((t) => (
            <Link className="topic-card" href={`/topics/${t.slug}`} key={t.slug}>
              <span className="title">{t.title}</span>
              <span className="summary">{t.summary}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}