# E2E 테스트 태스크 03~07: 로그인 사용자 핵심 플로우 및 운영자 동기화 검증 보고서

- 문서 식별자: `0_task03_user_auth_cycle.md`
- 실행 일시: 2026-10-06 (Asia/Seoul)
- 실행 식별자 (Run ID): `QA_20261006_LIVE`
- 검증 도구: `browser_subagent`
- 대상 환경: LIVE 운영 환경 (`https://koreans.tw`)
- 검증 사용자 세션: 닉네임 `랑하` (`google_107226787888491879892`, `ROLE_REGULAR`)
- 운영자 세션: 아이디 `cdy212` (`ROLE_ADMIN`)
- 연결 보고서: [0_final_e2e.md](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/0_final_e2e.md), [0_final_e2e_report.html](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/0_final_e2e_report.html)
- 규칙 준수: 이모지 미사용, 민감 정보(비밀번호, 토큰 등) 미포함

---

## 1. 개요 및 목적

운영자 콘솔(`cdy212`)과 사용자 웹(소셜 로그인 세션 `랑하`) 양방향 환경에서 실제 사용자 로그인 세션 유지, 메인 화면 대시보드 렌더링, 마이페이지 프로필 및 권한 뱃지 표기, 멤버십 신청 상태(승인/반려 이력), 한인맵(스토어) 권한 가드 동작을 실시간 E2E로 검증하였습니다.

---

## 2. 테스트 결과 요약표

| TC ID | 기능 단위 | 요청 URL | 기대 결과 | 실제 동작 | 판정 | 증빙 이미지 |
|---|---|---|---|---|---|---|
| TC-AUTH-04 | 사용자 로그인 세션 | /login | 소셜 로그인 완료 후 메인 리다이렉트 및 토큰 유지 | 로그인 완료 후 세션 정상 생성, /main 자동 진입 성공 | PASS | [user_login_social.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/user_login_social_1791249816292.png) |
| TC-MAIN-01 | 메인 피드 & 쿠폰함 | /main | TOP 배너, 카테고리 퀵메뉴, 보유 쿠폰 목록, 피드 렌더 | 배너 캐러셀, 내 쿠폰 9건 보유 목록, 게시글 피드 정상 로딩 | PASS | [main_logged_in.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/main_logged_in_1791249953461.png) |
| TC-USER-01 | 마이페이지 프로필 | /mypage | 닉네임, 등급 표기, 활동 내역(글/댓글/좋아요/북마크) | 닉네임 "랑하", [ 정회원 ] 등급 표기, 활동 탭 무오류 | PASS | [mypage_logged_in.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/mypage_logged_in_1791249967099.png) |
| TC-MEM-01 | 멤버십 신청 현황 | /membership | 등급 신청 상태(승인/반려/대기) 및 재신청 폼 | 정회원(승인 완료) / 제휴업체(반려) 신청 이력 및 재신청 동선 정상 확인 | PASS | [membership_status.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/membership_status_1791249983443.png) |
| TC-STORE-01 | 한인맵 권한 가드 | /store | 지도/업체 목록 표시 및 정회원의 업체등록 권한 통제 | 업체 리스트 정상 렌더, 제휴업체 전용 '+ 업체등록' 버튼 비노출 정상 확인 | PASS | [store_map_logged_in.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/store_map_logged_in_1791249999960.png) |

---

## 3. 세부 분석 및 정합성 검증

1. **운영자 <-> 사용자 권한 동기화:**
   - 운영자 콘솔의 멤버십 관리 화면에서 확인된 승인 내역(정회원 승인)과 사용자 마이페이지 화면의 `[ 정회원 ]` 뱃지 및 등급 권한이 100% 일치함을 확인하였습니다.
2. **권한 기반 기능 제한 (Role-Based Access Control):**
   - 현재 로그인 사용자는 `ROLE_REGULAR` 등급이므로, 한인맵(`https://koreans.tw/store`)에서 제휴업체(`ROLE_PARTNER`) 전용 기능인 '+ 업체 등록' 버튼이 화면에 노출되지 않도록 엄격하게 차단되고 있음을 확인하였습니다.
3. **쿠폰 연동:**
   - 메인 화면에 사용자가 보유한 다운로드 쿠폰 9건(중화민국대만한인회 제휴 할인 쿠폰 등)이 정상 렌더링되고 클릭 시 상세 팝업이 호출됨을 확인하였습니다.
