import type { Topic } from "./types";

export const functionCalling: Topic = {
  slug: "function-calling",
  title: "Function Calling",
  category: "지원자격",
  order: 8,
  summary:
    "모델이 스스로 '어떤 함수를, 어떤 인자로 호출할지'를 JSON으로 결정해 알려주는 메커니즘. 모델은 실행하지 않고 우리 코드가 실행한다는 핵심을 확실히 익히자.",
  concepts: [
    {
      heading: "Function Calling이란 무엇인가",
      paragraphs: [
        "Function Calling은 언어 모델이 사용자의 요청을 보고 '어떤 함수를, 어떤 인자로 호출해야 하는지'를 스스로 결정해 알려주는 메커니즘이다. 모델이 함수를 직접 실행하는 것이 아니라, 호출에 필요한 함수명과 JSON 형태의 인자를 만들어 반환한다.",
        "예를 들어 '서울 오늘 날씨 어때?'라는 질문에 모델은 get_weather(city=\"서울\")이라는 호출 정보를 돌려준다. 실제 날씨 데이터를 가져와 최종 답변을 만드는 것은 우리 애플리케이션의 몫이다.",
      ],
      keyPoints: [
        "모델의 출력 = 함수명 + JSON 인자 → '호출 요청'",
        "실행 주체는 항상 애플리케이션(우리 코드)",
      ],
    },
    {
      heading: "함수 정의 스키마",
      paragraphs: [
        "모델이 함수를 호출하려면 애플리케이션이 호출 가능한 함수들의 정보를 먼저 알려줘야 한다. 함수 이름, 설명(description), 매개변수(parameters)를 정의해 tools 파라미터로 전달한다.",
        "각 필드는 역할이 명확하다. name은 호출 대상 함수를 식별하고, description은 모델이 언제 이 함수를 써야 하는지 판단하는 근거가 되며, parameters는 함수에 넘길 인자의 구조(필드, 타입, 필수 여부)를 기술한다. 매개변수 정의는 JSON Schema 형식을 따른다.",
      ],
      keyPoints: [
        "스키마가 정확하고 자세할수록 모델의 호출 선택도 정확해진다",
        "parameters는 JSON Schema 문법을 따른다 (type, properties, required)",
      ],
    },
    {
      heading: "전체 호출 흐름",
      paragraphs: [
        "Function Calling은 5단계로 진행된다. (1) 애플리케이션이 함수 스키마를 tools 파라미터로 모델에 전달한다. (2) 모델이 함수 호출이 필요하다고 판단하면 tool_calls를 반환한다. (3) 애플리케이션이 해당 함수를 실제로 실행한다. (4) 실행 결과를 tool 역할의 메시지로 모델에 재전송한다. (5) 모델이 결과를 바탕으로 최종 답변을 생성한다.",
        "이처럼 함수 호출 지점에서 한 번 끊기고, 결과를 다시 넣어 한 번 더 호출하는 구조라서 여러 번의 왕복(round trip)으로 동작한다. tool_calls 없이 바로 답변이 오면 함수 실행 없이 그대로 사용자에게 전달하면 된다.",
      ],
      keyPoints: [
        "1회 호출로 끝나지 않는다 — 결과 피드백이 필요한 2회차 호출",
        "tool_calls가 없으면 모델이 바로 일반 답변을 반환한다",
      ],
    },
    {
      heading: "실전 예시: 날씨 조회와 DB 검색",
      paragraphs: [
        "대표적인 쓰임은 실시간 정보 조회다. 날씨, 환율, 주가처럼 모델 학습 시점 이후의 데이터를 함수 호출로 가져와 답변할 수 있다.",
        "또 하나는 DB/검색 연동이다. 사용자가 '가격이 5만 원 이하인 러닝화'를 물으면 모델은 search_products(price_max=50000, category=\"러닝화\") 같은 호출을 만들고, 우리 코드가 실제 쿼리를 실행한 결과로 답변을 만든다. 계산, 데이터 검증, 외부 API 연동 모두 같은 패턴으로 확장된다.",
      ],
      keyPoints: [
        "최신 정보가 필요한 질문 → 함수 호출로 해결",
        "결과를 훈련 데이터가 아닌 실측값으로 사용해 허위 정보(환각)를 줄인다",
      ],
    },
    {
      heading: "tool과 Function Calling의 관계",
      paragraphs: [
        "tool은 'LLM이 사용할 수 있는 도구'를 뜻하는 일반적인 개념이다(웹 검색, 코드 실행, 파일 읽기 등이 tool이 될 수 있다). Function Calling은 그중에서도 '함수나 API 호출'을 다루는 구체적인 메커니즘이다.",
        "즉, Function Calling은 tool의 한 종류다. OpenAI API처럼 function 타입의 tool에 스키마를 담아 보내면, 모델이 그 tool을 호출하도록 만드는 과정이 곧 Function Calling이다.",
      ],
      keyPoints: [
        "tool(넓은 개념) > Function Calling(구체적 구현 방식)",
      ],
    },
  ],
  qa: [
    {
      question: "Function Calling의 동작 순서를 설명해 보세요.",
      answer:
        "총 5단계입니다. (1) 애플리케이션이 함수 스키마를 tools 파라미터로 모델에 전달하고, (2) 모델이 사용자 질문을 보고 함수 호출이 필요하다고 판단하면 tool_calls로 함수명과 JSON 인자를 반환합니다. (3) 애플리케이션이 그 함수를 실제로 실행하고, (4) 실행 결과를 role이 tool인 메시지로 만들어 모델에 다시 보냅니다. (5) 모델이 그 결과를 반영해 최종 답변을 생성하고, 애플리케이션이 이를 사용자에게 보여줍니다.",
    },
    {
      question: "Function Calling은 왜 필요한가요?",
      answer:
        "모델은 학습된 지식만으로 답변할 뿐, 외부 API를 직접 호출하거나 DB를 조회할 수 없기 때문입니다. 또 훈련 시점 이후의 최신 정보는 알 수 없습니다. Function Calling을 쓰면 모델은 '어떤 함수를 불러야 하는지'만 결정하고 실행은 우리 코드가 하므로, 최신 데이터를 가져와 정확한 답변을 만들 수 있습니다.",
    },
    {
      question: "tools 파라미터에는 무엇을 넘기나요?",
      answer:
        "호출 가능한 함수들의 정의를 담은 배열을 넘깁니다. 각 함수 정의는 type(\"function\")과 function 객체로 구성되고, function 객체 안에 name(함수 이름), description(함수 설명), parameters(JSON Schema 형식의 매개변수 정의)가 들어갑니다. 하나 이상의 함수를 정의해서 넘길 수 있고, 넘긴 함수 중에서 모델이 적절한 함수를 선택합니다.",
    },
    {
      question: "모델이 함수를 실제로 실행하나요?",
      answer:
        "아니요. 모델은 함수를 직접 실행하지 못합니다. 모델이 할 일은 함수명과 인자를 JSON으로 만들어 tool_calls로 반환하는 것뿐이고, 실제 실행은 애플리케이션 코드가 담당합니다. 실행한 결과를 다시 모델에 전달해야 최종 답변을 얻을 수 있습니다.",
    },
    {
      question: "tool과 Function Calling의 차이는 무엇인가요?",
      answer:
        "tool은 LLM이 사용할 수 있는 도구 전반을 가리키는 넓은 개념입니다(웹 검색, 코드 실행 등). Function Calling은 그중에서 함수나 API 호출을 다루는 구체적인 메커니즘입니다. API에서 function 타입의 tool에 스키마를 실어 보내고, 모델이 그 함수를 호출하도록 만드는 과정이 바로 Function Calling입니다.",
    },
    {
      question: "응답에 tool_calls가 포함되어 있으면 애플리케이션은 어떻게 해야 하나요?",
      answer:
        "tool_calls 배열을 파싱해 함수명과 인자를 꺼낸 뒤, 실제 함수를 실행하고, 실행 결과를 role이 tool인 메시지로 만들어 tool_call_id와 함께 모델에 재전송해야 합니다. 모델이 반환한 최종 답변을 사용자에게 보여줍니다. tool_calls 없이 바로 답변이 오면 함수 실행 없이 그 답변을 그대로 전달하면 됩니다.",
    },
  ],
  code: [
    {
      title: "함수 정의와 tools 스키마 만들기",
      description: "모델에게 알려줄 함수 스키마를 JSON 형식으로 구성한다.",
      language: "python",
      code: `def get_weather(city: str) -> dict:
    # 실제로는 날씨 API를 호출한다고 가정
    return {"city": city, "temperature": 24, "condition": "맑음"}

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "특정 도시의 현재 날씨를 조회한다.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "날씨를 조회할 도시 이름",
                    }
                },
                "required": ["city"],
            },
        },
    }
]`,
    },
    {
      title: "전체 흐름: 모델 호출 → tool_calls 파싱 → 실행 → 재전송",
      description: "tool_calls가 오면 함수를 실행하고, 그 결과를 tool 메시지로 다시 보내 최종 답변을 받는다.",
      language: "python",
      code: `import json
from openai import OpenAI

client = OpenAI()
messages = [{"role": "user", "content": "서울 날씨가 어때?"}]

# 1단계: 스키마를 tools로 전달하고 모델 호출
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
)

message = response.choices[0].message

# 2단계: tool_calls 확인 (없으면 바로 일반 답변)
if message.tool_calls:
    tool_call = message.tool_calls[0]
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)

    # 3단계: 애플리케이션이 함수를 실제로 실행
    result = get_weather(city=args["city"])

    # 4단계: 실행 결과를 tool 메시지로 모델에 재전송
    messages.append(message)
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(result, ensure_ascii=False),
    })

    final = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools,
    )
    # 5단계: 모델이 최종 답변 생성
    print(final.choices[0].message.content)
else:
    print(message.content)`,
    },
    {
      title: "여러 함수 라우팅 패턴",
      description: "함수명에 따라 실행할 함수를 골라 호출하는 딕셔너리 기반 라우터.",
      language: "python",
      code: `def search_products(price_max: int, category: str) -> dict:
    # 실제로는 DB 쿼리를 실행한다고 가정
    return {"count": 12, "items": ["A 러닝화", "B 러닝화", "C 러닝화"]}

FUNCTIONS = {
    "get_weather": get_weather,
    "search_products": search_products,
}

def run_function(name: str, args: dict):
    func = FUNCTIONS.get(name)
    if func is None:
        raise ValueError("알 수 없는 함수: " + name)
    return func(**args)

# 모델이 search_products를 골랐다고 가정하면:
result = run_function("search_products", {"price_max": 50000, "category": "러닝화"})
print(result)`,
    },
  ],
    visuals: [
      {
        kind: "steps",
        title: "Function Calling 5단계 흐름",
        steps: [
          { title: "함수 스키마 정의", description: "이름·설명·파라미터(JSON Schema)를 tools로 전달" },
          { title: "모델이 tool_calls 반환", description: "사용할 함수와 인자를 JSON으로 결정" },
          { title: "앱이 함수 실행", description: "실제 로직(날씨 조회 등)을 앱 쪽에서 실행" },
          { title: "결과를 모델에 재전송", description: "실행 결과를 메시지로 다시 전달" },
          { title: "모델이 최종 답변", description: "결과를 바탕으로 사용자에게 완성된 답변" }
        ]
      },
      {
        kind: "compare",
        title: "Tool vs Function Calling",
        leftHeader: "Tool (개념)",
        rightHeader: "Function Calling (메커니즘)",
        rows: [
          { label: "의미", left: "LLM에 외부 기능을 연결하는 넓은 개념", right: "API에서 함수 호출을 주고받는 구체적 방식" },
          { label: "역할", left: "'왜' 도구를 쓰는가", right: "'어떻게' 함수를 호출하는가" }
        ]
      }
    ],
  };