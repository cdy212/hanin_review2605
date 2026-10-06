# 한인회 로컬 브라우저 QA 실행 기록

실행일: 2026-10-04 (Asia/Seoul). 본 기록은 실제 로컬 화면 확인 결과이다. 전체 업무 사이클 E2E 완료를 의미하지 않는다.

## 환경과 범위

- 사용자/제휴업체 프론트: `http://localhost:8088`, 로컬 Expo 소스 실행. 정상 로그인 전 공개 화면과 인증 보호를 읽기 전용으로 확인했다.
- 운영 콘솔: `http://localhost:8090/admin/`, 백엔드 프로젝트의 static 소스를 로컬 정적 서버로 제공한 템플릿 미리보기. API·인증·DB 연동은 실행하지 않았다.
- 브라우저: Codex In-app Browser, CUA. 원래 Chrome 탭 조회는 브라우저 요청 정책 로딩 오류로 실패하여 로그인된 운영 탭 존재를 확인할 수 없었다.
- `127.0.0.1:7777` 백엔드가 기동되지 않은 환경이어서 정상 로그인, 데이터 조회·저장·승인·쿠폰 사용을 검증하지 않았다. 계정 추측, 인증 토큰 주입, API 모킹을 하지 않았다.
- 캡처에는 비밀번호, 토큰, 실사용자 데이터가 없다. 가입 화면의 프로필명은 새 화면에서 자동 생성된 초기값이다.

## 테스트 결과

PASS는 해당 행의 좁은 기대 결과가 확인되었음을 의미한다. PREVIEW는 정적 양식 확인만 의미하며 통합 기능 통과가 아니다.

| TC ID | 항목/URL | 기대 결과 | 실제 결과 | 판정 | 증빙 |
|---|---|---|---|---|---|
| B-01 | `/login` | 로그인 폼이 렌더된다 | 아이디/비밀번호, 로그인, 회원가입/찾기, SNS 진입 표시 | PASS | 01 |
| B-02 | `/register` | 가입 입력 폼이 렌더된다 | ID/메일/프로필명/비밀번호, 동의, 메일발송, 등록/취소 표시. 입력·제출 미실행 | PASS | 02 |
| B-03 | `/terms/privacy` | 비로그인 상태에서 방침 본문이 보인다 | 본문과 약관·위치·마케팅 동의 링크 표시 | PASS | 03 |
| B-04 | `/membership` | 비로그인 접근 시 로그인으로 이동한다 | 로딩 후 `/login`으로 이동 | PASS | 04 |
| B-05 | `/main` | 비로그인 접근 시 로그인으로 이동한다 | 로딩 후 `/login`으로 이동 | PASS | 05 |
| B-06 | `/admin/login` (8088) | 제휴업체 로그인 진입 화면 표시 | 로그인 화면 렌더. 사용자 로그인과 동일 환영 문구 표시 | PASS | 11 |
| B-07 | `/admin/index.html` (8090) | 운영자 로그인 템플릿 표시 | 관리자 로그인/운영 콘솔/아이디/비밀번호 표시 | PREVIEW | 06 |
| B-08 | `/admin/index.html?section=mainContent` (8090) | 인증 전 로그인 템플릿 표시 | 로그인 폼 표시, 메인 편집으로 진입하지 않음 | PREVIEW | 10 |
| B-09 | `/admin/cms.html` (8090) | CMS 필드 구조 확인 | TOP/Middle, 제목/내용/링크/순서/이미지/노출/저장 양식 존재 | PREVIEW | 07 |
| B-10 | `/admin/membership.html` (8090) | 회원 신청 검색/승인 양식 구조 확인 | 유형/상태/검색, 신청 목록, 상세 심사 영역 존재 | PREVIEW | 08 |
| B-11 | `/admin/coupons.html` (8090) | 쿠폰 관리 양식 구조 확인 | 검색/신규등록/목록, 발행자/대상자/다운로드 이용자 필터와 CSV 영역 존재 | PREVIEW | 09 |
| B-12 | 로그인→CMS 변경→사용자 메인 | 동일 데이터 노출 확인 | 백엔드 및 승인된 계정 필요 | NOT RUN | — |
| B-13 | 정회원/제휴 신청→운영 승인 | 신청 상태와 권한 전환 확인 | 백엔드·테스트 데이터 변경 실행 조건 필요 | NOT RUN | — |
| B-14 | 업체 등록→쿠폰 등록→사용자 사용→이력 | 실제 생성·사용·상태 및 재사용 차단 | 전체 업무 사이클 미실행 | NOT RUN | — |

프론트 탭에서 B-01~B-05 방문 후 수집한 error 레벨 콘솔 로그는 0건이었다. 이는 당시 방문한 공개/인증 보호 화면 범위이며 로그인 이후 화면의 오류가 없다는 증거가 아니다. 프론트 경로 이동 직후 일시적인 빈 DOM이 있었으나 다음 상태 관찰에서 정상 화면 또는 인증 리다이렉트가 확인되었다.

