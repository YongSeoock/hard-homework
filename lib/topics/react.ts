import type { Topic } from "./types";

export const react: Topic = {
  slug: "react",
  title: "React",
  category: "우대사항",
  order: 10,
  summary:
    "UI를 컴포넌트로 나누고, state(상태)와 props(프로퍼티)로 화면을 관리하는 라이브러리. 면접에서 가장 많이 물어보는 state와 props부터 확실히 익히자.",
  concepts: [
    {
      heading: "컴포넌트(Component)",
      paragraphs: [
        "React는 화면을 '컴포넌트'라는 작은 단위로 나눠 만든다. 컴포넌트는 UI 조각을 재사용 가능하게 만든 단위다.",
        "현대 React는 '함수형 컴포넌트'가 표준이다. 컴포넌트는 props를 인자로 받아 JSX(마크업)를 반환하는 함수다.",
      ],
      keyPoints: [
        "컴포넌트 = props 입력 → JSX 출력",
        "DIV 구조 전체가 아니라 '조각' 단위로 만들고 조립한다",
      ],
    },
    {
      heading: "state (상태)",
      paragraphs: [
        "state는 컴포넌트 '내부에서 관리되는, 시간에 따라 변하는 데이터'다. 예: 카운터 숫자, 입력창의 텍스트, 체크박스의 on/off.",
        "state는 useState 훅으로 정의한다. useState는 [현재 값, 값을 바꾸는 함수]를 반환한다.",
        "핵심: setState(값을 바꾸는 함수)를 호출하면 React가 컴포넌트를 '다시 렌더링'해서 화면이 갱신된다.",
      ],
      keyPoints: [
        "state가 바뀌면 → 컴포넌트가 다시 렌더링됨",
        "일반 let 변수는 바뀌어도 화면이 갱신되지 않는다",
      ],
    },
    {
      heading: "props (프로퍼티)",
      paragraphs: [
        "props는 '부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터'다. 함수의 인자와 같다.",
        "props는 읽기 전용(불변)이다. 자식은 받은 props를 직접 수정할 수 없고, 수정이 필요하면 부모에게 이벤트(콜백)를 호출해서 알린다.",
        "데이터 흐름은 항상 위(부모)에서 아래(자식)로 흐른다 — 단방향 데이터 흐름.",
      ],
      keyPoints: [
        "props = 부모 → 자식, 읽기 전용",
        "state = 자기 자신 안에서 관리, 변경 가능",
      ],
    },
    {
      heading: "재렌더링과 가상 DOM",
      paragraphs: [
        "state가 바뀌면 컴포넌트 함수가 다시 실행되어 새로운 UI 트리를 만든다. 이전 트리와 비교해서(재조정, reconciliation) 바뀐 부분만 실제 DOM에 반영한다.",
        "React는 '가상 DOM'이라는 가벼운 JavaScript 객체 트리를 사용해 실제 DOM 조작을 최소화한다. 실제 DOM 조작은 느리기 때문이다.",
      ],
      keyPoints: [
        "가상 DOM: 실제 DOM의 가벼운 사본, 변경 최소화용",
        "컴포넌트가 '렌더링된다' = 함수가 실행되어 UI를 계산한다",
      ],
    },
    {
      heading: "Hooks와 useEffect",
      paragraphs: [
        "Hooks는 함수형 컴포넌트에서 상태와 부수 효과를 다루는 함수들이다. 대표적으로 useState(상태), useEffect(부수 효과), useRef(DOM/값 참조), useMemo(계산 최적화) 등이 있다.",
        "useEffect는 컴포넌트가 렌더링된 뒤에 실행되는 작업(예: 데이터 fetch, 구독)을 처리한다. 의존성 배열이 바뀔 때만 다시 실행된다.",
        "훅의 규칙: 반복문/조건문/중첩 함수 안에서 호출하지 말고, 컴포넌트 최상위에서만 호출한다.",
      ],
    },
  ],
  qa: [
    {
      question: "state가 무엇인가요?",
      answer:
        "컴포넌트 내부에서 관리되는, 시간에 따라 변하는 데이터입니다. useState로 정의하고, 값이 바뀌면 컴포넌트가 다시 렌더링되어 화면이 갱신됩니다. 예를 들어 카운터의 숫자, 입력값 같은 것이 state입니다.",
    },
    {
      question: "props가 무엇인가요?",
      answer:
        "부모 컴포넌트가 자식 컴포넌트에 전달하는 데이터입니다. 함수의 인자처럼 컴포넌트에 넘겨지며, 읽기 전용이라 자식 쪽에서 직접 수정할 수 없습니다. 데이터는 항상 부모에서 자식 방향으로 흐릅니다.",
    },
    {
      question: "state와 props의 차이는 무엇인가요?",
      answer:
        "state는 컴포넌트 자기 자신이 관리하면서 자유롭게 변경할 수 있는 데이터이고, props는 부모가 전달해 주는 읽기 전용 데이터입니다. state는 useState를 통해 만들고, props는 함수의 인자로 받습니다.",
    },
    {
      question: "useState를 쓰는 이유는 무엇인가요? 그냥 let 변수를 쓰면 안 되나요?",
      answer:
        "let 변수는 값이 바뀌어도 React가 렌더링을 다시 하지 않아 화면이 갱신되지 않습니다. useState의 setter를 호출하면 React가 재렌더링을 예약하므로, 화면에 반영되어야 하는 데이터는 반드시 state로 관리해야 합니다.",
    },
    {
      question: "리스트를 렌더링할 때 key는 왜 필요한가요?",
      answer:
        "key는 리스트의 각 항목을 고유하게 식별하는 값입니다. React가 항목의 추가/삭제/재정렬을 추적하고 DOM 재사용을 최적화하는 데 씁니다. key가 없거나 중복되면 예기치 않은 렌더링 버그가 발생할 수 있습니다.",
    },
    {
      question: "가상 DOM(Virtual DOM)이 무엇인가요?",
      answer:
        "실제 DOM의 가벼운 JavaScript 객체 사본입니다. state가 바뀌면 React는 먼저 가상 DOM에서 새 트리를 만든 뒤, 이전 가상 DOM과 비교해 변경된 부분만 실제 DOM에 반영합니다. 실제 DOM 조작은 비싸므로 이 과정으로 성능을 확보합니다.",
    },
    {
      question: "컴포넌트가 무엇인가요?",
      answer:
        "화면의 한 부분을 독립적으로 만든 재사용 가능한 단위입니다. 함수형 컴포넌트는 props를 받아 JSX를 반환하는 함수입니다. 예를 들어 버튼, 카드, 리스트 각각을 컴포넌트로 분리해 조합합니다.",
    },
  ],
  code: [
    {
      title: "useState로 카운터 만들기",
      description: "state의 핵심: setCount 호출 시 재렌더링되어 화면이 갱신된다.",
      language: "tsx",
      code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 값: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}`,
    },
    {
      title: "props로 부모 → 자식 데이터 전달",
      description: "부모 App이 자식 Greeting에게 name을 props로 넘긴다.",
      language: "tsx",
      code: `function Greeting(props: { name: string }) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}

export default function App() {
  return <Greeting name="지원자" />;
}`,
    },
    {
      title: "리스트 렌더링: map + key",
      description: "배열을 map으로 순회해 항목을 렌더링하고, 각 항목에 key를 준다.",
      language: "tsx",
      code: `const topics = ["state", "props", "hooks"];

export default function TopicList() {
  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic}>{topic}</li>
      ))}
    </ul>
  );
}`,
    },
    {
      title: "state 끌어올리기(Lifting State Up)",
      description: "값을 바꾸는 함수를 props로 내려주면 자식도 부모의 state를 갱신할 수 있다.",
      language: "tsx",
      code: `import { useState } from "react";

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <button onClick={() => onChange(!on)}>{on ? "ON" : "OFF"}</button>;
}

