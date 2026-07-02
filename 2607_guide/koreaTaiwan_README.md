# 프론트엔드 로컬 셋팅 가이드 (koreaTaiwan)

React Native + Expo 기반의 한인회 모바일 앱 클라이언트 로컬 실행 가이드입니다.

> **시작 전 확인**: [공통 사전 셋팅 가이드(README.md)](./README.md)의 Step 1~3 (필수 프로그램 설치 및 DB 구성)이 완료된 상태여야 합니다.

---

## Workflow 1. Yarn 및 Expo CLI 설치

터미널(PowerShell 또는 cmd)에서 아래 명령어를 실행합니다.
*(Node.js 가 설치된 상태에서 진행해야 합니다.)*

```bash
# Yarn 패키지 매니저 전역 설치
npm install -g yarn

# Expo CLI 전역 설치 (앱 구동 도구)
npm install -g expo-cli

# 설치 버전 확인
yarn --version
expo --version
```

---

## Workflow 2. 프로젝트 폴더로 이동 및 패키지 설치

소스 코드를 다운로드한 후 프론트엔드 폴더로 이동하여 패키지를 설치합니다.

```bash
# 프론트엔드 폴더로 이동 (프로젝트 루트 기준)
cd koreaTaiwan

# 프로젝트 구동에 필요한 라이브러리 전체 설치
yarn install
```

> 설치가 완료되면 `node_modules` 폴더가 생성됩니다.

---

## Workflow 3. 앱 실행

설치가 완료되면 아래 명령어로 Expo 개발 서버를 실행합니다.

### 로컬 개발 환경 실행 (권장)

```bash
yarn expo start --tunnel --clear
```

실행 후 터미널에 QR 코드가 나타나면:
- 스마트폰에 **Expo Go** 앱을 설치 후 QR 코드를 스캔하면 실기기에서 바로 확인할 수 있습니다.
- PC의 Android Studio 에뮬레이터를 열고 있다면 `a` 키를 눌러 에뮬레이터에서 실행할 수 있습니다.

### QA 서버 연결 (테스트 서버)

운영체제에 따라 알맞은 명령어를 선택하여 실행합니다.

```powershell
# Windows (PowerShell)
$env:APP_VARIANT="qa"; yarn expo start --tunnel --clear
```

```cmd
# Windows (CMD)
set APP_VARIANT=qa && npx expo start -c
```

```bash
# Mac / Linux
APP_VARIANT=qa yarn expo start -c
```

### LIVE 서버 연결 (운영 서버)

```powershell
# Windows (PowerShell)
$env:APP_VARIANT="live"; yarn expo start --tunnel --clear
```

```bash
# Mac / Linux
APP_VARIANT=live yarn expo start -c
```

---

## Workflow 4. 캐시 초기화 후 재실행 (오류 발생 시)

앱 실행 중 캐시 관련 오류가 발생하면 아래 명령어로 캐시를 완전히 초기화하고 재시작합니다.

```bash
yarn expo start --tunnel --clear
```

---

## Workflow 5. 릴리즈 빌드 (배포용)

앱을 설치 파일(APK/AAB)로 빌드할 때 사용합니다.
*(EAS CLI 및 Expo 계정 로그인 상태에서만 가능합니다.)*

```bash
# Android Preview 빌드 생성
eas build -p android --profile preview
```

---

## 참고 사항

| 항목 | 값 |
|---|---|
| Google API Key | `331739821804-82eobrek98d3hro3f2do6vnebut8qto7.apps.googleusercontent.com` |
| Android Build JDK | `org.gradle.java.home=C:\Program Files\Microsoft\jdk-17.0.15.6-hotspot` |

---

> 문제가 발생한다면 공통 가이드 [README.md](./README.md)를 다시 확인하거나, 백엔드 서버 [koreaTaiwanApi_README.md](./koreaTaiwanApi_README.md)가 정상 실행 중인지 확인하세요.
