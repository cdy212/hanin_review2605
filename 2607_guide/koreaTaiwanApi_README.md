# 백엔드 로컬 셋팅 가이드 (koreaTaiwanApi)

Spring Boot + MySQL 기반의 한인회 API 서버 로컬 실행 가이드입니다.

> **시작 전 확인**: [공통 사전 셋팅 가이드(README.md)](./README.md)의 Step 1~3 (Java JDK 17 설치, DB 구성)이 완료된 상태여야 합니다.

---

## Workflow 1. 프로젝트 폴더 이동

소스 코드가 다운로드된 프로젝트 루트에서 백엔드 폴더로 이동합니다.

```bash
cd koreaTaiwanApi
```

---

## Workflow 2. application.properties 설정

DB 접속 정보를 로컬 환경에 맞게 수정합니다.

파일 경로: `src/main/resources/application.properties`

아래 항목을 찾아 본인의 MySQL 로컬 계정 정보로 변경합니다.

```properties
# DB 접속 정보 수정 (로컬 MySQL 기준)
spring.datasource.url=jdbc:mysql://localhost:3306/twone?useSSL=false&serverTimezone=Asia/Seoul&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=<본인의 MySQL 비밀번호>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

> **주의**: 비밀번호를 소스 코드에 직접 입력 후, 해당 파일이 `.gitignore`에 포함되어 있는지 반드시 확인하세요.

---

## Workflow 3. 프로젝트 빌드

터미널에서 아래 명령어를 실행하여 프로젝트를 빌드합니다.
*(빌드 시 단위 테스트는 생략합니다.)*

### Windows 환경

```cmd
gradlew.bat build -x test
```

### Mac / Linux 환경

```bash
# 최초 1회만 실행 (실행 권한 부여)
chmod +x gradlew

# 빌드 실행
./gradlew build -x test
```

> 빌드가 완료되면 터미널에 `BUILD SUCCESSFUL` 메시지가 출력됩니다.

---

## Workflow 4. 서버 실행

빌드 완료 후 Spring Boot 서버를 시작합니다.

### Windows 환경

```cmd
gradlew.bat bootRun
```

### Mac / Linux 환경

```bash
./gradlew bootRun
```

> 서버가 정상적으로 실행되면 아래와 같은 메시지가 출력됩니다.
> `Started KoreaTaiwanApiApplication in X.XXX seconds`
>
> 이 상태로 터미널 창을 **닫지 말고** 유지합니다.
> 프론트엔드 실행은 **새 터미널 창**을 열어서 진행하세요.

---

## Workflow 5. 서버 동작 확인

서버가 실행된 후, 브라우저 또는 API 클라이언트(Postman 등)에서 아래 주소로 접근하여 정상 응답을 확인합니다.

```
http://localhost:8080
```

---

## 참고: IDE에서 실행하는 방법 (IntelliJ IDEA 권장)

터미널 명령어 대신 IDE를 사용하는 경우:

1. IntelliJ IDEA에서 `koreaTaiwanApi` 폴더를 프로젝트로 열기
2. Gradle 프로젝트 자동 임포트가 완료될 때까지 대기
3. `src/main/java/.../KoreaTaiwanApiApplication.java` 파일을 열기
4. 클래스 옆의 실행 버튼(초록색 삼각형) 클릭 또는 `Shift+F10`으로 실행

---

## Tech Stack

| 기술 | 설명 |
|---|---|
| Spring Boot | 애플리케이션 프레임워크 |
| Spring Security | 인증 및 권한 관리 |
| JPA / Hibernate | ORM (DB 연동) |
| JJWT | JWT 토큰 기반 인증 |
| Lombok | 코드 간소화 |
| MySQL Connector | MySQL 드라이버 |

---

> 프론트엔드 실행 가이드는 [koreaTaiwan_README.md](./koreaTaiwan_README.md)를 참고하세요.
