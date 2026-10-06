# 기능별 QA 사이클과 실행 상태

기준 2026-10-04. F=사용자 웹, A=API·운영 콘솔. URL 기준과 역할은 운영자_매뉴얼.md에 있다. 아래 TC는 소스 기준으로 설계했으며 모든 로그인 후 연동 TC는 현재 **BLOCKED: 실제 테스트 환경·역할별 계정 미확정 및 로컬 백엔드 미기동**이다. 공개 화면 실행 결과는 별도 BROWSER_QA_REPORT.md를 따른다. 이 표는 전체 E2E가 통과했다는 의미가 아니다.

공통 전제: 신규 runId 데이터, 독립 역할 세션, 실제 API 연결, 권한 최신화. 공통 증빙: 행동 전/후와 반대 역할 화면 캡처, method/path/status, 같은 record ID 재조회. 모든 변경 TC는 새로고침 후 유지와 테스트 데이터 정리까지 확인한다.

## 인증·진입 (AUTH)

| ID | 전제·URL | 실행 | 기대 결과 | 현 상태 |
|---|---|---|---|---|
| TC-AUTH-01 | 비로그인 F/login | 로그인 폼·회원가입·찾기 표시 | 정상 렌더/빈 화면 없음 | PASS, B01 |
| TC-AUTH-02 | 비로그인 F/register | 회원가입 폼 진입·약관 확인 | 신청 입력·약관 화면 표시 | PASS, B02; 제출 미실행 |
| TC-AUTH-03 | 비로그인 F/main, F/membership | 직접 URL 접근 | 로그인으로 전환 | PASS, B04/B05 |
| TC-AUTH-04 | 실제 U/P/O 계정 | 각 로그인→역할별 홈→로그아웃→재접속 | 역할에 맞는 화면·세션 종료 | BLOCKED |
| TC-AUTH-05 | 유효/실패 테스트 계정 | 잘못된 자격 1회·제재 사용자 로그인 | 오류 안내, 인증 화면 유지/차단 화면 | BLOCKED |
| TC-AUTH-06 | QA 수신함·신규 계정 | 이메일 인증→회원가입→중복 가입·만료코드 | 정상 가입·중복/만료 차단 | BLOCKED |
| TC-AUTH-07 | QA 수신함·테스트 계정 | ID 찾기→비번 찾기/재설정→새 비번 로그인 | 수신/재설정·이전 비번 차단 | BLOCKED |
| TC-AUTH-08 | 소셜 QA 계정·승인된 리다이렉트 | Google/Naver 등 실제 제공 로그인→취소 | 정상 콜백·취소 후 사용 가능 | BLOCKED |
| TC-AUTH-09 | 짧은 TTL 전용 실행 | 로그인→만료→보호 읽기 요청→refresh 실패도 확인 | 401→refresh→원요청 성공, 실패 시 로그아웃 | BLOCKED |

## 일반 회원가입 전체 사이클 (SIGNUP)

2026-10-06 추가. 기존 AUTH-02의 화면 PASS는 제출 성공을 포함하지 않는다. AUTH-06을 아래 항목으로 상세화하며 중복 실행 없이 같은 run의 증빙을 참조한다. 소스: login/register.js → authHook.js → AuthController. 만료 유효시간은 정책 확인 후 판정하며 현재 소스에서 TTL 처리는 확인되지 않았다.

