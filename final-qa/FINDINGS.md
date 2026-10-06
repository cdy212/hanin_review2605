# 추가 확인 사항·소스 정합성 후보

작성일: 2026-10-04. 아래는 현재 소스 관찰 결과다. 실제 테스트 환경에서 재현하지 않은 항목을 “실서버 장애 확정”으로 표현하지 않는다. 이번 작업은 QA 문서 작성이며 애플리케이션 코드를 수정하지 않았다. 구체적인 파일·행 번호는 SOURCE_MAP.md와 source_inventory.json을 따른다.

## 가입 추가 확인 — 2026-10-06

- 일반 가입 인증코드는 AuthController의 메모리 Map에 저장되고 일치 검증 후 제거된다. 확인한 코드에는 TTL 검사가 보이지 않는다. 만료 안내 문구와 실제 만료 처리는 구분하고 유효시간 정책·서버 재시작/다중 인스턴스 시 인증 유지 여부를 확인한다. SIGNUP-03/04.
- Google 가입 프론트는 socialId를 보내지만 서버 Google 분기는 username 구성 후 request.getProviderId()로 socialId를 다시 읽는다. 가입 응답·프로필·재로그인에서 동일 계정 ID가 유지되는지 실제 확인한다. null 영향은 미재현이며 단정하지 않는다. SOCIAL-01/04.
- 소셜 가입 서버는 username/email 중복 시 409를 반환한다. 일반/소셜 간 이메일 충돌의 계정 연결 정책과 오류 후 로그인 동선을 확인한다. SOCIAL-04/05.
- 이메일 미제공 시 임시 주소, 프로필 이미지 null 분기가 있다. 제공자·플랫폼별 동작과 사용자 프로필 정책을 확인한다. SOCIAL-08/09.
- 일반 가입 서버는 요청 role에 admin 분기가 있고, 일반 가입 UI는 role을 전송하지 않는다. 정상 신규 가입의 ROLE_USER 및 비승인 권한 부여 차단을 승인된 QA 환경에서 추가 확인해야 한다. 서버 접근 통제 영향은 이번 문서 보완에서 미검증이다. SIGNUP-01.

이번 추가 항목은 소스 관찰과 검증 계획이며, 실제 가입·메일·OAuth 인증 성공 증거가 아니다.

