import type { Topic } from "./types";

export const javaSpring: Topic = {
  slug: "java-spring",
  title: "Java (Spring)",
  category: "우대사항",
  order: 9,
  summary:
    "JVM 위에서 동작하는 정적 타입 언어 Java와, 설정의 복잡함을 해결한 Spring Boot. IoC/DI와 MVC 계층 구조까지 면접 빈출 포인트를 확실히 익히자.",
  concepts: [
    {
      heading: "Java의 특징",
      paragraphs: [
        "Java는 JVM(Java Virtual Machine) 위에서 동작하는 언어다. 소스 코드를 컴파일하면 바이트코드(.class)가 되고, JVM이 이 바이트코드를 실행한다. JVM 덕분에 운영체제가 달라도 같은 코드가 동작한다(Write Once, Run Anywhere).",
        "정적 타입(static typing) 언어라 변수의 타입을 컴파일 시점에 검사하고, 타입이 맞지 않으면 컴파일이 실패한다. 그래서 실행 전에 많은 오류를 잡을 수 있다.",
        "객체지향 언어로 클래스와 객체 중심으로 코드를 구성한다. 캡슐화, 상속, 다형성 같은 객체지향 개념을 지원하며, 대부분의 백엔드 서버가 Java로 만들어져 왔다.",
      ],
      keyPoints: [
        "소스 → 컴파일 → 바이트코드 → JVM이 실행",
        "정적 타입: 컴파일 시점에 타입 검사",
        "객체지향: 클래스/객체, 캡슐화·상속·다형성",
      ],
    },
    {
      heading: "Spring과 Spring Boot의 차이",
      paragraphs: [
        "Spring은 Java 기반의 웹/엔터프라이즈 애플리케이션 프레임워크다. IoC 컨테이너, DI, AOP, 트랜잭션 관리, MVC 모듈을 제공해 애플리케이션의 뼈대를 잡아 준다.",
        "다만 초기 Spring은 설정이 복잡했다. 수많은 XML 설정과 라이브러리 버전을 개발자가 직접 맞춰야 했다.",
        "Spring Boot는 이런 설정 부담을 없앤 '스프링을 쉽게 쓰기 위한 도구'다. 필요한 라이브러리를 묶은 starter 의존성, 자동 설정(auto-configuration), 내장 WAS(Tomcat)를 제공한다. 덕분에 별도 서버 설치 없이 main 메서드만 실행하면 웹 서버가 뜬다.",
      ],
      keyPoints: [
        "Boot = 설정 간소화 + 내장 WAS + 자동 설정",
        "Boot를 쓰면 서버 구성과 의존성 관리가 대폭 줄어든다",
        "요즘 신규 프로젝트는 거의 Spring Boot로 시작한다",
      ],
    },
    {
      heading: "IoC와 DI",
      paragraphs: [
        "IoC(Inversion of Control, 제어의 역전)는 '객체를 누가 만들고 관리할지'의 주도권을 개발자가 아닌 스프링 컨테이너가 갖는 것이다. 객체의 생성, 생명주기, 의존 관계 설정을 컨테이너가 대신 처리한다.",
        "DI(Dependency Injection, 의존성 주입)는 IoC를 구현하는 대표적인 방법이다. 객체가 직접 의존 객체를 생성하는 대신, 컨테이너가 필요한 의존 객체를 만들어 주입해 준다.",
        "DI의 장점은 객체 간 결합도가 낮아져 유지보수와 테스트가 쉬워진다는 것이다. 예를 들어 Repository 인터페이스에 실제 구현체(메모리/DB)를 바꿔 끼워 넣을 수 있다.",
        "주입 방식 중 생성자 주입(constructor injection)이 가장 권장된다. 순환 참조를 컴파일 시점에 잡을 수 있고, 테스트할 때 의존성을 직접 넣어 주기 쉽기 때문이다.",
      ],
      keyPoints: [
        "IoC: 객체 관리 권한을 컨테이너가 가짐",
        "DI: 컨테이너가 의존 객체를 생성해서 주입",
        "생성자 주입을 기본으로 사용한다",
      ],
    },
    {
      heading: "MVC 패턴과 계층 구조",
      paragraphs: [
        "Spring MVC는 클라이언트 요청을 처리하는 기본 구조다. 요청은 Controller → Service → Repository 순서로 흐르고, 결과는 다시 역순으로 응답된다.",
        "Controller는 HTTP 요청을 받아 매핑하고, 요청 검증과 응답을 담당한다. 비즈니스 로직을 직접 처리하지 않는다.",
        "Service는 핵심 비즈니스 로직(예: 주문 처리, 금액 계산, 상태 변경)을 담당한다. 여러 Repository를 조합해 하나의 업무 단위를 완성한다.",
        "Repository는 데이터베이스 접근을 담당한다. 데이터 조회, 저장, 삭제 같은 영속화 작업을 수행한다. 계층을 나누면 각 부분을 독립적으로 수정하고 테스트할 수 있다.",
      ],
      keyPoints: [
        "요청 흐름: Controller → Service → Repository → DB",
        "Controller = 요청/응답, Service = 비즈니스 로직, Repository = DB 접근",
      ],
    },
    {
      heading: "주요 어노테이션",
      paragraphs: [
        "@RestController는 @Controller에 @ResponseBody를 합친 것으로, 컨트롤러의 반환값을 JSON으로 응답한다. REST API를 만들 때 기본으로 사용한다.",
        "@GetMapping과 @PostMapping은 HTTP 메서드와 URL을 메서드에 매핑한다. 각각 GET(조회), POST(생성) 요청을 처리한다. @PutMapping, @DeleteMapping도 있다.",
        "@Service는 비즈니스 로직 계층, @Repository는 데이터 접근 계층의 클래스를 스프링 빈으로 등록할 때 붙인다.",
        "@Autowired는 의존성을 자동으로 주입하라고 표시하는 어노테이션이고, @RequiredArgsConstructor는 final 필드가 있는 생성자를 자동으로 만들어 주입한다. 생성자 주입에는 @RequiredArgsConstructor를 주로 쓴다.",
      ],
      keyPoints: [
        "@RestController + @GetMapping/@PostMapping = REST API 컨트롤러",
        "@Service / @Repository = 빈으로 등록, 계층 표시",
        "@RequiredArgsConstructor = 생성자 주입의 표준적인 방법",
      ],
    },
    {
      heading: "빌드 도구와 프로젝트 구조",
      paragraphs: [
        "Maven과 Gradle은 Java 프로젝트의 빌드 도구다. 외부 라이브러리(의존성)를 관리하고, 컴파일·테스트·패키징·배포를 자동화한다.",
        "Maven은 pom.xml 파일에 XML 형식으로 의존성과 빌드 설정을 작성한다. 전통적이고 널리 쓰였던 도구다.",
        "Gradle은 build.gradle 파일에 Groovy 또는 Kotlin DSL로 설정을 작성한다. Maven보다 빌드 속도가 빠르고 유연해서 요즘 신규 프로젝트에서 더 많이 쓴다. Spring Boot 공식 문서에서도 Gradle을 기본으로 안내한다.",
        "Spring Boot 프로젝트의 기본 구조: src/main/java(소스 코드), src/main/resources(설정 파일과 정적 리소스), src/test/java(테스트 코드). 설정 파일로 application.yml 또는 application.properties를 사용한다.",
      ],
      keyPoints: [
        "Maven = pom.xml(XML), Gradle = build.gradle(DSL)",
        "Spring Boot 기본 구조: main/java + main/resources + test/java",
      ],
    },
  ],
  qa: [
    {
      question: "Java의 특징을 간단히 설명하세요.",
      answer:
        "Java는 JVM 위에서 동작하는 언어라 운영체제가 달라도 같은 코드가 실행됩니다. 소스를 컴파일해 바이트코드로 만든 뒤 JVM이 실행하는 컴파일 언어이고, 변수 타입을 컴파일 시점에 검사하는 정적 타입 언어입니다. 또 클래스와 객체 중심의 객체지향 언어로, 캡슐화·상속·다형성을 지원합니다.",
    },
    {
      question: "Spring Boot는 무엇인가요? Spring과의 차이는 무엇인가요?",
      answer:
        "Spring은 Java 기반 웹/엔터프라이즈 애플리케이션을 만들기 위한 프레임워크이고, Spring Boot는 Spring을 더 쉽게 사용하도록 돕는 도구입니다. Boot는 필요한 라이브러리를 묶은 starter 의존성과 자동 설정(auto-configuration), 내장 WAS(Tomcat)를 제공해서 XML 설정과 서버 설치 없이도 애플리케이션을 바로 실행할 수 있습니다.",
    },
    {
      question: "IoC와 DI란 무엇인가요?",
      answer:
        "IoC(제어의 역전)는 객체의 생성과 관리를 개발자가 직접 하지 않고 스프링 컨테이너가 담당하는 것입니다. DI(의존성 주입)는 IoC를 구현하는 방법으로, 객체가 필요한 의존 객체를 스스로 만들지 않고 컨테이너가 주입해 줍니다. 덕분에 객체 간 결합도가 낮아져 유지보수와 테스트가 쉬워집니다.",
    },
    {
      question: "@RestController와 @Controller의 차이는 무엇인가요?",
      answer:
        "@Controller는 주로 뷰(View)를 반환하는 서버 렌더링 방식에 쓰이고, @RestController는 @Controller에 @ResponseBody를 합친 것으로 메서드의 반환값을 JSON 등으로 바로 응답합니다. REST API를 만들 때는 @RestController를 사용합니다.",
    },
    {
      question: "MVC 패턴에서 각 계층의 역할은 무엇인가요?",
      answer:
        "Controller는 클라이언트 요청을 받아 매핑하고 응답을 내보내는 역할, Service는 비즈니스 로직(업무 처리)을 담당하는 역할, Repository는 데이터베이스 접근과 저장을 담당하는 역할입니다. 요청은 Controller → Service → Repository → DB 순서로 흐르고, 결과는 다시 역순으로 반환됩니다. 계층을 분리하면 유지보수와 테스트가 쉬워집니다.",
    },
    {
      question: "Gradle과 Maven은 무엇인가요?",
      answer:
        "둘 다 Java 프로젝트의 빌드 도구입니다. 외부 라이브러리 의존성을 관리하고 컴파일, 테스트, 패키징, 배포를 자동화합니다. Maven은 pom.xml에 XML 형식으로 설정하고, Gradle은 build.gradle에 Groovy/Kotlin DSL로 설정합니다. Gradle은 Maven보다 빠르고 유연해서 요즘 신규 프로젝트에서 더 많이 사용합니다.",
    },
  ],
  code: [
    {
      title: "@RestController + @GetMapping으로 GET API 만들기",
      description: "GET 요청을 받아 JSON으로 응답하는 가장 기본적인 컨트롤러.",
      language: "java",
      code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }

    @GetMapping("/hello/{name}")
    public String helloName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}`,
    },
    {
      title: "Service/Repository 계층 분리",
      description: "Controller는 요청 처리, Service는 비즈니스 로직, Repository는 데이터 저장을 담당한다. @RequiredArgsConstructor로 생성자 주입을 한다.",
      language: "java",
      code: `import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findUser(id);
    }
}

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findUser(Long id) {
        return userRepository.findById(id);
    }
}