| ID | 전제·URL | 실행 | 기대 결과 | 현 상태 |
|---|---|---|---|---|
| TC-SIGNUP-01 | 신규 QA 수신함·O, F/register | 입력→약관→발송→코드 인증→가입→자동 로그인→F/main·F/mypage→O users 조회 | 회원 1명·동일 ID/닉네임·ROLE_USER, 정회원/제휴/관리 권한 미부여 | BLOCKED |
| TC-SIGNUP-02 | 비로그인 F/register | 약관 미동의·필수값 누락·아이디/비번 4자리 미만·이메일 형식 오류를 각각 제출 | 해당 오류 안내, 회원 미생성, 수정 후 재시도 가능 | BLOCKED |
| TC-SIGNUP-03 | 신규 이메일 2개·F/register | 인증 전 제출→잘못된 코드→재발송 전 코드→검증된 코드 재사용→가입 | 미인증 가입/잘못된 코드 차단, 재발송·일회 사용 일치; TTL은 정책 확인 후 별도 판정 | BLOCKED |
| TC-SIGNUP-04 | 승인된 만료 테스트 조건 | 코드 발송 후 정책 유효시간 경과→검증/제출, 인증완료 후 지연 제출도 분리 | 정책에 따른 만료 차단·재인증 안내; 유효시간 미확정이면 PASS 금지 | BLOCKED |
| TC-SIGNUP-05 | 이번 run 가입 계정·새 수신함 | 동일 아이디/다른 이메일, 다른 아이디/동일 이메일을 각각 가입 시도→O 재조회 | username_exist/email_exist에 맞는 안내·회원 중복 미생성 | BLOCKED |
| TC-SIGNUP-06 | 이번 run 가입 계정·F/login | 로그아웃→일반 로그인→F/mypage→F/membership | 같은 ID·프로필 유지, 신규 회원의 신청 진입 가능 | BLOCKED |
| TC-SIGNUP-07 | 신규 계정·통제 가능한 QA 환경 | 인증 이메일 변경/재입력 후 제출, 가입 저장 후 자동 로그인 실패도 별도 재현 | 현재 제출 이메일 인증 확인, 저장된 회원 1명, 로그인 안내 후 수동 로그인 가능 | BLOCKED |

## 소셜 신규 가입·기존 계정 재로그인 (SOCIAL)

소스: login/register.js의 handleSocialRegister/socialRegisterProcess/socialNaverProcess → SocialAuthController. 제공자별 신규 계정은 독립 세션에서 사용한다. 이메일 중복 시 현재 서버는 409를 반환한다. 웹과 네이티브의 완료 여부를 run 기록에 각각 남긴다.

| ID | 전제·URL | 실행 | 기대 결과 | 현 상태 |
|---|---|---|---|---|
| TC-SOCIAL-01 | 신규 Google QA 계정·승인된 callback, F/register | 약관 동의→Google 인증→가입→F/main·F/mypage→O users | 신규 회원 1명·동일 회원/프로필·ROLE_USER·세션 유지 | BLOCKED |
| TC-SOCIAL-02 | 신규 카카오 QA 계정·F/register | 약관 동의→카카오 인증→가입→사용자/운영자 재조회 | 신규 회원 1명·ROLE_USER·프로필/세션 확인 | BLOCKED |
| TC-SOCIAL-03 | 신규 네이버 QA 계정·F/register | 약관 동의→네이버 인증→가입→사용자/운영자 재조회 | /api/social/naver/register 완료·신규 회원 1명·ROLE_USER | BLOCKED |
| TC-SOCIAL-04 | 각 제공자 가입완료 계정 | 같은 제공자로 재가입→409 안내→F/login 소셜 재로그인→O users | 중복 미생성·로그인 안내, 재로그인 시 기존 ID 유지 | BLOCKED |
| TC-SOCIAL-05 | 동일 이메일 일반/다른 소셜 QA 계정 | 다른 제공자로 신규 가입 시도→운영 목록 확인 | 현재 서버의 이메일 중복 안내·409·회원 미증가; 자동 계정 연결 정책은 별도 확인 | BLOCKED |
| TC-SOCIAL-06 | 비로그인 F/register·각 제공자 | 약관 미동의로 가입 버튼→동의 후 재시도 | 미동의 시 인증/가입 차단, 동의 후 정상 인증 진입 | BLOCKED |
| TC-SOCIAL-07 | 각 제공자 QA 계정·웹 | 인증 취소/창닫기/동의거절/팝업차단/통신실패를 각각 실행→재시도 | 유령 회원/잘못된 세션 없음, 안내·가입 화면 복귀·재시도 가능 | BLOCKED |
| TC-SOCIAL-08 | 이메일/닉네임 미제공 조건을 만들 수 있는 QA 계정 | 제공정보 최소화→가입→F/mypage·O users→재로그인 | 오류/대체값 분기와 동일 ID 확인; 임시 이메일을 인증메일로 오판 금지, 프로필 정책 별도 확인 | BLOCKED |
| TC-SOCIAL-09 | 지원 웹·iOS·Android 및 각 제공자 | 플랫폼별 신규 가입→콜백 복귀→로그아웃→재로그인 | 지원/미지원 명시, 승인된 콜백·세션·동일 ID 확인; 플랫폼별 증빙 | BLOCKED |

