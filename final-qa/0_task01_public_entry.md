# E2E 테스트 태스크 01 & 02 & 10: 공개 진입점 및 권한 가드 검증 보고서

- 문서 식별자: `0_task01_public_entry.md`
- 실행 일시: 2026-10-06 (Asia/Seoul)
- 실행 식별자 (Run ID): `QA_20261006_LIVE`
- 검증 도구: `browser_subagent`
- 대상 환경: LIVE 운영 환경 (`https://koreans.tw`)
- 연결 보고서: [0_final_e2e.md](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/0_final_e2e.md), [0_final_e2e_report.html](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/0_final_e2e_report.html)
- 규칙 준수: 이모지 미사용, 절대/상대 경로 증빙 링크 제공

---

## 1. 개요 및 목적

운영 중인 LIVE 배포 도메인(`https://koreans.tw`)을 대상으로 사용자 웹 및 관리자 콘솔의 진입 무결성, 폼 렌더링 정상 여부, 보호 라우트의 비인가 차단(리다이렉트) 가드 동작을 실제 브라우저 자동화를 통해 검증하였습니다.

---

## 2. 테스트 결과 요약표

| TC ID | 기능 단위 | 요청 URL | 최종 도달 URL | 기대 결과 | 실제 동작 | 판정 | 증빙 이미지 |
|---|---|---|---|---|---|---|---|
| TC-AUTH-01 | 로그인 폼 무결성 | https://koreans.tw/login | https://koreans.tw/login | 폼 필드/버튼 정상 표시, 무오류 | 타이틀 "중화민국대만한인회", 폼 렌더 정상, 콘솔 에러 0건 | PASS | [step1_login_page.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/step1_login_page_1791248975292.png) |
| TC-AUTH-02 | 회원가입 폼 무결성 | https://koreans.tw/register | https://koreans.tw/register | 약관 동의 및 가입 입력 폼 렌더 | 아이디/이메일/인증발송/비번/약관동의 체크박스 정상 표시 | PASS | [step2_register_page.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/step2_register_page_1791248999558.png) |
| TC-AUTH-03A | 메인화면 비인가 가드 | https://koreans.tw/main | https://koreans.tw/login | 비로그인 차단 및 로그인 리다이렉트 | 보호 가드 정상 동작, 로그인 화면으로 즉시 전환 | PASS | [step3_main_page_redirect.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/step3_main_page_redirect_1791249020925.png) |
| TC-AUTH-03B | 멤버십 비인가 가드 | https://koreans.tw/membership | https://koreans.tw/login | 비로그인 차단 및 로그인 리다이렉트 | 보호 가드 정상 동작, 로그인 화면으로 전환 | PASS | [step4_membership_page_redirect.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/step4_membership_page_redirect_1791249041136.png) |
| TC-AUTH-03C | 한인맵 비인가 가드 | https://koreans.tw/store | https://koreans.tw/login | 비로그인 차단 및 로그인 리다이렉트 | 보호 가드 정상 동작, 로그인 화면으로 전환 | PASS | [step5_store_page_redirect.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/step5_store_page_redirect_1791249060103.png) |
| TC-ADMIN-01 | 관리자 콘솔 접근 통제 | https://koreans.tw/admin/index.html | https://koreans.tw/admin/index.html | 비인가 대시보드 미노출, 관리자 로그인 요구 | "관리자 로그인" 폼 표시, 인증 전 내부 콘솔 노출 차단 확인 | PASS | [step6_admin_login_prompt.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/step6_admin_login_prompt_1791249079585.png) |

---

## 3. 세부 검증 내역

### 3.1 TC-AUTH-01: 로그인 폼 무결성 검증
- 요청 URL: `https://koreans.tw/login`
- 관찰 내용:
  - 브라우저 타이틀: "중화민국대만한인회"
  - 아이디 입력란 (`placeholder="아이디"`)
  - 비밀번호 입력란 (`placeholder="비밀번호"`)
  - 아이디 저장 체크박스
  - 로그인 버튼
  - 하단 링크: "회원가입", "아이디 찾기", "비밀번호 찾기"
  - SNS 로그인 버튼 (네이버, 카카오, 구글)
  - JavaScript 콘솔 오류: 없음 (0건)
- 판정: PASS

### 3.2 TC-AUTH-02: 회원가입 폼 무결성 검증
- 요청 URL: `https://koreans.tw/register`
- 관찰 내용:
  - 아이디 입력란 (`placeholder="사용하실 아이디 (4자 이상)"`)
  - 이메일 입력란 및 "메일발송" 버튼
  - 닉네임 자동 추천 필드
  - 비밀번호 입력란 (`placeholder="비밀번호 (4자 이상)"`)
  - 이용약관 및 개인정보취급방침 동의 체크박스 및 모달 링크
  - "등록하기", "취소" 버튼
  - SNS 간편가입 버튼 (네이버, 카카오, 구글)
  - JavaScript 콘솔 오류: 없음 (0건)
- 판정: PASS

### 3.3 TC-AUTH-03A, 03B, 03C: 보호 라우트 권한 가드 검증
- 요청 URL: `/main`, `/membership`, `/store`
- 관찰 내용:
  - 인증 세션이 없는 브라우저에서 직접 URL을 입력하여 진입을 시도함.
  - 3개 경로 모두 즉시 내부 클라이언트 라우팅 가드가 동작하여 `https://koreans.tw/login`으로 리다이렉트됨.
  - 비인가 상태에서 민감 사용자 정보, 메인 피드, 멤버십 신청서, 업체 등록 UI가 노출되지 않음을 확인.
- 판정: PASS

### 3.4 TC-ADMIN-01: 관리자 콘솔 접근 제어 검증
- 요청 URL: `https://koreans.tw/admin/index.html`
- 관찰 내용:
  - 관리자 세션 쿠키/토큰이 없는 상태에서 접근 시, 관리자 대시보드(CMS, 회원 목록, 심사 내역 등)가 노출되지 않음.
  - "중화민국대만한인회 운영 콘솔 - 관리자 로그인" 모달 폼이 전면에 렌더링되어 아이디/비밀번호 입력을 요구함.
- 판정: PASS

---

## 4. 증빙 이미지 목록

- 로그인 페이지: `app/docs/final-qa/screenshots/step1_login_page_1791248975292.png`
- 회원가입 페이지: `app/docs/final-qa/screenshots/step2_register_page_1791248999558.png`
- 메인 리다이렉트: `app/docs/final-qa/screenshots/step3_main_page_redirect_1791249020925.png`
- 멤버십 리다이렉트: `app/docs/final-qa/screenshots/step4_membership_page_redirect_1791249041136.png`
- 한인맵 리다이렉트: `app/docs/final-qa/screenshots/step5_store_page_redirect_1791249060103.png`
- 관리자 콘솔 가드: `app/docs/final-qa/screenshots/step6_admin_login_prompt_1791249079585.png`
