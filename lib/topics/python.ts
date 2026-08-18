import type { Topic } from "./types";

export const python: Topic = {
  slug: "python",
  title: "Python",
  category: "지원자격",
  order: 1,
  summary:
    "인터프리터 방식의 동적 타이핑 언어로, 문법이 간결해 배우기 쉽고 데이터 분석·웹·자동화 등 다양한 분야에서 널리 쓰인다. 자료형, 함수·클래스, pip과 가상환경 사용법까지 기본기를 확실히 익히자.",
  concepts: [
    {
      heading: "파이썬의 특징",
      paragraphs: [
        "파이썬은 인터프리터 언어다. 소스 코드를 별도의 컴파일 단계 없이 한 줄씩 읽어 실행하므로, 작성한 파일을 바로 실행해 결과를 확인할 수 있다.",
        "동적 타이핑 언어라 변수를 선언할 때 타입을 명시하지 않는다. 값이 대입되는 순간 타입이 결정되고, 필요에 따라 다른 타입의 값을 다시 넣을 수도 있다.",
        "문법이 간결하고 자연어에 가까워 읽기 쉽다. 코드 블록을 중괄호가 아니라 들여쓰기로 구분하고, 문장 끝에 세미콜론이 필요 없다.",
      ],
      keyPoints: [
        "인터프리터 언어: 컴파일 없이 한 줄씩 실행",
        "동적 타이핑: 변수 타입을 선언하지 않음",
        "들여쓰기 = 코드 블록, 문법이 간결하고 읽기 쉬움",
      ],
    },
    {
      heading: "기본 자료형",
      paragraphs: [
        "리스트(list)는 순서가 있는 값의 모임으로, []로 만들고 요소의 추가/삭제/변경이 자유로운 '가변(mutable)' 객체다. 인덱스로 각 요소에 접근한다.",
        "튜플(tuple)은 ()로 만드는 '불변(immutable)' 자료형이다. 한 번 만들면 요소를 바꿀 수 없어, 변경되면 안 되는 데이터를 표현할 때 쓴다.",
        "딕셔너리(dict)는 키(key)와 값(value)의 쌍을 저장하는 자료형이다. {} 안에 '키: 값' 형태로 넣고, 키로 값을 빠르게 조회한다.",
        "집합(set)은 중복을 허용하지 않고 순서가 없는 자료형이다. 합집합, 교집합 같은 집합 연산을 지원한다.",
      ],
      keyPoints: [
        "가변: 리스트 / 불변: 튜플",
        "딕셔너리 = 키-값 쌍, 집합 = 중복 없는 값의 모임",
      ],
    },
    {
      heading: "함수/클래스/모듈 기초",
      paragraphs: [
        "함수는 def 키워드로 정의한다. 입력(매개변수)을 받아 처리하고 return으로 결과를 돌려준다. 반복되는 코드를 함수로 묶어 재사용한다.",
        "클래스는 상태(속성)와 동작(메서드)을 하나로 묶은 설계도다. 생성자 __init__으로 객체를 초기화하고, 메서드 안에서 self로 자기 자신을 가리킨다.",
        "모듈은 함수·클래스·변수를 담은 .py 파일 하나다. import로 다른 파일의 코드를 가져와 사용할 수 있다.",
      ],
      keyPoints: [
        "def 함수명(매개변수): → return으로 결과 반환",
        "class로 정의, __init__으로 초기화, 메서드는 self를 첫 인자로 받음",
        "import 모듈명으로 다른 파일의 코드 재사용",
      ],
    },
    {
      heading: "가상환경(venv)과 패키지 관리(pip)",
      paragraphs: [
        "pip은 파이썬 패키지(라이브러리)를 설치하고 관리하는 표준 도구다. pip install 패키지명으로 설치하고, pip freeze로 설치 목록을 requirements.txt 파일에 저장할 수 있다.",
        "가상환경(venv)은 프로젝트마다 독립된 파이썬 환경(패키지 공간)을 만들어 주는 기능이다. python -m venv 폴더명으로 생성한다.",
        "프로젝트마다 필요한 패키지 버전이 다를 수 있으므로, 전역 환경 대신 가상환경을 만들어 프로젝트별로 격리하는 것이 관례다.",
      ],
      keyPoints: [
        "pip install 패키지명 / pip freeze > requirements.txt",
        "python -m venv myenv로 생성하고 활성화 후 사용",
        "프로젝트별 패키지 격리로 버전 충돌 방지",
      ],
    },
    {
      heading: "주요 라이브러리 한눈에",
      paragraphs: [
        "NumPy는 다차원 배열과 수치 연산을 빠르게 처리하는 라이브러리다. 데이터 과학과 머신러닝에서 기본이 된다.",
        "pandas는 표(테이블) 형태의 데이터를 다루는 데이터 분석 라이브러리로, DataFrame이라는 핵심 구조를 제공한다.",
        "Flask는 가볍고 단순한 웹 프레임워크로, 작은 웹 애플리케이션이나 API를 빠르게 만들 때 쓴다.",
        "FastAPI는 최신 웹 프레임워크로, 타입 힌트 기반의 빠른 API 개발과 자동 문서화를 지원한다.",
      ],
      keyPoints: [
        "NumPy: 수치 배열 계산",
        "pandas: 표 데이터 분석(DataFrame)",
        "Flask/FastAPI: 웹·API 개발",
      ],
    },
  ],
  qa: [
    {
      question: "리스트와 튜플의 차이는 무엇인가요?",
      answer:
        "가장 큰 차이는 가변성입니다. 리스트는 요소의 추가, 삭제, 변경이 가능한 가변(mutable) 객체이고, 튜플은 한 번 만들면 바꿀 수 없는 불변(immutable) 객체입니다. 값이 바뀌면 안 되는 데이터(예: 좌표나 고정 설정 값)는 튜플로, 수정이 필요한 데이터는 리스트로 표현합니다.",
    },
    {
      question: "Python과 Java의 차이는 무엇인가요?",
      answer:
        "Python은 인터프리터 언어라 소스를 한 줄씩 실행하고, Java는 컴파일러가 소스를 바이트코드로 변환한 뒤 실행합니다. 타입 측면에서 Python은 동적 타이핑이라 변수 타입을 명시하지 않지만, Java는 정적 타이핑이라 선언 시 타입을 명시해야 합니다. 문법은 Python이 들여쓰기 기반으로 간결하고, Java는 중괄호 기반으로 명시적입니다.",
    },
    {
      question: "pip과 가상환경은 왜 필요한가요?",
      answer:
        "pip은 외부 패키지(라이브러리)를 설치하고 관리하는 도구입니다. pip install로 설치하고 pip freeze로 설치 목록을 저장합니다. 가상환경(venv)은 프로젝트마다 독립된 패키지 공간을 만들어 줍니다. 프로젝트마다 필요한 패키지 버전이 다를 수 있는데 전역 환경 하나로는 버전 충돌이 생기므로, 프로젝트별로 격리하기 위해 가상환경을 사용합니다.",
    },
    {
      question: "/와 //와 %의 차이는 무엇인가요?",
      answer:
        "/는 일반 나눗셈으로 결과가 실수(float)입니다. 7 / 2는 3.5입니다. //는 몫을 구하는 정수 나눗셈으로 7 // 2는 3입니다. %는 나머지를 구하는 연산으로 7 % 2는 1입니다. %는 짝수/홀수 판별이나 주기 계산에 자주 사용합니다.",
    },
    {
      question: "딕셔너리와 리스트는 각각 언제 쓰나요?",
      answer:
        "리스트는 순서가 있는 값들의 모음으로 인덱스로 접근하고, 딕셔너리는 키-값 쌍으로 키를 통해 값을 조회합니다. 학생 번호로 점수를 찾는 것처럼 이름표가 필요한 데이터는 딕셔너리가 읽기 쉽고 조회도 빠릅니다. 순서가 중요하거나 단순히 값만 나열하는 경우에는 리스트를 사용합니다.",
    },
    {
      question: "GIL이 무엇인가요?",
      answer:
        "GIL(Global Interpreter Lock)은 CPython(파이썬의 표준 구현)이 한 번에 하나의 스레드만 파이썬 코드를 실행하도록 보장하는 전역 락입니다. 그래서 멀티 스레드로도 CPU 연산을 병렬로 처리할 수 없습니다. 파일·네트워크처럼 대기 시간이 있는 I/O 작업에서는 스레드가 유용하지만, CPU 집약적 병렬 처리는 multiprocessing을 사용합니다. 일반적인 파이썬 개발에서는 '객체 메모리를 보호하는 안전장치' 정도로 이해하면 충분합니다.",
    },
  ],
  code: [
    {
      title: "리스트와 딕셔너리로 학생 점수 관리하기",
      description: "for 반복문과 if 조건문으로 리스트 안의 딕셔너리를 처리한다.",
      language: "python",
      code: `students = [
    {"name": "김철수", "score": 85},
    {"name": "이영희", "score": 92},
    {"name": "박민수", "score": 68},
]

total = 0
for student in students:
    if student["score"] >= 80:
        print(student["name"] + ": 합격")
    else:
        print(student["name"] + ": 불합격")
    total = total + student["score"]

average = total / len(students)
print("평균 점수:", average)`,
    },
    {
      title: "함수와 클래스 기초",
      description: "def로 함수를 정의하고, class로 상태를 가진 객체를 만든다.",
      language: "python",
      code: `def greet(name):
    return "안녕하세요, " + name + "님!"


class Calculator:
    def __init__(self, initial=0):
        self.total = initial

    def add(self, value):
        self.total = self.total + value
        return self.total


print(greet("지원자"))

calc = Calculator()
print(calc.add(3))  # 3
print(calc.add(5))  # 8`,
    },
    {
      title: "가상환경 생성과 pip 설치",
      description: "프로젝트마다 독립된 환경을 만들고 패키지를 설치한다.",
      language: "bash",
      code: `# 가상환경 생성
python -m venv myenv

# 활성화 (Windows)
myenv\\Scripts\\activate

# 활성화 (macOS/Linux)
source myenv/bin/activate

# 패키지 설치
pip install requests

# 설치 목록 저장/복원
pip freeze > requirements.txt
pip install -r requirements.txt`,
    },
    {
      title: "리스트 컴프리헨션",
      description: "반복문과 조건문을 한 줄로 압축해 새 리스트를 만든다.",
      language: "python",
      code: `numbers = [1, 2, 3, 4, 5, 6]

# 각 요소를 제곱한 새 리스트
squares = [n * n for n in numbers]

# 짝수만 필터링
evens = [n for n in numbers if n % 2 == 0]

# 결과를 확인해 보자
print(squares)  # [1, 4, 9, 16, 25, 36]
print(evens)    # [2, 4, 6]`,
    },
  ],
  visuals: [
    {
      kind: "compare",
      title: "Python vs Java",
      leftHeader: "Python",
      rightHeader: "Java",
      rows: [
        { label: "실행 방식", left: "인터프리터 (한 줄씩 실행)", right: "컴파일러 (전체를 기계어로 변환 후 실행)" },
        { label: "타입", left: "동적 타이핑 (런타임에 결정)", right: "정적 타이핑 (컴파일 시 결정)" },
        { label: "문법", left: "간결·짧음", right: "장황·명시적" },
        { label: "실행 환경", left: "Python 인터프리터", right: "JVM 위에서 동작" }
      ]
    },
    {
      kind: "steps",
      title: "파이썬 개발 흐름",
      steps: [
        { title: "가상환경 생성", description: "python -m venv venv — 프로젝트별 의존성 격리" },
        { title: "패키지 설치", description: "pip install flask — 필요한 라이브러리 설치" },
        { title: "코드 작성·실행", description: "main.py 작성 후 python main.py 로 실행" },
        { title: "배포(선택)", description: "Gunicorn 등으로 서버 실행 또는 컨테이너화" }
      ]
    }
  ],
};