## 메인 컨트롤→사용자 노출 (MAIN)

소스: admin/cms.js → MainContentAdminController → MainContentService → UserPostsRepository → MainContentPublicController → home/mainContentApi.js → home/index.js.

| ID | 전제·URL | 한 사이클 실행 | 기대 결과 | 상태 |
|---|---|---|---|---|
| TC-MAIN-01 | O A/admin/index.html?section=mainContent, U F/main | TOP 새 항목 입력·이미지 업로드·저장→목록→사용자 메인→링크 클릭 | 동일 ID의 제목·설명·이미지·버튼·이동 반영 | BLOCKED |
| TC-MAIN-02 | 중앙 아이콘 탭 | 2개 등록 순서 2/1→사용자 확인→순서 교체→재조회 | 순서와 텍스트·이미지·링크 반영 | BLOCKED |
| TC-MAIN-03 | 이번 run의 TOP/아이콘 | 제목·이미지·링크 수정→사용자 재진입 | 변경값 유지·이미지 경로 정상 | BLOCKED |
| TC-MAIN-04 | 이번 run의 활성 항목 | 활성 해제→사용자 재조회→재활성→삭제→재조회 | 해제/삭제 시 미노출, 복귀 시 노출 | BLOCKED |
| TC-MAIN-05 | 테스트 전용 빈 CMS 또는 준비 데이터 | TOP 5/아이콘6 활성→추가 활성 시도, 순서0·필수값/미지원 이미지 | 상한·입력 오류 차단, 기존 목록 보존 | BLOCKED |
| TC-MAIN-06 | U 메인 API 실패/0개 환경 | 메인 새 진입→한 API 실패·둘 다 빈 응답 구분 | 크래시/무한로딩 없음, 빈 목록을 장애 성공으로 오판하지 않음 | BLOCKED |
| TC-MAIN-07 | R 다운로드/사용한 쿠폰 존재 | 메인 내 쿠폰→실제 내 쿠폰함 비교 | 보유·사용 상태 일치; 현재 전체 list 호출 결함 후보 확인 | BLOCKED |

## 신청→운영 심사→역할 (MEM)

소스: membership/index.js·membershipHook.js → MembershipController/Service/Repository → admin/membership.js → MembershipAdminController/Service → AuthContext → 마이페이지·권한 라우트.

| ID | 전제·URL | 한 사이클 실행 | 기대 결과 | 상태 |
|---|---|---|---|---|
| TC-MEM-01 | 미신청 U1 F/membership, O membership | REGULAR 사유/자료 제출→대기 확인→운영 검색/상세→승인→사용자 재조회·재로그인 | request→apply, ROLE_REGULAR, 등급/쿠폰 권한 | BLOCKED |
| TC-MEM-02 | 미신청 U2 | PARTNER 신청→대기→운영 승인→재로그인→한인맵/쿠폰관리 | ROLE_PARTNER, 업체등록 + 및 쿠폰관리 허용 | BLOCKED |
| TC-MEM-03 | 대기 신청 | 운영 반려+사유→사용자 사유 확인→수정 제출→운영 재조회 | 같은 신청 ID 갱신·첨부/사유 유지·재심사 정책 확인 | BLOCKED |
| TC-MEM-04 | 승인된 이번 run 계정 | 사용자 재수정 시도→운영 취소→재로그인 | 승인후 수정 차단, cancel 시 해당 역할 회수 | BLOCKED |
| TC-MEM-05 | U1 두 유형·중복 요청 | 같은 유형 재신청/중복 제출→다른 유형 신청→운영 승인 | 같은 유형 중복 방지·유형별 상태 독립 | BLOCKED |
| TC-MEM-06 | 기타 사유 및 첨부 1~3개 | 기타 텍스트 제출→운영 조회→파일 일부 교체/제거→재조회 | 텍스트·파일 슬롯·기존 파일 보존 정확 | BLOCKED |
| TC-MEM-07 | 승인 이력 계정 | 승인→reject/request 상태 변경→역할 조회, 유형 변경도 별도 데이터 | 승인 회수 정책 일치·이전 역할 잔존 여부 확인 | BLOCKED |
| TC-MEM-08 | O 응답 실패/비JSON 시험환경 | 저장요청 401/500 및 200 비JSON→목록재조회 | HTTP 오류 실패 안내, 비정상 body 성공 오판 방지 | BLOCKED |