| ID | 우선순위 | 소스에서 확인한 사실 | 실제 영향/다음 확인 | 연관 TC |
|---|---|---|---|---|
| F-01 | 높음 | home/index.js의 내 쿠폰 영역이 `/coupon/list?status=ALL` 사용, 실제 내 쿠폰은 `/coupon/myCoupons` | 미보유 쿠폰 노출·사용 상태 불일치 여부를 R 계정으로 비교 | MAIN-07 |
| F-02 | 높음 | CouponController의 `/{code}/use`는 service 사용완료 후 `isUsed()`면 오류 반환. UI는 `/use` 경로 사용 | 기존 코드형 경로에서 저장 성공+HTTP 실패가 함께 발생하는지 새 테스트 쿠폰으로 확인 | COUPON-08 |
| F-03 | 높음 | MembershipService.create는 기타 사유를 `기타` 문자열일 때만 저장, 프론트는 `etc_regular`/`etc_partner` 전송 | 신규 기타사유 소실 여부를 신청→운영 상세로 확인. update의 OR 조건도 별도 확인 | MEM-06 |
| F-04 | 높음 | 멤버십 apply 시 역할 추가, cancel 시 삭제. reject/request 변경에는 삭제 분기 없음, 역할 ID 3/4 고정 | 승인 취소·반려 정책 및 QA roles 매핑 확인. 승인후 유형 변경 시 이전 역할 잔존 확인 | MEM-07 |
| F-05 | 높음 | PERSONAL 생성/수정은 targetUsers 목록, 다운로드 검사는 단일 targetUser. 대상 sync는 CouponUser 매핑 생성 | 여러 지정 회원이 실제 발급·보관·사용 가능한지, 미대상 차단 여부 확인 | COUPON-04 |
| F-06 | 높음 | PlaceController 등록에 PARTNER 선언 검증은 보이지 않고 v2 일반 경로 permitAll 규칙이 있음. 수정/삭제에는 소유자 검사 | 일반 ROLE_USER로 등록 API가 허용되는지 테스트 환경에서 확인. 프론트 + 버튼 숨김만으로 서버 권한 보장 안 됨 | STORE-03 |
| F-07 | 확인 | `/store/manage/create`는 `/store`로 redirect; 실제 + 버튼은 ROLE_PARTNER 조건 | 잘못된 등록 URL을 매뉴얼에서 제외 완료. 실제 모달 등록→지도 갱신은 미실행 | STORE-01 |
| F-08 | 중간 | membership.js nativeFetch는 HTTP 실패 throw, HTTP성공 비JSON body는 POST/PUT에서 BYPASS_SUCCESS 반환 | 200 오류문서/잘못된 본문이 UI 성공으로 보이는지 확인, 저장 후 재조회 필수 | MEM-08 |
| F-09 | 중간 | membership 화면 cancel에 별도 표시 없음; request/apply/reject 외 미신청 표시 | 취소 상태가 사용자에게 오해를 주는지 정책 확인 | MEM-04 |
| F-10 | 중간 | useTokenFetch는 401·403 모두 refresh, 예외 시 Response가 아닌 일반 객체 반환. 메인/지도 일부는 직접 fetch | 권한 부족403에서 반복갱신/로그아웃·장애시 JSON 처리 오류·직접fetch 만료 처리 확인 | AUTH-09, USER-11 |
| F-11 | 중간 | 쿠폰 사용 수량/사용 플래그 변경은 트랜잭션 내 읽기→쓰기 형태 | 동시 사용 시 중복 이력·선착순 초과 방지 여부는 소량 통제된 통합 검증 필요 | COUPON-09 |
| F-12 | 확인 | 로그 화면은 예정 placeholder, dashboard/boards 메뉴 숨김, partners.html 잔존 | 운영 완료 범위와 공지/뉴스 관리 진입 경로 확정 | USER-05 |
| F-13 | 확인 | 추천 업체 메인은 places 첫 페이지 size5 조회. 별도 운영 승인 단계는 확인 안 됨 | 정렬·제휴노출·등록후노출 정책 확인, 회원권한승인과 업체승인 혼동 방지 | STORE-06 |
| F-14 | 높음 | 현재 ApiLoggingFilter.java도 요청/응답 본문을 그대로 INFO 기록하며 인증 API 제외 분기가 없다. 과거 보고서에도 노출이 기록됨 | 실제 로깅 활성 여부/응답 필드는 미확인. 로그인 실행 전 인증 본문 로깅을 차단하는 실행 구성 확인, 공유 로그 원문 수집 금지 | AUTH-04 |

## 현재 실행 장애와 필요한 입력

- 로컬 API 7777은 미기동. 프론트 공개/인증 보호 화면만 검증했다.
- 실제 쓰기 테스트 대상 URL/DB 식별과 역할별 승인된 계정 준비 위치가 필요하다. 사용자에게 비동기 질문 전달 완료. 운영 도메인 koreans.tw 쓰기를 임의 실행하지 않았다.
- 로그인된 기존 Chrome 세션은 CUA request-header policy 로딩 오류로 inventory 조회 실패. IAB 신규 탭의 로컬 검증은 성공.
- 공개화면 PASS 6건과 정적 PREVIEW 5건을 기능별 전체 QA PASS 수로 합산하지 않는다.
- 관리자 미리보기 단독 HTML은 공통 CSS/JS 없이 양식만 렌더되므로 실제 관리자 레이아웃 검증은 계정 준비 후 다시 수행한다.

## 재실행 우선순위

1. 실제 환경·역할 계정 확인, 로그인 성공과 운영자 세션 확보.
2. MAIN-01→MEM-01/02→STORE-01→COUPON-01/02의 정상 사이클을 캡처와 함께 완료.
3. F-01~F-06과 PERSONAL/LIMITED/권한·취소 케이스를 우선 확인.
4. 커뮤니티·신고·프로필·지역·알림·제재를 완료. 탈퇴는 마지막 일회용 계정에서만 확인.
5. 정책 확인 사항과 실제 FAIL을 분리해 담당자 검토용 목록으로 정리.
