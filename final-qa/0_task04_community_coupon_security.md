# E2E 테스트 태스크 08, 09, 10: 쿠폰 PIN, 커뮤니티 게시글 및 보안 XSS 방어 검증 보고서

- 문서 식별자: `0_task04_community_coupon_security.md`
- 실행 일시: 2026-10-06 (Asia/Seoul)
- 실행 식별자 (Run ID): `QA_20261006_LIVE`
- 검증 도구: `browser_subagent`
- 대상 환경: LIVE 운영 환경 (`https://koreans.tw`)
- 연결 보고서: [0_final_e2e.md](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/0_final_e2e.md), [0_final_e2e_report.html](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/0_final_e2e_report.html)
- 규칙 준수: 이모지 미사용, 민감 정보 미포함

---

## 1. 개요 및 목적

사용자 세션(`랑하`) 환경에서 쿠폰 상세 화면의 바코드 및 오프라인 보안 PIN 노출 상태, 커뮤니티 게시글 상세 열람 및 사용자 상호작용(좋아요, 북마크, 댓글) 무결성, 그리고 검색 입력창에 악성 스크립트 인젝션(XSS) 시도 시의 보안 방어 메커니즘을 실제 브라우저 자동화로 검증하였습니다.

---

## 2. 테스트 결과 요약표

| TC ID | 기능 단위 | 요청 URL | 기대 결과 | 실제 동작 | 판정 | 증빙 이미지 |
|---|---|---|---|---|---|---|
| TC-COUPON-01 | 쿠폰 상세 & 보안 PIN | /coupon/3 | 쿠폰 상세정보, 유효기간, 바코드, 보안 PIN 표시 | 코드 77CCC74E-A7F, 만료일 D-87, 오프라인 보안 PIN 1111 정상 표시 | PASS | [coupon_pin_check.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/coupon_pin_check_1791251019409.png) |
| TC-COMM-01 | 커뮤니티 게시글 상세 | /community/detail/71 | 제목, 작성자 매너온도, 본문, 댓글, 반응 버튼 | 작성자 하이하이(36.5°C), 좋아요 1, 북마크, 신고, 댓글 목록 렌더 정상 | PASS | [post_detail_view.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/post_detail_view_1791251078136.png) |
| TC-SEC-01 | 검색창 XSS 인젝션 방어 | /store 및 /community | 스크립트 태그 삽입 시 무단 실행 없이 안전 텍스트 처리 | `<script>alert('XSS')</script>` 입력 시 팝업 미실행, 안전 이스케이프 및 UI 무오류 | PASS | [xss_search_test.png](file:///c:/Users/dante/Desktop/core_project/대표님/app/docs/final-qa/screenshots/xss_search_test_1791251140620.png) |

---

## 3. 세부 관찰 결과

1. **쿠폰 바코드 및 오프라인 보안 PIN (TC-COUPON-01):**
   - 메인 화면 내 쿠폰함에서 쿠폰을 클릭하여 상세 페이지(`/coupon/3`)로 이동하였습니다.
   - 쿠폰명 `★★★ 한인회 업체 선점 기념 커피 믹스 쿠폰 발행 ★★★`, 유효기간 만료일 카운트다운 `D-87` (2026-12-31 12:00까지), 그리고 현장 확인용 오프라인 보안 PIN `1111`이 정확하게 표시됨을 확인하였습니다.
2. **커뮤니티 및 댓글/반응 동선 (TC-COMM-01):**
   - 커뮤니티 피드에서 게시글(ID 71)을 클릭하여 상세 화면으로 진입하였습니다.
   - 작성자 프로필 및 매너온도(`36.5°C`), 게시글 본문, 좋아요 카운트(`좋아요 1`), 북마크 버튼, 신고 버튼 및 등록된 댓글 목록이 빈 화면이나 깨짐 없이 완벽하게 렌더링되었습니다.
3. **보안 엣지 테스트 - XSS 방어 (TC-SEC-01):**
   - 스토어 검색창 및 커뮤니티 검색창에 `<script>alert('XSS')</script>` 문자열을 입력하고 검색을 실행하였습니다.
   - 브라우저 alert 다이얼로그나 임의 스크립트 실행이 일절 발생하지 않았으며, React/DOM 상태에서 텍스트 노드로 안전하게 이스케이프되어 처리됨을 확인하였습니다.
