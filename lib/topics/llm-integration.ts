import type { Topic } from "./types";

export const llmIntegration: Topic = {
  slug: "llm-integration",
  title: "LLM 연동",
  category: "지원자격",
  order: 5,
  summary:
    "대규모 언어 모델(LLM)을 API로 호출해 애플리케이션에 대화 기능을 붙이는 방법. 프롬프트 구조와 주요 파라미터, 임베딩/RAG 개념까지 기본기를 다지자.",
  concepts: [
    {
      heading: "LLM이란 무엇인가",
      paragraphs: [
        "LLM(Large Language Model, 대규모 언어 모델)은 방대한 양의 텍스트 데이터로 학습된 인공지능 모델이다. GPT, Claude, Llama 등이 대표적이다.",
        "LLM의 핵심 동작은 '다음 토큰 예측'이다. 토큰은 텍스트를 쪼갠 단위로, 모델은 지금까지의 문맥을 보고 가장 그럴듯한 다음 토큰을 하나씩 골라 문장을 완성해 나간다. 그래서 입력(프롬프트)을 어떻게 주느냐가 출력 품질을 크게 좌우한다.",
      ],
      keyPoints: [
        "LLM = 대규모 텍스트로 학습된 언어 모델",
        "동작 원리 = 다음 토큰 예측의 반복",
      ],
    },
    {
      heading: "LLM 연동의 기본 흐름",
      paragraphs: [
        "대부분의 LLM 서비스는 REST API를 제공하므로, 애플리케이션은 HTTP 요청으로 모델을 호출할 수 있다. 클라이언트(웹/앱/서버)가 프롬프트를 messages 형태로 만들어 API에 요청하면, API가 모델을 실행해 생성된 텍스트를 응답으로 돌려준다.",
        "즉 클라이언트 → API 요청 → 모델 실행 → 텍스트 응답 → 클라이언트 출력 순서다. API 호출은 네트워크를 거치고 응답 생성에 시간이 걸리므로, 프론트엔드에서는 로딩 상태를 보여주고 서버에서 호출하는 것이 일반적이다.",
      ],
      keyPoints: [
        "LLM 연동 = HTTP API 호출이 핵심",
        "응답 시간이 길 수 있으므로 비동기 처리와 로딩 UI가 필요하다",
      ],
    },
    {
      heading: "messages 구조와 역할",
      paragraphs: [
        "채팅 API는 대화를 messages 배열로 받는다. 각 메시지는 role(역할)과 content(내용)로 구성된다.",
        "system: 대화 전체에 적용되는 지시다. '너는 차분한 비서야', '항상 한국어로 답해' 같은 동작 규칙을 지정한다. 보통 대화 맨 앞에 한 번 둔다.",
        "user: 사용자의 입력이다. 실제 질문이나 요청을 담는다.",
        "assistant: 모델(어시스턴트)의 이전 답변이다. 대화 히스토리를 유지하려면 이전의 user/assistant 메시지를 함께 보내야 모델이 맥락을 기억한 채 이어서 답한다.",
      ],
      keyPoints: [
        "system = 규칙/지시, user = 입력, assistant = 모델의 이전 응답",
        "과거 대화를 보내지 않으면 모델은 이전 맥락을 모른다",
      ],
    },
    {
      heading: "주요 요청 파라미터",
      paragraphs: [
        "temperature는 출력의 무작위성을 조절하는 파라미터다. 0에 가까울수록 결정적이고 일관된 답변을, 1에 가까울수록 창의적이고 다양한 답변을 낸다. 사실성이 중요한 경우에는 낮은 값을 쓴다.",
        "max_tokens은 응답의 최대 길이(토큰 수)를 제한한다. 과도하게 긴 응답을 막고 비용과 시간을 통제할 때 쓴다. 그 외에 상위 확률 토큰만 고려하는 top_p, 여러 후보를 생성하는 n/seed 등도 서비스에 따라 제공된다.",
      ],
      keyPoints: [
        "temperature = 창의성(무작위성) 조절, 낮을수록 일관적",
        "max_tokens = 응답 최대 길이 제한",
      ],
    },
    {
      heading: "스트리밍, 임베딩과 RAG",
      paragraphs: [
        "스트리밍(stream)은 전체 응답을 기다리지 않고 생성되는 토큰을 실시간으로 받아 화면에 흘러가듯 보여주는 방식이다. 대화형 UI에서 체감 속도를 크게 높인다.",
        "임베딩(embedding)은 텍스트를 의미를 담은 숫자 벡터로 변환하는 기술이다. 비슷한 의미의 문장은 벡터 공간에서 가까운 위치에 놓인다.",
        "RAG(Retrieval-Augmented Generation, 검색 증강 생성)는 관련 문서를 먼저 검색해 그 내용을 프롬프트에 넣고 LLM이 답하게 하는 기법이다. 학습 데이터에 없는 최신 정보나 사내 문서를 다룰 때 쓰며, 임베딩으로 문서를 검색하는 것이 일반적이다.",
      ],
      keyPoints: [
        "스트리밍 = 토큰 단위 실시간 출력",
        "RAG = 외부 자료를 검색해 답변에 반영하는 기법",
      ],
    },
  ],
  qa: [
    {
      question: "LLM을 애플리케이션에 어떻게 연동하나요?",
      answer:
        "LLM 서비스가 제공하는 API를 HTTP로 호출합니다. 대화 내용을 messages 배열로 만들어 요청을 보내면 모델이 생성한 텍스트가 응답으로 돌아옵니다. 직접 HTTP로 보낼 수도 있고, OpenAI처럼 공식 SDK(라이브러리)를 쓰면 더 간단하게 호출할 수 있습니다.",
    },
    {
      question: "messages에서 system, user, assistant의 역할은 무엇인가요?",
      answer:
        "system은 대화 전체에 적용되는 지시로, 모델의 역할이나 답변 규칙을 정합니다. user는 사용자의 입력이고, assistant는 모델의 이전 응답입니다. 이전 대화를 맥락으로 유지하려면 과거 user/assistant 메시지를 함께 보내야 합니다.",
    },
    {
      question: "temperature 파라미터는 무엇인가요?",
      answer:
        "출력의 무작위성(창의성)을 조절하는 값입니다. 0에 가까울수록 항상 비슷하고 결정적인 답변을 내고, 높을수록 다양한 표현과 예상 밖의 답변을 냅니다. 공식 문서, 코드 생성처럼 정확성이 중요하면 낮은 temperature를 사용합니다.",
    },
    {
      question: "모델은 학습 이후의 최신 정보를 모르는데 어떻게 하나요?",
      answer:
        "가장 흔한 방법은 RAG입니다. 관련 문서를 검색해 그 내용을 프롬프트에 함께 넣으면 모델이 최신 정보를 근거로 답할 수 있습니다. 또는 검색 API 결과를 직접 프롬프트에 넣거나, 최신 데이터로 추가 학습(파인튜닝)할 수도 있습니다.",
    },
    {
      question: "임베딩과 RAG는 무엇인가요?",
      answer:
        "임베딩은 텍스트를 의미를 담은 숫자 벡터로 바꾸는 기술로, 비슷한 의미의 문장끼리 벡터 거리가 가까워집니다. RAG는 관련 문서를 먼저 검색해 그 내용을 프롬프트에 넣고 답변하게 하는 기법입니다. 사내 문서나 최신 정보처럼 모델이 모르는 내용을 다룰 때 유용합니다.",
    },
    {
      question: "API 키는 왜 필요한가요?",
      answer:
        "API 키는 요청을 보낸 사용자를 인증하고 사용량을 과금하기 위해 필요합니다. 요청 헤더의 Authorization에 키를 넣어 보냅니다. 키는 비밀 정보이므로 코드나 저장소에 노출하면 안 되고, 환경 변수나 서버의 비밀 관리 기능으로 보관하며 노출되면 즉시 폐기해야 합니다.",
    },
  ],
  code: [
    {
      title: "OpenAI 파이썬 라이브러리로 채팅 완성하기",
      description: "openai 라이브러리를 설치하고 기본 채팅 완성 요청을 보낸다.",
      runnable: false,
      language: "python",
      code: `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "안녕하세요, LLM 연동을 배우고 있어요."},
    ],
)

print(response.choices[0].message.content)`,
    },
    {
      title: "temperature와 max_tokens 지정하기",
      description: "정확한 답변이 필요하면 temperature를 낮추고, 응답 길이는 max_tokens로 제한한다.",
      runnable: false,
      language: "python",
      code: `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "너는 한국어로 답변하는 코딩 도우미다."},
        {"role": "user", "content": "이메일 주소 형식을 검증하는 파이썬 코드를 알려줘."},
    ],
    temperature=0.2,
    max_tokens=300,
)

print(response.choices[0].message.content)`,
    },
    {
      title: "curl로 HTTP 호출하기",
      description: "SDK 없이도 HTTP 요청으로 같은 API를 호출할 수 있다. 키는 환경 변수로 주입한다.",
      language: "bash",
      code: `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "한 문장으로 인사해 주세요."}
    ],
    "temperature": 0.7,
    "max_tokens": 100
  }'`,
    },
  ],
  visuals: [
    {
      kind: "steps",
      title: "LLM API 연동 흐름",
      steps: [
        { title: "API 키·클라이언트 준비", description: "OpenAI 등에서 키 발급, SDK/HTTP 클라이언트 준비" },
        { title: "메시지 구성", description: "시스템·유저·어시스턴트 메시지로 요청 본문 작성" },
        { title: "API 호출", description: "chat completions 등 엔드포인트로 요청 전송" },
        { title: "응답 파싱", description: "생성된 텍스트를 앱에서 사용 (스트리밍 가능)" }
      ]
    },
    {
      kind: "compare",
      title: "메시지 역할(messages)",
      leftHeader: "역할",
      rightHeader: "의미",
      rows: [
        { label: "system", left: "모델의 전반적인 지시·성격 부여", right: "예: '너는 친절한 비서다'" },
        { label: "user", left: "사용자의 입력", right: "예: '오늘 날씨 알려줘'" },
        { label: "assistant", left: "모델의 이전 응답 (대화 맥락 유지)", right: "예: '서울은 맑습니다'" }
      ]
    }
  ],
  plain: [
    {
      title: "대화 상대로 이해하는 LLM",
      paragraphs: [
        "**LLM(대규모 언어 모델)**은 글을 엄청나게 많이 읽어서 '다음에 올 단어'를 예측하는 대화 상대입니다. 질문을 보내면 그 예측을 이어 붙여 답변을 만듭니다.",
        "**연동(통합)**은 내 프로그램이 정해진 형식으로 그 상대에게 질문을 보내고 답변을 받아 쓰는 것입니다.",
        "모델은 학습된 시점까지의 지식만 알기 때문에, 최신 정보는 따로 제공해 주어야 합니다."
      ]
    },
    {
      title: "편지 형식으로 이해하는 메시지",
      paragraphs: [
        "**API**는 정해진 규칙으로 편지를 주고받는 것입니다. 요청 편지에 역할 구분을 담아 보냅니다.",
        "**system**은 상대에게 주는 역할 설명서이고, **user**는 내가 보내는 질문, **assistant**는 상대의 이전 답변입니다. assistant를 다시 보내면 대화를 이어 갑니다."
      ]
    },
    {
      title: "다이얼로 이해하는 파라미터",
      paragraphs: [
        "**temperature**는 답변의 창의성 다이얼입니다. 낮추면 정확하고 보수적으로, 높이면 다양하고 창의적으로 답합니다.",
        "**max_tokens**는 답변의 최대 길이 제한입니다. **스트리밍**은 답변이 완성되기를 기다리지 않고, 글자가 써지는 대로 받아 보는 것입니다(채팅처럼)."
      ]
    }
  ],
};