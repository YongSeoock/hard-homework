"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { searchQuestions, type QaHit } from "@/lib/qa-search";

type ChatMsg = {
  role: "user" | "bot";
  text: string;
  hits?: QaHit[];
};

const KIND_LABEL: Record<QaHit["kind"], string> = {
  qa: "예상 면접 Q&A",
  concept: "핵심 개념",
  plain: "쉽게 풀어쓰기",
  visual: "한눈에 보기",
};

const GREETING = [
  "안녕하세요! 면접 준비 질문을 자유롭게 물어보세요.",
  "예: state가 뭐야? / props와 state의 차이 / 쿠버네티스란?",
  "사이트에 있는 자료에서 즉시 답을 찾아드립니다. (100% 무료 · API 호출 없음)",
].join("\n\n");

const NO_MATCH =
  "아쉽지만 자료에서 정확한 답을 찾지 못했어요.\n\n" +
  "질문을 다르게 표현해 보세요. 예: 'state가 뭐야?' 대신 'state가 무엇인가요?'\n" +
  "또는 아래에서 관련 주제를 직접 골라 확인해 보세요 👇";

function buildReply(q: string, hits: QaHit[]): ChatMsg {
  if (hits.length === 0) {
    return { role: "bot", text: NO_MATCH };
  }
  const [top] = hits;
  const label = KIND_LABEL[top.kind];
  const text =
    top.kind === "qa"
      ? `Q. ${top.title}\n\nA. ${top.body}`
      : `${top.title}\n\n${top.body}`;
  return {
    role: "bot",
    text: `${text}\n\n— 출처: ${top.topicTitle} 주제 · ${label}`,
    hits,
  };
}

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function send() {
    const q = input.trim();
    if (!q) return;
    const hits = searchQuestions(q, 3);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      buildReply(q, hits),
    ]);
    setInput("");
  }

  return (
    <div className="chat-box">
      <div className="chat-log" ref={logRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>
            <div>{m.text}</div>
            {m.hits && m.hits.length > 0 && (
              <div className="chat-sources">
                {m.hits.map((h, j) => (
                  <Link
                    key={j}
                    className="chat-source-chip"
                    href={`/topics/${h.topicSlug}#${h.tab}`}
                  >
                    {h.topicTitle} · {KIND_LABEL[h.kind]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-form">
        <textarea
          className="chat-input"
          rows={1}
          autoFocus
          placeholder="예: state와 props의 차이가 뭐야?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button className="chat-send" onClick={send}>
          질문
        </button>
      </div>
      <p className="chat-hint">
        무료 기능: 외부 API 없이 사이트에 있는 자료에서 즉시 검색합니다.
      </p>
    </div>
  );
}