운영 콘솔 단독 HTML fragment는 원래 index 내부에서 로드되는 양식이다. 정적 단독 미리보기에서는 공통 CSS/스크립트/데이터가 적용되지 않는다. 쿠폰 양식에서는 원래 스크립트가 제어하는 모달이 겹쳐 보이므로 실제 운영 화면 배치를 판단하는 자료로 쓰지 않는다. 초기 정적 응답의 charset 미지정 문제는 미리보기 서버의 `text/html; charset=utf-8` 응답으로 해소했다. 브라우저 캐시를 갱신하기 위해 `?preview=utf8`로 재접속해 한글 정상 표시를 확인하고 07~09 이미지를 교체했다. 원본 앱 소스는 변경하지 않았다.

## 스크린샷

실제 사용자 로그인 화면:

![사용자 로그인](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/01-user-login.jpg)

가입 양식, 입력 및 제출 전:

![회원가입 양식](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/02-user-register.jpg)

개인정보 방침 상단:

![개인정보 방침](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/03-privacy.jpg)

정회원 비로그인 인증 보호, 최종 로그인 화면:

![정회원 인증 보호 결과](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/04-membership-auth-guard.jpg)

사용자 메인 비로그인 인증 보호, 최종 로그인 화면:

![메인 인증 보호 결과](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/05-main-auth-guard.jpg)

운영자 로그인 정적 템플릿:

![운영자 로그인 템플릿](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/06-operator-login-template.jpg)

CMS 단독 정적 fragment, 데이터 및 공통 스타일 미적용:

![CMS 정적 양식](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/07-cms-fragment-static.jpg)

회원 승인 단독 정적 fragment, 실제 신청 데이터 조회 미실행:

![회원 승인 정적 양식](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/08-membership-fragment-static.jpg)

쿠폰 단독 정적 fragment, 실제 쿠폰 생성/조회/사용 미실행:

![쿠폰 정적 양식](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/09-coupons-fragment-static.jpg)

운영 콘솔 CMS 딥링크 정적 로그인 템플릿:

![운영 콘솔 딥링크 로그인](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/10-operator-cms-auth-template.jpg)

제휴업체 로그인:

![제휴업체 로그인](C:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/11-partner-login.jpg)

## 다음 실 E2E 실행에 필요한 조건

1. `7777` 백엔드 기동, 대상 QA DB/계정/환경 확인. 현재 화면 캡처만으로 DB 연동 여부를 추정하지 않는다.
2. 일반회원, 정회원 대기/승인, 제휴업체 대기/승인, 운영자 계정과 데이터 소유권 확인. 비밀번호·토큰은 지침·상태파일·캡처에 넣지 않는다.
3. 메일 발송, 가입 동의, 회원 심사, 업체/쿠폰 생성 및 사용의 테스트 대상과 변경 범위를 확정한다. 운영 데이터에 임의 실사용 처리하지 않는다.
4. 운영자 화면을 실제 index의 인증된 메뉴에서 열어 공통 스타일, API 결과, 성공 알림을 확인한다. 단독 fragment 이미지를 실운영 완료 화면으로 재사용하지 않는다.
5. 각 업무 사이클에 변경 전 상태, 생성된 테스트 객체 ID, 역할별 확인 URL, 변경 후 상태, 사용자 화면, 오류/실패 사례를 기록한다.
6. 토큰 만료/재개 테스트는 로그인 후 토큰 TTL·refresh 응답·원 요청 재시도를 별도로 검증한다. AI 사용량 만료/작업 재개와 서비스 인증 만료를 구분한다.

실행 절차는 기존 `koreaTaiwan/LOCAL_TEST_GUIDE.md`를 우선 확인한다. E2E 스킬에서 명명한 `ask_question` 및 `browser_subagent` 전용 도구는 현재 제공되지 않아 부모 에이전트의 작업 범위 지시에 따라 collaboration 브라우저 담당과 CUA를 사용했다. 별도 실 E2E 실행 계획과 승인/조건은 AI QA 워크플로우 문서에서 관리한다.

## 완성 문서 렌더 QA

2026-10-04, Chrome/CUA에서 `http://localhost:8091/한인회_최종QA_문서.html`을 실제 열어 한글 제목·본문·목차를 확인했다. 목차 8개의 대상이 모두 존재했고 E2E 재실행 지침을 클릭한 뒤 `#doc-5`로 이동하여 해당 섹션 상단이 화면 안에 위치하는 것을 확인했다. 표 18개와 내장 이미지 17개가 로드되었으며 모든 이미지의 원본 크기는 1280×720, 로드 실패는 0개였다. 확인한 데스크톱 viewport 너비 1433px에서 문서 scrollWidth는 1415px로 페이지 가로 넘침이 없었다. 상단 화면은 `screenshots/12-document-reader.jpg`로 저장한 뒤 파일을 직접 열어 한글·레이아웃을 확인했다. 이 결과는 문서 읽기 화면의 렌더 검증이며 실제 신청·승인·쿠폰 사용 E2E 판정을 추가하지 않는다. 모바일/인쇄 레이아웃과 링크 대상의 외부 접근은 별도 미검증이다.