## 제휴 승인→업체 등록→사용자 지도 (STORE)

실제 등록 동선은 F/store + 모달이다. `/store/manage/create`는 `/store` 리다이렉트. useMap.js → placeApi.js → PlaceController. 별도 업체 승인 기능이 있다고 가정하지 않는다.

| ID | 전제·URL | 한 사이클 실행 | 기대 결과 | 상태 |
|---|---|---|---|---|
| TC-STORE-01 | 승인 P1 F/store | +모달→주소 검색·선택→카테고리·업체명 등록→내 업체→U 검색·마커·상세 | 같은 place ID·주소·좌표·분류·제휴 표시 | BLOCKED |
| TC-STORE-02 | P1 본인 업체 F/store/manage/{id} | 이름·주소·분류 수정→U 상세 재조회 | 수정내용 유지·지도/목록 반영 | BLOCKED |
| TC-STORE-03 | P2/U·P1 업체 ID | 다른 업체 수정/삭제·일반회원 등록 직접 요청(테스트 환경) | 소유권/제휴 권한 차단·원데이터 유지 | BLOCKED |
| TC-STORE-04 | P1 등록 모달 | 이름/주소/분류/좌표 누락·검색 실패·중복 클릭 | 안내·불완전 저장/중복 생성 방지 | BLOCKED |
| TC-STORE-05 | 다수 테스트 업체 | 카테고리·키워드·제휴 필터, 상세 딥링크, 모바일 지도·위치거부 | 필터·마커 일치, 대상 ID 상세 열림, 위치거부 복구 | BLOCKED |
| TC-STORE-06 | 이번 run 업체 | 메인 추천5개·지도·내 업체 비교→본인 삭제→사용자 재조회 | 조회 범위에 따른 노출·삭제 후 미노출 | BLOCKED |

## 업체 쿠폰→받기→실사용→운영 내역 (COUPON)

소스: couponManage/Create/Update·couponHook → CouponController/Service·CouponUser·History → admin/coupons → CouponAdminController/Service.

| ID | 전제·URL | 한 사이클 실행 | 기대 결과 | 상태 |
|---|---|---|---|---|
| TC-COUPON-01 | P1 쿠폰등록, R 사용자, O coupons | UNIVERSAL 등록→관리/운영 목록→R 상세·받기→내 쿠폰→정상 PIN 사용→운영 downloadList | 같은 ID·미사용→사용완료·사용일·이력 | BLOCKED |
| TC-COUPON-02 | R 미사용 쿠폰 | 잘못된 PIN→새로고침→정상 PIN→재사용→재로그인 | 오입력 미변경·정상 사용1회·재사용 차단 | BLOCKED |
| TC-COUPON-03 | LIMITED 상한1·R1/R2 | 두 회원 받기→R1 사용→R2 사용/신규받기→운영 수량 확인 | 다운로드 수량미증가, 사용시1, 소진 차단 | BLOCKED |
| TC-COUPON-04 | PERSONAL R1/R2 대상, R3 미대상 | 대상 지정→각 내 쿠폰→R3 조회/받기/사용→한 대상 사용→대상회수 시도 | 명단별 발급·미대상 차단·사용자 회수 방지 | BLOCKED |
| TC-COUPON-05 | 미사용 만료/숨김·미발급/이미사용 | 받기/사용 시도→운영·내쿠폰 재조회 | 각각 차단, 수량/이력 추가 없음 | BLOCKED |
| TC-COUPON-06 | 일반 U·미승인 업체 | 받기/사용·쿠폰관리 UI와 직접 API, 타인 쿠폰 수정 | 정회원/제휴/소유권 정책 일치 | BLOCKED |
| TC-COUPON-07 | 이번 run 쿠폰 | 제목·만료·업체·유형 수정→사용자·운영 재조회→숨김/삭제 | 수정·중지 정책 동기화·기발급 사용 가능 여부 확인 | BLOCKED |
| TC-COUPON-08 | UI /use와 기존 /{code}/use | 각각 새 발급 쿠폰 사용→HTTP 결과와 저장 상태 비교 | 성공응답·사용상태일치; 기존 endpoint 모순 재현 여부 | BLOCKED |
| TC-COUPON-09 | 테스트 동시사용 환경 | 같은 미사용쿠폰 연속/동시 요청, LIMITED 잔여1 두 회원 | 사용1회·수량 초과/이력 중복 없음 | BLOCKED |