@Repository
public class UserRepository {

    private final List<User> users =
        new ArrayList<>(List.of(new User(1L, "Kim"), new User(2L, "Lee")));

    public User findById(Long id) {
        return users.stream()
            .filter(user -> user.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

record User(Long id, String name) {
}`,
    },
    {
      title: "Spring Boot 기본 프로젝트 구조",
      description: "스프링 부트 프로젝트가 처음 생성되면 갖는 기본 디렉터리 구조.",
      language: "text",
      code: `my-app/
├── build.gradle                        # Gradle 빌드/의존성 설정
├── settings.gradle
└── src/
    ├── main/
    │   ├── java/com/example/myapp/
    │   │   ├── MyappApplication.java   # main 메서드, 실행 진입점
    │   │   ├── controller/             # Controller 계층
    │   │   ├── service/                # Service 계층
    │   │   ├── repository/             # Repository 계층
    │   │   └── domain/                 # 도메인(엔티티) 클래스
    │   └── resources/
    │       ├── application.yml         # 설정 파일
    │       ├── static/                 # CSS/JS 등 정적 리소스
    │       └── templates/              # 뷰 템플릿(서버 렌더링 시)
    └── test/
        └── java/com/example/myapp/     # 테스트 코드`,
    },
  ],
  visuals: [
    {
      kind: "compare",
      title: "Spring vs Spring Boot",
      leftHeader: "Spring",
      rightHeader: "Spring Boot",
      rows: [
        { label: "설정", left: "XML/설정 파일을 직접 구성", right: "자동 설정(auto-configuration)" },
        { label: "서버", left: "WAS(Tomcat 등)를 별도 설치·배포", right: "내장 WAS 포함 (빠른 실행)" },
        { label: "시작", left: "초기 구성에 시간 소요", right: "프로젝트 생성 즉시 개발 가능" }
      ]
    },
    {
      kind: "steps",
      title: "Spring MVC 요청 처리 흐름",
      steps: [
        { title: "Controller", description: "클라이언트 요청을 받아 라우팅 (@RestController)" },
        { title: "Service", description: "비즈니스 로직 처리 (트랜잭션 등)" },
        { title: "Repository", description: "DB 접근 (JPA/MyBatis 등)" },
        { title: "응답 반환", description: "처리 결과를 JSON 등으로 클라이언트에 반환" }
      ]
    }
  ],
};