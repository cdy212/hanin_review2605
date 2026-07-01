# 02. 환경 설정 및 빌드 (Environment Setup & Build)

이 문서는 백엔드 애플리케이션(`koreaTaiwanApi`)을 로컬에서 실행하고 테스트하기 위한 환경 설정 방법을 안내합니다.

## 🛠 기본 요구 사항
- **JDK 11** 설치 및 환경 변수(`JAVA_HOME`) 설정 완료
- **Maven** (내장 Wrapper `mvnw` 사용 가능)
- **MySQL** 데이터베이스 접근 권한
- IDE (IntelliJ IDEA 추천, VSCode 등)

## 🗂 프로파일 및 설정 파일
`src/main/resources` 디렉토리에 여러 환경별 설정 파일이 존재합니다.
- `application.properties`: 공통 설정 (기본 포트, JPA 설정 등)
- `application-local.properties`: 로컬 개발용 DB 및 설정
- `application-qa.properties`: QA 서버 연동용 설정
- `application-test.properties`: 테스트 환경용 설정

**주의사항**: 소셜 로그인 시크릿 키 등 민감한 정보는 `socialkey.properties` 파일 등으로 분리되어 관리됩니다.

## 🚀 로컬 서버 실행 방법

### 방법 1. 실행 스크립트 활용 (Windows 환경)
프로젝트 루트 폴더(`koreaTaiwanApi`)에 준비된 배치 스크립트를 사용하면 쉽게 실행할 수 있습니다.
- 로컬 모드 실행: `run-local.cmd`
- QA 모드 실행: `run-qa.cmd`

### 방법 2. Maven Wrapper 활용
콘솔(터미널)에서 아래 명령어를 입력합니다.
```bash
# 로컬 프로파일로 실행
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### 방법 3. IDE 활용
- **IntelliJ**: `src/main/java/` 하위의 `@SpringBootApplication` 어노테이션이 있는 메인 클래스를 찾아 Run/Debug 합니다.
- Run Configuration의 Active profiles 에 `local`을 입력하여 로컬 설정을 적용합니다.

## 📦 빌드(Build) 방법
운영이나 QA 서버에 배포할 WAR 파일을 생성하려면 아래 명령어를 사용합니다. (테스트 제외 시 `-DskipTests` 추가)
```bash
./mvnw clean package -DskipTests
```
빌드 완료 후 `target/` 폴더 내에 `.war` 파일이 생성됩니다. (`ROOT.war`)

---

> 👉 다음 단계: [01. 아키텍처](./01_Architecture_Overview.md)에서 데이터베이스 구조를 파악해 보세요.