## 사용자 기능→운영 조치 (USER)

| ID | 전제·URL | 한 사이클 실행 | 기대 결과 | 상태 |
|---|---|---|---|---|
| TC-USER-01 | U community/create, O userPosts | 글 작성→다른 U 상세→운영 조회→작성자 수정/삭제 | 제목·본문·첨부·같은 ID·소유권/삭제 반영 | BLOCKED |
| TC-USER-02 | U1/U2 글·댓글 | 댓글작성/수정/삭제→타인 수정시도→마이페이지 | 댓글·개수·내 댓글·권한 일치 | BLOCKED |
| TC-USER-03 | U 게시글 | 좋아요·북마크→내 목록→해제→새로고침 | 중복증가 없음·상태·목록 동기화 | BLOCKED |
| TC-USER-04 | U 신고, O userPosts | 사유신고→운영 조회/검토/숨김→U 목록·직접상세 | 신고와 처리 상태·숨김/삭제 정책 일치 | BLOCKED |
| TC-USER-05 | O 게시판 자료 진입 경로 확정 | 공지/뉴스 생성/수정/중요→U 커뮤니티·메인·검색→삭제 | 현재 메뉴/분류·중요순·내용 일치 | BLOCKED |
| TC-USER-06 | U mypage/edit | 닉네임·이미지·프로필 수정→중복닉네임→새로고침 | 저장·중복안내·다른회원 정보 불변 | BLOCKED |
| TC-USER-07 | U 관심지역 | 검색·추가→중복추가→삭제→재로그인 | 내 지역 갱신·중복/타인삭제 방지 | BLOCKED |
| TC-USER-08 | U setting·승인 실기기 | 알림동의/해제→O 테스트 푸시→클릭→장치 재접속 | 상태·실수신·이동·동의거부 정책 | BLOCKED |
| TC-USER-09 | O sanctions/certificate·일회용 U | 제재→U 로그인차단→소명 제출→O 검토/해제 | 접근제한·사유·소명·해제 반영 | BLOCKED |
| TC-USER-10 | 일회용 계정·탈퇴 정책 확정 | setting/withdraw→취소→탈퇴확정→재로그인 | 취소시 유지·탈퇴후 차단·보존정책 | BLOCKED |
| TC-USER-11 | 실제 주요 화면 | 좁은 모바일/데스크톱·스크롤·뒤로가기·새로고침·오프라인 | 주요 버튼 접근·레이아웃·오류복구·새 세션 유지 | BLOCKED |
| TC-USER-12 | 승인 테스트 파일 O fileManage | 업로드→조회/메모→실사용 화면첨부→테스트파일 삭제 | 경로/형식·기존 파일 무손상·사용중삭제 정책 | BLOCKED |

## 추가 실행이 필요한 항목

현행 소스의 권한·정합성 결함 후보는 FINDINGS.md에 있다. 정상 사이클을 완료한 뒤 실패 케이스를 이어서 실행한다. 동시성·권한 API 검증은 정상 화면 검사보다 깊은 단계이므로 동일 테스트 환경에서 소량·통제된 요청만 사용한다. 확장 보안/부하 시험은 이 문서의 범위를 넘겨 무조건 수행하지 않는다.