export default function Parent() {
  const [on, setOn] = useState(false);

  return (
    <div>
      <Toggle on={on} onChange={setOn} />
      <p>현재 상태: {on ? "켜짐" : "꺼짐"}</p>
    </div>
  );
}`,
    },
  ],
  visuals: [
    {
      kind: "compare",
      title: "state vs props",
      leftHeader: "state",
      rightHeader: "props",
      rows: [
        { label: "소유", left: "컴포넌트 자기 자신이 관리", right: "부모가 전달" },
        { label: "변경", left: "useState의 setter로 변경 가능", right: "읽기 전용(불변)" },
        { label: "역할", left: "시간에 따라 변하는 데이터", right: "컴포넌트에 전달하는 데이터" },
        { label: "예시", left: "카운터 숫자, 입력값, on/off", right: "name, items, onXxx 콜백" },
      ],
    },
    {
      kind: "steps",
      title: "React 렌더링 흐름",
      steps: [
        { title: "state 변경", description: "setState 호출 (버튼 클릭 등 이벤트에서)" },
        { title: "재렌더링 예약", description: "React가 컴포넌트 함수를 다시 실행" },
        { title: "가상 DOM 비교", description: "이전 트리와 새 트리를 비교(diff)" },
        { title: "실제 DOM 반영", description: "변경된 부분만 실제 DOM에 적용" },
      ],
    },
  ],
};