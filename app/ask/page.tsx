import Link from "next/link";
import type { Metadata } from "next";
import ChatBox from "@/components/ChatBox";

export const metadata: Metadata = {
  title: "질문하기 — 사미텍 면접 준비",
};

export default function AskPage() {
  return (
    <div className="container">
      <div className="topic-header">
        <div className="crumbs">
          <Link href="/">홈</Link> / 질문하기
        </div>
        <h1>질문하기 — 모르는 게 있으면 바로 물어보세요</h1>
        <p className="summary">
          사이트에 있는 예상 면접 Q&A · 핵심 개념 · 쉽게 풀어쓰기 자료에서 즉시 답을
          찾아드립니다. 외부 API를 호출하지 않는 100% 무료 기능입니다.
        </p>
      </div>

      <ChatBox />

      <nav className="footer-nav">
        <Link href="/">← 홈으로</Link>
        <Link href="/study-method">공부 방법 →</Link>
      </nav>
    </div>
  );
}