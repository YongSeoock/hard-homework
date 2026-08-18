import type { Topic } from "./types";

export const nextjs: Topic = {
  slug: "nextjs",
  title: "Next.js",
  category: "지원자격",
  order: 2,
  summary:
    "React 기반의 풀스택 프레임워크. 파일 기반 라우팅과 SSR/SSG/ISR 같은 렌더링 전략, App Router의 서버 컴포넌트 개념까지 면접에서 자주 물어보니 확실히 익히자.",
  concepts: [
    {
      heading: "Next.js란 무엇인가",
      paragraphs: [
        "Next.js는 React 기반의 '풀스택 웹 프레임워크'다. React가 라이브러리(UI 만들기)라면, Next.js는 라우팅, 렌더링 전략, API 엔드포인트, 이미지 최적화까지 서버 부문을 포함해 한 번에 제공한다.",
        "폴더에 파일을 만들면 그대로 경로(URL)가 되는 '파일 기반 라우팅'을 지원한다. 최신 버전에서는 app/ 폴더를 쓰는 'App Router'가 표준이다.",
        "페이지를 어디서 렌더링할지(클라이언트/서버, 빌드 시점/요청 시점)를 선택할 수 있어 SEO와 초기 로딩 성능을 조절할 수 있다.",
      ],
      keyPoints: [
        "React = UI 라이브러리, Next.js = 풀스택 프레임워크",
        "파일 기반 라우팅: 파일 하나 = 경로 하나",
        "앱 라우터(App Router)가 현재 표준",
      ],
    },
    {
      heading: "렌더링 전략 비교 (CSR/SSR/SSG/ISR)",
      paragraphs: [
        "CSR(Client-Side Rendering)은 브라우저에서 JavaScript가 실행되며 화면을 그린다. 초기 HTML이 거의 비어 있어 SEO에 약하고 첫 화면이 늦을 수 있다.",
        "SSR(Server-Side Rendering)은 각 요청마다 서버에서 HTML을 생성해 내려준다. SEO에 유리하고 첫 화면이 빠르지만, 요청마다 서버 작업이 필요하다.",
        "SSG(Static Site Generation)는 빌드 시점에 HTML을 미리 만들어 정적으로 배포한다. 가장 빠르지만 데이터가 바뀌어도 갱신되지 않는다.",
        "ISR(Incremental Static Regeneration)은 SSG에 '주기적인 재생성'을 더한다. 정적 페이지를 유지하면서 일정 시간이 지나면 배경에서 다시 생성해 최신 데이터를 반영한다.",
      ],
      keyPoints: [
        "SSR = 요청 시 서버에서 렌더링",
        "SSG = 빌드 시 미리 생성, 배포 후 갱신 없음",
        "ISR = SSG + 주기적 재생성",
      ],
    },
    {
      heading: "App Router 구조 (app/ 폴더)",
      paragraphs: [
        "App Router에서는 루트의 app/ 폴더가 프로젝트의 기준이 된다. app/ 안에 만든 폴더 이름이 URL 경로가 된다. 예: app/topics/ → /topics 경로.",
        "page.tsx는 해당 경로에 표시될 페이지 컴포넌트, layout.tsx는 그 경로 아래 모든 페이지를 감싸는 공통 레이아웃이다. layout은 페이지를 갱신해도 유지되는 헤더/내비게이션 같은 공통 UI에 쓴다.",
        "폴더명을 대괄호로 감싸면 동적 경로가 된다. app/topics/[slug]/page.tsx는 /topics/1, /topics/react처럼 값이 바뀌는 경로를 처리한다.",
      ],
      keyPoints: [
        "app/ 아래 폴더 = URL 경로",
        "page.tsx = 페이지, layout.tsx = 공통 레이아웃",
        "[slug] = 동적 라우팅",
      ],
    },
    {
      heading: "서버 컴포넌트 vs 클라이언트 컴포넌트",
      paragraphs: [
        "App Router의 컴포넌트는 기본적으로 '서버 컴포넌트(Server Component)'다. 서버에서 렌더링되어 HTML로 내려가므로 JavaScript 번들이 줄고, DB 접근 같은 서버 작업을 컴포넌트 안에서 직접 할 수 있다.",
        "useState 같은 훅이나 onClick 같은 이벤트 핸들러, 브라우저 전용 API가 필요하면 '클라이언트 컴포넌트(Client Component)'로 만들어야 한다. 파일 최상단에 'use client' 지시어를 붙이면 된다.",
        "일반적인 사용법은 서버 컴포넌트를 기본으로 두고, 상호작용이 필요한 조각만 'use client' 컴포넌트로 분리하는 것이다.",
      ],
      keyPoints: [
        "기본값 = 서버 컴포넌트",
        "'use client' = 클라이언트 컴포넌트 지시어",
        "서버에서 실행되는 코드는 번들에 포함되지 않는다",
      ],
    },
    {
      heading: "Route Handlers (API 엔드포인트)",
      paragraphs: [
        "app/ 폴더 안에 route.ts 파일을 만들면 그 경로가 서버 API 엔드포인트가 된다. /api/... 경로가 아니라도 원하는 경로에 API를 만들 수 있다.",
        "route.ts는 GET, POST, PUT, DELETE 같은 HTTP 메서드를 함수로 export하고, NextResponse로 응답을 반환한다. 서버에서만 실행되므로 DB 접근이나 비밀 키 사용이 가능하다.",
        "브라우저에서 페이지를 받고, 같은 프로젝트의 route.ts로 데이터를 요청하는 방식이 App Router의 대표적인 풀스택 패턴이다.",
      ],
    },
    {
      heading: "bun run dev 개발 서버",
      paragraphs: [
        "bun run dev는 개발용 서버를 실행하는 명령어다. 소스 코드를 저장하면 화면에 즉시 반영되는 핫 리로딩(HMR)을 제공한다.",
        "개발 서버는 요청 시점에 렌더링하므로, 실제 배포(빌드 후 실행)와 동작 방식이 다를 수 있다는 점을 알아두면 좋다. 최종 결과는 bun run build로 확인한다.",
        "이 프로젝트(하드 홈워크)도 bun 런타임과 Next.js를 함께 쓰고 있어, 개발 서버 실행은 bun run dev 하나로 충분하다.",
      ],
      keyPoints: [
        "bun run dev = 개발 서버 + 핫 리로딩",
        "배포용 결과물은 bun run build로 생성",
      ],
    },
  ],
  qa: [
    {
      question: "React와 Next.js의 차이는 무엇인가요?",
      answer:
        "React는 UI를 만들기 위한 라이브러리로, 렌더링과 상태 관리를 담당하지만 라우팅이나 서버 처리는 기본 제공하지 않습니다. Next.js는 React를 기반으로 파일 기반 라우팅, SSR/SSG 같은 렌더링 전략, API 엔드포인트(Route Handlers)까지 포함한 풀스택 프레임워크입니다. Next.js 없이도 React로 SPA를 만들 수 있지만, SEO나 서버 렌더링이 필요하면 Next.js를 씁니다.",
    },
    {
      question: "SSR은 왜 필요한가요?",
      answer:
        "SSR(Server-Side Rendering)은 서버에서 HTML을 미리 만들어 내려주므로, 검색 엔진 크롤러가 콘텐츠를 바로 읽을 수 있어 SEO에 유리합니다. 또한 JavaScript가 실행되기 전에 완성된 HTML이 도착하므로 첫 화면(초기 로딩)이 빨라집니다. CSR은 화면이 비어 있는 상태에서 시작되어 크롤링도 어렵고 첫 렌더링까지 시간이 걸리기 때문에, 콘텐츠 중심 서비스에서는 SSR이 필요합니다.",
    },
    {
      question: "서버 컴포넌트와 클라이언트 컴포넌트의 차이는 무엇인가요?",
      answer:
        "서버 컴포넌트는 서버에서 렌더링되어 HTML로 내려가고, 클라이언트로 전송되는 JavaScript 번들에 포함되지 않습니다. 그래서 번들이 작아지고 DB 접근 같은 서버 작업을 컴포넌트 안에서 직접 할 수 있습니다. 클라이언트 컴포넌트는 브라우저에서 실행되어 useState 같은 훅과 onClick 같은 이벤트 핸들러를 쓸 수 있습니다. 즉 상호작용과 상태는 클라이언트에서, 정적 콘텐츠와 데이터 조회는 서버에서 처리하는 것이 기본 설계입니다.",
    },
    {
      question: "'use client'가 무엇인가요?",
      answer:
        "App Router에서 해당 파일을 클라이언트 컴포넌트로 지정하는 지시어입니다. 파일의 최상단에 'use client'를 적으면 그 파일과 하위에 import된 컴포넌트들이 브라우저(클라이언트)에서 렌더링됩니다. useState, useEffect, 이벤트 핸들러는 클라이언트 컴포넌트에서만 사용할 수 있으므로, 상호작용이 있는 컴포넌트에 'use client'를 붙입니다.",
    },
    {
      question: "SSG와 ISR의 차이는 무엇인가요?",
      answer:
        "SSG(Static Site Generation)는 빌드 시점에 페이지를 미리 HTML로 만들어 배포하므로 응답이 가장 빠르지만, 배포 후에는 내용이 갱신되지 않습니다. ISR(Incremental Static Regeneration)은 SSG처럼 정적 페이지를 제공하면서도, 설정한 재검증 시간(revalidate)이 지나면 백그라운드에서 페이지를 다시 생성해 최신 데이터를 반영합니다. 자주 바뀌지 않는 콘텐츠는 SSG, 어느 정도 최신성이 필요한 콘텐츠는 ISR을 씁니다.",
    },
    {
      question: "bun run dev가 하는 일은 무엇인가요?",
      answer:
        "bun run dev는 package.json의 dev 스크립트(bunx next dev 등)를 실행해 개발용 서버를 띄우는 명령어입니다. 개발 서버는 코드를 저장할 때 화면에 바로 반영하는 핫 리로딩(HMR)을 제공하고, 오류가 있으면 화면에 안내해 줍니다. 배포용 결과물을 만드는 것은 bun run build이고, 실제 서비스는 빌드 산출물을 실행해 서빙합니다.",
    },
  ],
  code: [
    {
      title: "App Router 기본 구조: layout.tsx + page.tsx",
      description: "app/layout.tsx는 모든 페이지를 감싸는 공통 레이아웃, app/page.tsx는 루트(/) 경로의 페이지다.",
      language: "tsx",
      code: `// app/layout.tsx - 모든 페이지에 적용되는 공통 레이아웃
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "면접 준비 사이트",
  description: "Next.js 면접 대비 자료",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header>공통 헤더</header>
        <main>{children}</main>
        <footer>공통 푸터</footer>
      </body>
    </html>
  );
}`,
    },
    {
      title: "동적 라우팅: app/topics/[slug]/page.tsx",
      description: "대괄호 폴더로 /topics/react, /topics/nextjs 같은 경로를 한 파일로 처리한다. params로 경로 값을 받는다.",
      language: "tsx",
      code: `// app/topics/[slug]/page.tsx
export default function TopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <article>
      <h1>토픽: {slug}</h1>
      <p>여기에서 slug에 해당하는 내용을 조회해 보여준다.</p>
    </article>
  );
}`,
    },
    {
      title: "Route Handler: app/api/health/route.ts",
      description: "route.ts에 HTTP 메서드를 export하면 그 경로가 API 엔드포인트가 된다. 서버에서만 실행된다.",
      language: "typescript",
      code: `// app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body }, { status: 201 });
}`,
    },
  ],
  visuals: [
    {
      kind: "compare",
      title: "렌더링 전략 비교",
      leftHeader: "방식",
      rightHeader: "특징",
      rows: [
        { label: "CSR", left: "클라이언트 렌더링", right: "브라우저에서 JS로 화면 구성, SEO·초기 로딩 불리" },
        { label: "SSR", left: "서버 렌더링", right: "요청마다 서버가 HTML 생성, SEO 유리" },
        { label: "SSG", left: "정적 생성", right: "빌드 시 HTML 생성, 가장 빠름, 동적 데이터에 약함" },
        { label: "ISR", left: "증분 정적 재생성", right: "정적 + 주기적 재생성으로 최신 데이터 반영" }
      ]
    },
    {
      kind: "compare",
      title: "서버 컴포넌트 vs 클라이언트 컴포넌트",
      leftHeader: "서버 컴포넌트(기본)",
      rightHeader: "클라이언트 컴포넌트(use client)",
      rows: [
        { label: "실행 위치", left: "서버에서 렌더링", right: "브라우저에서 렌더링" },
        { label: "사용처", left: "데이터 조회·렌더링", right: "useState 등 상호작용·이벤트 필요 시" },
        { label: "번들 크기", left: "작음 (서버에 남음)", right: "큼 (브라우저로 전송)" }
      ]
    }
  ],
  plain: [
    {
      title: "식당으로 이해하는 웹사이트",
      paragraphs: [
        "웹사이트는 식당의 메뉴판과 같습니다. **React**는 메뉴판을 멋지게 그리는 손재주 좋은 직원이고, **Next.js**는 주문이 들어왔을 때 언제, 어디서, 어떻게 만들지까지 관리하는 식당 시스템입니다.",
        "**파일 기반 라우팅**은 폴더 구조가 곧 주소가 되는 것입니다. app/about 폴더를 만들면 /about 주소가 생깁니다."
      ]
    },
    {
      title: "언제 요리하느냐: 렌더링 타이밍",
      paragraphs: [
        "**SSG(정적 생성)**는 아침에 메뉴를 미리 다 만들어 놓고 주문 즉시 서빙하는 것이라 가장 빠릅니다. **SSR(서버 렌더링)**은 주문할 때마다 주방에서 새로 요리하는 것이라 항상 최신이지만 조금 느립니다.",
        "**CSR(클라이언트 렌더링)**은 식탁에서 직접 조리하는 것이라 버튼 클릭 같은 즉각적인 반응에 강하지만, 첫 화면이 뜨기까지 조금 기다립니다.",
        "**ISR(증분 정적 재생성)**은 미리 만들어 둔 요리를 일정 시간마다 새로 갈아 만드는 것이라, 빠르면서도 최신 상태를 일부 반영합니다."
      ]
    },
    {
      title: "주방과 홀: 서버/클라이언트 컴포넌트",
      paragraphs: [
        "**서버 컴포넌트**는 주방(서버)에서 완성된 상태로 손님에게 나오는 요리입니다. 빠르고, 내부 재료(코드·데이터)가 밖으로 안 보입니다.",
        "**클라이언트 컴포넌트(use client)**는 홀(브라우저)에서 손님과 소통하며 조리하는 요리입니다. 버튼 클릭, 입력 같은 상호작용이 필요할 때 사용합니다."
      ]
    }
  ],
};