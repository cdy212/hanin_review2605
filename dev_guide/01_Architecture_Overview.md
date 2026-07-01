# 01. 프로젝트 개요 및 아키텍처 (Architecture Overview)

**전체적인 폴더 구조와 기술 스택, 그리고 프론트엔드와 백엔드의 역할**을 설명합니다.

---

## 🏗 전체 시스템 아키텍처 (System Architecture)
KoreaTaiwan 프로젝트는 클라이언트(화면)를 담당하는 **프론트엔드**와 데이터 처리 및 비즈니스 로직을 담당하는 **백엔드**로 명확히 분리되어 있습니다.

- **Frontend (`koreaTaiwan` 폴더)**
  - **역할**: 사용자가 직접 보는 웹 화면(UI)을 구성하고, 백엔드 서버로 데이터를 요청합니다.
  - **기술 스택**: Expo (React Native 기반) + React. 웹과 모바일 앱(안드로이드/iOS)을 동시에 대응하기 위해 하이브리드 프레임워크인 Expo를 사용합니다.
- **Backend (`koreaTaiwanApi` 폴더)**
  - **역할**: 프론트엔드에서 보낸 요청(API)을 받아 데이터베이스(MySQL)에서 데이터를 조회, 수정, 삭제한 후 결과를 다시 프론트엔드에 돌려줍니다.
  - **기술 스택**: Java 11 + Spring Boot 2.7.4 + Spring Data JPA + MySQL. 사용자 인증은 Spring Security와 JWT(Json Web Token)를 사용합니다.

---

## 📁 주요 폴더 구조 설명 (Directory Structure)

### 1. Frontend (`/app/koreaTaiwan/`)
웹과 앱의 화면을 담당하는 소스코드들이 모여있습니다.

- `src/` : 실제 개발자가 작성하는 소스코드의 핵심 폴더입니다.
  - `pages/` (또는 `screens/`): 사용자가 보는 각각의 전체 화면 단위(예: 로그인 화면, 메인 화면, 마이페이지) 코드가 위치합니다.
  - `components/`: 여러 화면에서 공통으로 재사용되는 작은 조각들(예: 버튼, 헤더, 모달창)이 모여있습니다.
  - `contexts/` (또는 `hooks/`): 앱 전체에서 공유해야 하는 상태(예: 로그인된 사용자 정보)를 관리합니다.
  - `utils/` (또는 `api/`): 백엔드 서버(API)와 통신하거나 날짜 변환 등 공통으로 쓰이는 함수들이 모여있습니다.
  - `styles/`: CSS나 스타일링과 관련된 공통 속성들이 정의되어 있습니다.
- `package.json`: 프론트엔드 프로젝트를 실행하기 위해 필요한 외부 라이브러리(모듈)들의 목록과 실행 명령어(`npm start` 등)가 적혀있는 파일입니다.

### 2. Backend (`/app/koreaTaiwanApi/`)
데이터베이스와 통신하고 API를 제공하는 백엔드 소스코드들입니다. (Maven 기반)

- `src/main/java/com/kt/koreataiwan/` (예상 경로): 자바(Java) 코드가 작성되는 핵심 폴더입니다. 기능(도메인)별로 패키지가 나뉘어 있습니다.
  - `controller/`: 프론트엔드의 요청(URL)을 제일 먼저 받는 "접수처" 역할을 합니다.
  - `service/`: 실제 비즈니스 로직(예: 쿠폰 발급 가능 여부 계산, 비밀번호 암호화 등)을 수행하는 "작업실"입니다.
  - `repository/`: DB에 직접 접근해서 데이터를 가져오거나 저장하는 "창고 관리자" 역할을 합니다. (Spring Data JPA 활용)
  - `domain/` (또는 `entity/`): DB의 테이블과 1:1로 매칭되는 자바 객체(클래스)들입니다.
  - `dto/`: 프론트엔드와 백엔드 간에 데이터를 주고받을 때 사용하는 "택배 상자" 같은 데이터 운반 객체입니다.
- `src/main/resources/`: 설정 파일들이 모여있는 곳입니다.
  - `application-local.properties`: 내 PC에서 개발할 때 사용하는 DB 접속 정보 등 설정 파일.
  - `application-qa.properties`: 실서버 배포 전 테스트(QA) 서버용 설정 파일.
- `pom.xml`: 백엔드 프로젝트에 필요한 외부 라이브러리(Spring Web, MySQL 드라이버 등) 목록을 관리하는 파일입니다.

---

> 💡 **팁**: 화면에서 어떤 버튼을 눌렀을 때 작동하는 로직을 고치고 싶다면, 먼저 프론트엔드의 `pages/` 폴더에서 해당 화면 코드를 찾습니다. 그 화면에서 어떤 API URL을 호출하는지(`utils/` 참고) 확인한 뒤, 백엔드의 `controller/` 폴더에서 해당 URL을 매핑(`@GetMapping`, `@PostMapping`)하고 있는 코드를 찾아가는 순서로 추적하면 쉽게 코드를 파악할 수 있습니다!
