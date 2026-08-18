import type { Topic } from "./types";

export const docker: Topic = {
  slug: "docker",
  title: "Docker",
  category: "지원자격",
  order: 4,
  summary:
    "애플리케이션을 '이미지'로 패키징하고 '컨테이너'로 실행하는 가상화 기술. 환경 차이로 인한 배포 문제를 해결해 준다. 이미지와 컨테이너, Dockerfile, Compose 순서로 차근차근 익히자.",
  concepts: [
    {
      heading: "컨테이너와 이미지",
      paragraphs: [
        "이미지(image)는 애플리케이션을 실행하는 데 필요한 코드, 라이브러리, 설정, 런타임을 모두 담은 '실행 가능한 패키지'다. 읽기 전용이며 재사용할 수 있다.",
        "컨테이너(container)는 이미지를 실행한 '인스턴스'다. 같은 이미지로 여러 컨테이너를 만들 수 있고, 각각 독립된 프로세스처럼 동작한다.",
        "비유로 말하면 이미지는 '설계도' 또는 '요리 레시피', 컨테이너는 그 설계도로 만든 '실제 결과물'이다.",
      ],
      keyPoints: [
        "이미지 = 실행 가능한 패키지 (읽기 전용)",
        "컨테이너 = 이미지를 실행 중인 인스턴스",
        "docker pull로 받고, docker run으로 실행한다",
      ],
    },
    {
      heading: "Dockerfile의 핵심 지시어",
      paragraphs: [
        "Dockerfile은 이미지를 만드는 '빌드 스크립트'다. 지시어 한 줄 한 줄이 이미지의 레이어가 된다.",
        "FROM은 베이스 이미지를 지정하는 필수 지시어다. RUN은 빌드 과정에서 실행할 명령(예: 패키지 설치), COPY는 호스트의 파일을 이미지 안으로 복사한다.",
        "CMD는 컨테이너가 시작될 때 실행할 명령을 지정하고, EXPOSE는 컨테이너가 사용할 포트를 문서화하며, WORKDIR은 작업 디렉터리를 설정한다.",
      ],
      keyPoints: [
        "FROM = 베이스 이미지 지정 (반드시 첫 줄)",
        "RUN = 빌드 중 명령 실행 / CMD = 시작 시 실행할 명령",
        "COPY = 파일 복사 / EXPOSE = 포트 선언 / WORKDIR = 작업 디렉터리",
      ],
    },
    {
      heading: "docker build / run / pull / push 명령",
      paragraphs: [
        "docker build -t 이미지명 . 명령으로 Dockerfile을 읽어 이미지를 만든다. -t는 이미지에 이름(tag)을 붙인다.",
        "docker run 이미지명 으로 이미지에서 컨테이너를 실행한다. -p 8080:80처럼 포트를 매핑해 호스트에서 컨테이너 안의 서비스에 접근할 수 있게 하고, -v로 볼륨을 연결해 데이터를 보존한다.",
        "docker pull은 Docker Hub 같은 레지스트리에서 이미지를 내려받고, docker push는 내가 만든 이미지를 레지스트리에 올린다.",
      ],
      keyPoints: [
        "build = 이미지 생성, run = 컨테이너 실행",
        "-p 호스트포트:컨테이너포트 = 포트 매핑",
        "-v 호스트경로:컨테이너경로 = 볼륨(데이터 보존)",
        "pull/push = 레지스트리와 이미지 주고받기",
      ],
    },
    {
      heading: "컨테이너와 가상머신(VM)의 차이",
      paragraphs: [
        "가상머신(VM)은 하이퍼바이저 위에 '게스트 OS'를 통째로 띄운다. OS 하나당 자원을 많이 차지하고 부팅이 느리지만, OS 수준에서 완전히 격리된다.",
        "컨테이너는 호스트 OS의 커널을 공유하면서 프로세스/파일시스템/네트워크만 격리한다. 게스트 OS가 없어서 가볍고 빠르게 시작된다.",
        "정리하면 VM은 '컴퓨터를 통째로 가상화'하고, 컨테이너는 '프로세스 실행 환경을 가상화'한다고 볼 수 있다.",
      ],
      keyPoints: [
        "VM = 게스트 OS 포함, 무겁고 완전 격리",
        "컨테이너 = 호스트 OS 커널 공유, 가볍고 빠름",
        "보안 격리 수준은 VM이 더 강하다",
      ],
    },
    {
      heading: "Docker Compose",
      paragraphs: [
        "Docker Compose는 여러 컨테이너를 한 번에 정의하고 관리하는 도구다. 예를 들어 웹 서버 + DB + 캐시처럼 여러 컨테이너가 협력하는 구성을 쉽게 띄울 수 있다.",
        "docker-compose.yml 파일에 서비스(services)를 정의하고, docker compose up 명령 한 번으로 모든 컨테이너를 시작한다.",
        "depends_on으로 실행 순서를 지정하고, 포트 매핑·볼륨·환경 변수도 함께 정의한다. 개발 환경을 팀원 모두에게 똑같이 재현해 주는 것이 대표적인 용도다.",
      ],
      keyPoints: [
        "컴포즈 = '여러 컨테이너를 한 번에' 관리",
        "docker-compose.yml에 서비스 정의 → docker compose up",
        "웹 + DB처럼 여러 컨테이너 구성에서 필수적",
      ],
    },
  ],
  qa: [
    {
      question: "Docker를 한 문장으로 설명한다면?",
      answer:
        "애플리케이션과 그 실행 환경을 이미지라는 패키지로 묶어, 어느 머신에서든 같은 환경의 컨테이너로 실행할 수 있게 해 주는 컨테이너 가상화 플랫폼입니다. '어떤 컴퓨터에서든 똑같이 실행된다'가 핵심 가치입니다.",
    },
    {
      question: "이미지와 컨테이너의 차이는 무엇인가요?",
      answer:
        "이미지는 코드와 라이브러리, 설정까지 담은 읽기 전용의 실행 가능한 패키지이고, 컨테이너는 그 이미지를 실행한 인스턴스입니다. 같은 이미지로 여러 컨테이너를 만들 수 있고, 컨테이너에서 생긴 변경은 이미지에 영향을 주지 않습니다.",
    },
    {
      question: "가상머신(VM)과 컨테이너의 차이는 무엇인가요?",
      answer:
        "VM은 하이퍼바이저 위에 게스트 OS를 통째로 올려 OS 수준에서 완전히 격리되지만 무겁고 느립니다. 컨테이너는 호스트 OS의 커널을 공유하면서 프로세스 환경만 격리하므로 가볍고 빠르게 시작됩니다. 다만 격리 수준은 VM이 더 강하기 때문에, 보안이 중요한 경계에는 VM을 쓰는 경우가 많습니다.",
    },
    {
      question: "Dockerfile의 주요 지시어들을 설명해 주세요.",
      answer:
        "FROM은 베이스 이미지를 지정하는 필수 지시어이고, RUN은 빌드 중 실행할 명령(예: pip install)입니다. COPY는 호스트 파일을 이미지로 복사하며, CMD는 컨테이너 시작 시 실행할 명령을 지정합니다. EXPOSE는 컨테이너가 사용할 포트를 선언하고, WORKDIR은 작업 디렉터리를 설정합니다.",
    },
    {
      question: "Docker Compose는 왜 쓰나요?",
      answer:
        "애플리케이션이 웹 서버, DB, 캐시처럼 여러 컨테이너로 구성될 때, 각각을 docker run으로 일일이 관리하면 번거롭고 실행 순서나 설정이 어긋나기 쉽습니다. Compose는 docker-compose.yml에 모든 서비스를 정의해 두고 docker compose up 한 번으로 함께 띄우고 관리할 수 있게 해 줍니다.",
    },
    {
      question: "docker run -p 8080:80 은 어떤 의미인가요?",
      answer:
        "포트 매핑 옵션입니다. 호스트(내 컴퓨터)의 8080 포트와 컨테이너의 80 포트를 연결해서, http://localhost:8080으로 접속하면 컨테이너 안의 80번 포트 서비스로 전달되게 합니다. 왼쪽이 호스트 포트, 오른쪽이 컨테이너 포트입니다.",
    },
  ],
  code: [
    {
      title: "파이썬 앱용 Dockerfile",
      description: "FastAPI/Flask 같은 파이썬 애플리케이션을 이미지로 만드는 전형적인 Dockerfile.",
      language: "dockerfile",
      code: `FROM python:3.11-slim

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 먼저 복사해 캐시를 활용한다
COPY requirements.txt .
RUN pip install -r requirements.txt

# 애플리케이션 코드 복사
COPY app.py .

# 컨테이너가 사용할 포트 선언 (문서화)
EXPOSE 8000

# 컨테이너 시작 시 실행할 명령
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]`,
    },
    {
      title: "docker build / run / pull 명령 모음",
      description: "이미지를 만들고, 실행하고, 레지스트리에서 받아오는 핵심 명령들.",
      language: "bash",
      code: `# Dockerfile이 있는 디렉터리에서 이미지 빌드
docker build -t my-python-app .

# 컨테이너 실행: 8000 포트 매핑 + 백그라운드(-d) 실행
docker run -d -p 8000:8000 --name my-app my-python-app

# 실행 중인 컨테이너 확인
docker ps

# Docker Hub에서 이미지 내려받기
docker pull nginx:latest

# 컨테이너 중지/삭제
docker stop my-app
docker rm my-app`,
    },
    {
      title: "docker-compose.yml 예제",
      description: "웹 서버와 PostgreSQL DB를 한 번에 띄우는 컴포즈 구성.",
      language: "yaml",
      code: `services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypass
      POSTGRES_DB: mydb
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`,
    },
  ],
};