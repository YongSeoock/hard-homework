import type { Topic } from "./types";

export const postgresql: Topic = {
  slug: "postgresql",
  title: "PostgreSQL",
  category: "지원자격",
  order: 3,
  summary:
    "데이터를 테이블에 구조적으로 저장하고 SQL로 다루는 관계형 데이터베이스(RDBMS). 테이블, JOIN, 인덱스, 트랜잭션 같은 핵심 개념과 기본 SQL 문법을 면접 수준에서 확실히 익히자.",
  concepts: [
    {
      heading: "RDBMS와 SQL, 테이블(Table)",
      paragraphs: [
        "관계형 데이터베이스(RDBMS)는 데이터를 '테이블(표)'에 저장하는 DBMS다. 테이블은 세로 방향의 '열(컬럼)'과 가로 방향의 '행(행, 레코드)'으로 구성된다. 예: users 테이블에 id, name, email 열이 있고, 사용자 한 명이 한 행에 해당한다.",
        "여러 테이블은 서로 공통된 값(키)을 통해 '관계'를 맺는다. 예: orders 테이블의 user_id가 users 테이블의 id를 가리키면, 주문과 사용자를 연결할 수 있다.",
        "SQL(Structured Query Language)은 이런 테이블과 관계를 다루는 표준 질의 언어다. SELECT, INSERT, UPDATE, DELETE 같은 문법으로 데이터를 조회하고 조작한다.",
      ],
      keyPoints: [
        "테이블 = 열(컬럼) + 행(레코드)으로 구성된 표",
        "관계 = 공통된 키 값으로 테이블을 연결하는 것",
        "SQL: 데이터를 조회/추가/수정/삭제하는 표준 언어",
      ],
    },
    {
      heading: "PostgreSQL의 특징",
      paragraphs: [
        "PostgreSQL은 오픈소스 RDBMS로, 30년 이상 발전해 온 성숙한 데이터베이스다. 표준 SQL을 잘 지키고, ACID 트랜잭션을 완전하게 보장해 데이터 정합성이 중요한 서비스에 적합하다.",
        "JSONB 타입을 지원해서 JSON 데이터를 그대로 저장하고 인덱스까지 걸 수 있다. 덕분에 정형 데이터뿐 아니라 반정형 데이터도 한 데이터베이스에서 다룰 수 있다.",
        "확장성이 뛰어나다. PostgreSQL은 '확장(Extension)' 기능을 지원하며, 대표적으로 검색(Full Text Search), 지리 정보(PostGIS) 같은 기능을 추가로 붙일 수 있다. 오픈소스 생태계가 커서 국내외 서비스에서 널리 사용된다.",
      ],
      keyPoints: [
        "오픈소스 + ACID 트랜잭션 보장",
        "JSONB로 유연한 데이터도 저장 가능",
        "확장(Extension) 기능으로 기능 추가가 자유로움",
      ],
    },
    {
      heading: "기본 SQL 조작 (CRUD)",
      paragraphs: [
        "데이터를 다루는 기본 조작 4가지를 CRUD라고 한다. INSERT는 행을 추가하고, SELECT는 조건에 맞는 행을 조회한다.",
        "UPDATE는 기존 행의 값을 수정하고, DELETE는 행을 삭제한다. 둘 다 WHERE 절로 대상 행을 특정하지 않으면 테이블 전체가 수정/삭제될 수 있으므로 주의해야 한다.",
        "SELECT는 * 로 전체 열을 가져오거나 특정 열만 골라 가져올 수 있고, WHERE로 조건을, ORDER BY로 정렬을 지정할 수 있다.",
      ],
      keyPoints: [
        "INSERT = 추가, SELECT = 조회",
        "UPDATE/DELETE는 반드시 WHERE로 대상을 한정한다",
        "SELECT ... FROM ... WHERE ... ORDER BY ... 가 기본 형태",
      ],
    },
    {
      heading: "JOIN과 테이블 관계",
      paragraphs: [
        "JOIN은 두 개 이상의 테이블을 공통된 열 기준으로 연결해 하나의 결과로 합치는 연산이다. 예: 주문(orders)과 사용자(users)를 user_id 기준으로 합쳐 '누가 어떤 주문을 했는지'를 한 번에 조회할 수 있다.",
        "INNER JOIN은 양쪽 테이블 모두에 일치하는 행만 결과에 포함한다. 일치하지 않는 행은 버려진다.",
        "LEFT JOIN은 왼쪽 테이블의 모든 행을 포함하고, 오른쪽 테이블에 일치하는 행이 없으면 그 열을 NULL로 채운다. '주문이 없는 사용자도 모두 보여주고 싶다' 같은 경우에 쓴다.",
      ],
      keyPoints: [
        "INNER JOIN = 양쪽에 모두 있는 데이터만",
        "LEFT JOIN = 왼쪽 전부 + 매칭되는 오른쪽 (없으면 NULL)",
        "JOIN은 ON 절의 조건으로 어떤 열을 기준으로 합칠지 정한다",
      ],
    },
    {
      heading: "기본키(PK)와 외래키(FK)",
      paragraphs: [
        "기본키(Primary Key)는 테이블의 각 행을 유일하게 식별하는 열이다. 값이 중복되면 안 되고(UNIQUE) NULL이 될 수 없으며(NOT NULL), 테이블당 하나만 지정할 수 있다. 예: users.id.",
        "외래키(Foreign Key)는 다른 테이블의 기본키를 참조하는 열이다. 예: orders.user_id가 users.id를 참조하면 '주문은 반드시 존재하는 사용자의 것'이라는 규칙이 지켜진다.",
        "외래키는 '참조 무결성(referential integrity)'을 강제해서, 존재하지 않는 사용자에게 주문이 달리는 등 잘못된 데이터가 쌓이는 것을 방지한다.",
      ],
      keyPoints: [
        "PK: 행을 고유하게 식별 (UNIQUE + NOT NULL)",
        "FK: 다른 테이블의 PK를 참조해 관계를 만든다",
        "FK 덕분에 참조 무결성이 보장된다",
      ],
    },
    {
      heading: "인덱스(Index)와 트랜잭션/ACID",
      paragraphs: [
        "인덱스는 검색 속도를 높이기 위해 별도로 만들어 두는 '찾아보기 표'다. 인덱스가 없으면 조건 검색 시 테이블의 모든 행을 처음부터 끝까지 읽는 '풀 테이블 스캔'을 하게 된다.",
        "인덱스가 있으면 B-트리 등 구조로 원하는 행을 빠르게 찾을 수 있다. 대신 저장 공간을 추가로 차지하고, INSERT/UPDATE/DELETE 시 인덱스도 함께 갱신되어 쓰기 성능은 느려질 수 있다. 기본키에는 자동으로 인덱스가 만들어진다.",
        "트랜잭션(Transaction)은 여러 작업을 하나의 단위로 묶는 것이다. 예: 송금은 '출금 + 입금' 두 작업이 함께 성공하거나 함께 실패해야 한다. 이를 보장하는 성질이 ACID다.",
        "ACID는 Atomicity(원자성, 전부 성공 또는 전부 실패), Consistency(일관성, 작업 후에도 데이터 규칙 유지), Isolation(격리성, 동시 작업이 서로 간섭하지 않음), Durability(지속성, 성공한 작업은 영구 보존)의 약자다.",
      ],
      keyPoints: [
        "인덱스 = 검색 빨라짐, 대신 공간/쓰기 비용 발생",
        "ACID = 원자성, 일관성, 격리성, 지속성",
        "트랜잭션: BEGIN → 작업들 → COMMIT / ROLLBACK",
      ],
    },
  ],
  qa: [
    {
      question: "RDBMS와 NoSQL의 차이는 무엇인가요?",
      answer:
        "RDBMS는 데이터를 표(테이블)에 구조적으로 저장하고 SQL로 다루며, 스키마가 고정되어 있고 ACID 트랜잭션으로 데이터 정합성을 보장합니다. NoSQL은 스키마가 유연하고 수평 확장이 쉬운 대신, 즉시 일관성보다 성능과 확장성을 우선합니다. 예를 들어 정합성이 중요한 결제 시스템에는 RDBMS가, 빠르게 변하는 비정형 데이터를 대규모로 다룰 때는 NoSQL이 적합합니다.",
    },
    {
      question: "INNER JOIN과 LEFT JOIN의 차이는 무엇인가요?",
      answer:
        "INNER JOIN은 두 테이블에서 조건이 일치하는 행만 결과에 포함합니다. LEFT JOIN은 왼쪽 테이블의 모든 행을 포함하고, 오른쪽에 일치하는 행이 없으면 NULL로 채워 반환합니다. '주문이 없는 사용자까지 모두 조회'해야 할 때는 LEFT JOIN을 씁니다.",
    },
    {
      question: "PRIMARY KEY와 FOREIGN KEY는 무엇인가요?",
      answer:
        "기본키(PK)는 테이블의 각 행을 유일하게 식별하는 열로, 중복과 NULL이 허용되지 않습니다. 외래키(FK)는 다른 테이블의 기본키를 참조하는 열로, 두 테이블의 관계를 만들고 존재하지 않는 값을 참조하지 못하게 하는 참조 무결성을 보장합니다.",
    },
    {
      question: "인덱스는 왜 필요한가요?",
      answer:
        "데이터 조회 성능을 높이기 위해서입니다. 인덱스가 없으면 조건 검색 시 모든 행을 읽는 풀 테이블 스캔을 하지만, 인덱스가 있으면 B-트리 같은 구조로 원하는 행을 빠르게 찾습니다. 다만 저장 공간을 차지하고 쓰기(INSERT/UPDATE/DELETE) 시 인덱스 갱신 비용이 들기 때문에, 조회가 잦은 열에만 선택적으로 만들어야 합니다.",
    },
    {
      question: "PostgreSQL과 MySQL의 차이는 무엇인가요?",
      answer:
        "둘 다 대표적인 오픈소스 RDBMS입니다. PostgreSQL은 표준 SQL 준수도가 높고, JSONB, 윈도우 함수, 풍부한 확장 기능 등 고급 기능을 많이 제공합니다. MySQL은 가볍고 단순해서 널리 쓰이며 설정과 유지보수가 비교적 쉽습니다. 성능 자체는 상황에 따라 다르고, 무엇보다 팀의 경험과 서비스 요구사항에 맞춰 선택하는 것이 중요합니다.",
    },
    {
      question: "트랜잭션과 ACID란 무엇인가요?",
      answer:
        "트랜잭션은 하나의 작업 단위로 묶인 연산의 집합으로, 전부 성공하거나 전부 실패해야 합니다. ACID는 트랜잭션의 네 가지 성질로, 원자성(Atomicity, 전부 성공 또는 전부 실패), 일관성(Consistency, 작업 전후로 데이터 규칙이 유지됨), 격리성(Isolation, 동시 트랜잭션이 서로 간섭하지 않음), 지속성(Durability, 커밋된 데이터는 영구 보존)입니다.",
    },
    {
      question: "SELECT의 실행 순서는 어떻게 되나요?",
      answer:
        "SQL은 작성 순서가 아닌 논리적 실행 순서로 처리됩니다. FROM(테이블 선택) → WHERE(행 필터링) → GROUP BY(그룹화) → HAVING(그룹 필터링) → SELECT(열 선택) → ORDER BY(정렬) → LIMIT(개수 제한) 순서입니다. 그래서 WHERE에서는 SELECT에서 만든 별칭을 쓸 수 없고, ORDER BY에서는 쓸 수 있습니다.",
    },
  ],
  code: [
    {
      title: "CREATE TABLE과 기본 SQL (CRUD)",
      description: "테이블을 만들고 INSERT로 데이터를 넣은 뒤 SELECT/UPDATE/DELETE로 조작한다.",
      language: "sql",
      code: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 추가: INSERT
INSERT INTO users (name, email) VALUES ('김개발', 'dev@example.com');

-- 조회: SELECT
SELECT id, name, email FROM users WHERE name = '김개발';

-- 수정: UPDATE (WHERE 필수)
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- 삭제: DELETE (WHERE 필수)
DELETE FROM users WHERE id = 1;`,
    },
    {
      title: "INNER JOIN으로 테이블 연결하기",
      description: "users와 orders를 user_id 기준으로 합쳐 주문 정보와 사용자 정보를 함께 조회한다.",
      language: "sql",
      code: `SELECT users.name, orders.id AS order_id, orders.amount
FROM orders
INNER JOIN users ON orders.user_id = users.id
WHERE orders.amount >= 10000
ORDER BY orders.amount DESC;`,
    },
    {
      title: "GROUP BY와 COUNT로 집계하기",
      description: "상품을 카테고리별로 묶어 개수를 센 뒤, 2개 이상인 카테고리만 필터링한다.",
      language: "sql",
      code: `SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) >= 2
ORDER BY product_count DESC;`,
    },
    {
      title: "docker로 PostgreSQL 실행하고 psql로 접속하기",
      description: "Docker 컨테이너로 PostgreSQL을 띄우고 psql 클라이언트로 접속하는 명령어다.",
      language: "bash",
      code: `# PostgreSQL 16 컨테이너 실행
docker run -d --name my-postgres \\
  -e POSTGRES_USER=postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_DB=mydb \\
  -p 5432:5432 \\
  postgres:16

# 실행 중인 컨테이너에 psql로 접속
docker exec -it my-postgres psql -U postgres -d mydb`,
    },
  ],
  visuals: [
    {
      kind: "compare",
      title: "RDBMS vs NoSQL",
      leftHeader: "RDBMS (PostgreSQL 등)",
      rightHeader: "NoSQL (MongoDB 등)",
      rows: [
        { label: "데이터 구조", left: "테이블(행·열), 스키마 고정", right: "문서/키-값 등, 스키마 유연" },
        { label: "관계", left: "JOIN으로 테이블 간 관계 표현", right: "테이블 간 관계 약함 또는 없음" },
        { label: "트랜잭션", left: "ACID 보장 (금융 등)", right: "상황에 따라 다름 (최종 일관성)" },
        { label: "적합", left: "정형 데이터·정합성 중요", right: "대용량·비정형·확장성 우선" }
      ]
    },
    {
      kind: "steps",
      title: "트랜잭션 처리 흐름",
      steps: [
        { title: "BEGIN", description: "트랜잭션 시작" },
        { title: "작업 수행", description: "INSERT/UPDATE 등 여러 쿼리 실행" },
        { title: "COMMIT", description: "성공 시 변경사항 확정 저장" },
        { title: "ROLLBACK(실패 시)", description: "실패 시 시작 전 상태로 되돌림" }
      ]
    }
  ],
  plain: [
    {
      title: "엑셀 시트로 이해하는 데이터베이스",
      paragraphs: [
        "**데이터베이스(DB)**는 엑셀 파일 여러 개를 관리하는 창고입니다. **테이블**은 엑셀 시트와 같아서, 행(가로줄)은 기록 한 건, 열(세로줄)은 항목을 뜻합니다.",
        "**SQL**은 그 창고에 질문하거나 지시하는 명령어입니다. '이 표에서 조건에 맞는 줄만 보여줘' 같은 작업을 합니다.",
        "PostgreSQL은 그 창고 프로그램 중 하나로, 데이터를 안전하게 보관하고(ACID) 유연하게 다룰 수 있는 오픈소스입니다."
      ]
    },
    {
      title: "그림 맞추기로 이해하는 JOIN",
      paragraphs: [
        "**JOIN**은 두 시트를 공통 항목(예: 고객 번호)으로 맞춰 한 장으로 붙이는 것입니다.",
        "**INNER JOIN**은 양쪽에 모두 있는 것만 붙입니다. **LEFT JOIN**은 왼쪽 시트는 전부 남기고, 오른쪽은 맞는 것만 붙여 없으면 비어 있게 표시합니다."
      ]
    },
    {
      title: "송금으로 이해하는 트랜잭션",
      paragraphs: [
        "**트랜잭션**은 전부 성공하거나 전부 취소되는 작업 묶음입니다. A의 돈을 빼고 B에게 넣어야 할 때, 중간에 실패하면 **ROLLBACK**으로 처음 상태로 되돌립니다.",
        "이 약속을 **ACID**라고 부릅니다. 그중 A는 원자성(Atomicity)으로, '모두 되거나 모두 안 되거나'를 보장합니다."
      ]
    }
  ],
};