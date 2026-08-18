import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사미텍 면접 준비 — 기초 공부 자료",
  description:
    "사미텍 AI/SW 개발자 면접 준비를 위한 기초 공부 자료: Python, Next.js, PostgreSQL, Docker, LLM, Prompt Engineering, Tool/Function Calling, React, Java(Spring)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}