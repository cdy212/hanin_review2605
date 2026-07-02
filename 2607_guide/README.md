# 대만 한인회 어플리케이션 - 로컬 환경 셋팅 가이드

본 문서는 프로젝트를 처음 접하는 개발자가 로컬 환경을 구성하기 위한 **공통 사전 셋팅 가이드**입니다.
아래의 순서를 그대로 따라 진행하면 됩니다.

- 프론트엔드(React Native/Expo) 설치 가이드: [koreaTaiwan_README.md](./koreaTaiwan_README.md)
- 백엔드(Spring Boot API) 설치 가이드: [koreaTaiwanApi_README.md](./koreaTaiwanApi_README.md)
- 라이선스: [LICENSE.md](./LICENSE.md)

---

## Step 1. 필수 프로그램 설치

프로젝트 전체(프론트 + 백엔드)를 구동하기 위해 아래 세 가지 프로그램이 PC에 설치되어 있어야 합니다.
설치 링크를 클릭하여 각 공식 사이트에서 다운로드 후 설치하세요.

| 구분 | 프로그램 | 권장 버전 | 다운로드 |
|---|---|---|---|
| 공통 | Git | 최신 버전 | https://git-scm.com/downloads |
| 프론트엔드 | Node.js | LTS(짝수) 버전 | https://nodejs.org/ko/ |
| 백엔드 | Java JDK | 17 버전 | https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html |
| DB | MySQL | 8.0 이상 | https://dev.mysql.com/downloads/installer/ |

> **Java JDK 설치 후 환경 변수 설정 필수**
> Windows 기준: [내 PC] 우클릭 > 속성 > 고급 시스템 설정 > 환경 변수 > `JAVA_HOME` 변수 값에 JDK 설치 경로 입력
> 예: `C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot`

---

## Step 2. 소스 코드 다운로드

터미널(PowerShell 또는 cmd)을 열고 아래 명령어를 순서대로 실행합니다.

```bash
# 프로젝트 전체 소스 코드 다운로드
git clone https://github.com/seungminlee21137/ApplicationKoreaTaiwan

# 다운로드된 프로젝트 폴더로 이동
cd ApplicationKoreaTaiwan
```

---

## Step 3. DB 로컬 설치 (초기 데이터베이스 구성)

프론트/백엔드를 실행하기 전, **MySQL 데이터베이스를 먼저 구성**해야 합니다.
`docs/twone_init_dump.sql` 파일이 초기 셋팅용 DB 스크립트입니다.

### 3-1. 데이터베이스(스키마) 생성

MySQL 클라이언트(MySQL Workbench, DBeaver 등) 또는 터미널에서 접속한 후, 아래 명령어를 실행합니다.

```sql
-- MySQL 접속 후 실행 (비밀번호 입력)
mysql -u root -p

-- DB(스키마) 생성
CREATE DATABASE IF NOT EXISTS twone
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

-- 생성 확인
SHOW DATABASES;

-- MySQL 종료
EXIT;
```

### 3-2. 덤프(Dump) 스크립트 실행

생성된 `twone` 데이터베이스에 테이블과 초기 데이터를 삽입합니다.
터미널에서 프로젝트 최상위 폴더(`ApplicationKoreaTaiwan`) 경로에서 아래 명령어를 실행합니다.

```bash
# 터미널에서 바로 실행 (비밀번호 입력 필요)
mysql -u root -p twone < docs/twone_init_dump.sql
```

> **MySQL Workbench / DBeaver 사용 시**
> `docs/twone_init_dump.sql` 파일을 열어 전체 선택 후 실행해도 동일한 결과입니다.


<div style="background-color:#f0fdf4; border:1px solid #16a34a; border-left: 6px solid #16a34a; padding:24px; border-radius:8px; margin: 24px 0;">
    <h3 style="margin-top:0; margin-bottom:12px; color:#166534; font-size: 18px;">💾 초기 데이터베이스(Dump) 파일 다운로드</h3>
    <p style="color:#15803d; font-size:14px; margin-bottom:16px;">
        해당 파일을 다운로드 받아서 직접 MySQL 툴(DBeaver, Workbench 등)에서 스크립트를 열고 전체 실행하시면 편리합니다.
    </p>
    <a href="./twone_init_dump.sql" download style="display:inline-block; background-color:#16a34a; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600; font-size:15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        📥 twone_init_dump.sql 파일 다운로드
    </a>
</div>

### 3-3. 설치 확인

```bash
# MySQL 재접속
mysql -u root -p

# 테이블 목록 확인
USE twone;
SHOW TABLES;

EXIT;
```

정상적으로 테이블 목록이 출력되면 DB 셋팅이 완료된 것입니다.

---

## Step 4. 프론트 / 백엔드 셋팅 진행

DB 구성이 완료되었다면, 아래 각 가이드 문서를 참고하여 셋팅을 이어서 진행하세요.

- **백엔드(API 서버) 셋팅**: [koreaTaiwanApi_README.md](./koreaTaiwanApi_README.md)
  - Spring Boot 서버를 먼저 켜야 프론트엔드가 정상 동작합니다.
- **프론트엔드(앱 클라이언트) 셋팅**: [koreaTaiwan_README.md](./koreaTaiwan_README.md)
  - 백엔드 서버가 실행 중인 상태에서 진행합니다.

---

## License

본 프로젝트에 대한 저작권 및 라이선스 규정은 [LICENSE.md](./LICENSE.md)를 확인하세요.