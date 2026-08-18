import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공부 방법 — 사미텍 면접 준비",
};

export default function StudyMethodPage() {
  return (
    <div className="container">
      <div className="topic-header">
        <div className="crumbs">
          <Link href="/">홈</Link> / 공부 방법
        </div>
        <h1>공부 방법 — 왜 이렇게 배우는가</h1>
        <p className="summary">
          "개발 지식이 전혀 없는 사람에게 설명하듯 배우는 것"이 옳은지, 그 근거와
          모레까지의 실천 계획을 정리했습니다.
        </p>
      </div>

      <section className="section">
        <h2>이 방식이 옳은가? — 검증 결론: 옳다</h2>
        <div className="qa-item">
          <div className="q">비전공자 눈높이 설명이 옳은가요?</div>
          <div className="a">
            <strong>네, 옳습니다.</strong> 다만 "쉽게 설명"은 목표가 아니라{" "}
            <strong>이해의 증명</strong>입니다. 근거는 아래와 같습니다.
          </div>
        </div>
        <div className="plain-block">
          <h3>근거 1 — 이해했는지 아는 유일한 방법은 "설명하기" (파인먼 기법)</h3>
          <p>
            물리학자 리처드 파인먼이 쓴 방법입니다. <strong>설명할 수 없으면
            이해한 것이 아니다.</strong> 내가 아는 단어를 그대로 반복해서 읽는 것은
            이해가 아니라 암기입니다. 초보자에게 설명해 보면, 설명이 막히는 순간이
            바로 "진짜로 모르는 부분"입니다.
          </p>
        </div>
        <div className="plain-block">
          <h3>근거 2 — 면접관이 묻는 방식과 정확히 같다</h3>
          <p>
            "state가 무엇인가요?" "props는요?" — 이 질문 자체가{" "}
            <strong>어려운 용어를 쉽게 설명할 수 있는지</strong>를 묻는 것입니다.
            면접관은 사전을 외웠는지가 아니라, 개념을 자기 말로 풀 수 있는지를
            봅니다. 초보자 설명 연습 = 면접 답변 연습입니다.
          </p>
        </div>
        <div className="plain-block">
          <h3>근거 3 — 기억은 "읽기"가 아니라 "꺼내 쓰기"에서 남는다 (능동적 회상)</h3>
          <p>
            연구 결과, 같은 시간을 써도 <strong>능동적 회상</strong>(눈을 감고
            설명해 보기)은 단순 반복 읽기보다 기억 유지율이 훨씬 높습니다.
            쉬운 버전을 읽은 뒤 <strong>소리 내어 설명해 보는 것</strong>이
            핵심입니다.
          </p>
        </div>
        <div className="plain-block">
          <h3>반대 후보와의 비교 (이렇게 하면 안 되는 이유)</h3>
          <p>
            "용어 정의를 그대로 외우기"는 짧게 보면 빠르지만, 면접에서{" "}
            <strong>우려·응용 질문</strong>("그럼 이 상황에선 어떻게 하죠?")에
            무너집니다. 암기한 답은 모르는 문제 하나에 깨지고, 이해한 답은 모든
            변형 문제에 재사용됩니다.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>모레(8/20)까지 2일 실천 계획</h2>
        <div className="visual-steps">
          <div className="visual-step">
            <span className="step-num">1</span>
            <div className="step-content">
              <strong>쉬운 버전 먼저 읽기</strong>
              <span>
                각 주제의 "쉽게 풀어쓰기"를 읽고, 볼드 처리된 용어를 만나면 그
                자리에서 멈추어 한 번 더 읽는다.
              </span>
            </div>
          </div>
          <div className="visual-step">
            <span className="step-num">2</span>
            <div className="step-content">
              <strong>용어 3개를 내 말로 설명</strong>
              <span>
                눈을 감고 "이건 ~라는 뜻이야"라고 소리 내어 설명. 막히면 다시
                읽는다. (하루 주제당 30분)
              </span>
            </div>
          </div>
          <div className="visual-step">
            <span className="step-num">3</span>
            <div className="step-content">
              <strong>Q&amp;A 2문제 답해보기</strong>
              <span>예상 면접 Q&amp;A를 먼저 스스로 답한 뒤 정답과 비교한다.</span>
            </div>
          </div>
          <div className="visual-step">
            <span className="step-num">4</span>
            <div className="step-content">
              <strong>코드 1개 실행해보기</strong>
              <span>
                Python 예제는 ▶ 실행 버튼으로 직접 돌려보고, 출력이 예상과 같은지
                확인한다.
              </span>
            </div>
          </div>
        </div>
        <p style={{ marginTop: "1rem" }}>
          우선순위: React(state/props) → 지원자격 8개 순서 → 우대사항 나머지.
          시간이 부족하면 각 주제의 <strong>쉽게 풀어쓰기 + Q&amp;A 2개</strong>만
          보고 넘어가도 됩니다.
        </p>
      </section>

      <nav className="footer-nav">
        <Link href="/">← 홈으로</Link>
        <span />
      </nav>
    </div>
  );
}