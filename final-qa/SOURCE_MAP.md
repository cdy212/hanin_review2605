# 실제 소스 연결 근거

2026-10-06. 자동 추출한 라우트 및 annotation anchor는 실행 성공 증거가 아니다.
민감 resources 설정 파일은 읽지 않는다. source_inventory.json에 commit·작업 상태·근거 파일 해시를 저장한다.

## 기능별 근거

| 기능 | 실제 소스 위치 |
|---|---|
| 일반 가입 UI 검증·자동 로그인 | [koreaTaiwan/components/login/register.js:664](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/login/register.js:664>) |
| 가입 인증번호 발송 | [koreaTaiwan/components/login/register.js:787](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/login/register.js:787>) |
| 가입 인증번호 확인 | [koreaTaiwan/components/login/register.js:821](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/login/register.js:821>) |
| 일반 가입 서버 | [koreaTaiwanApi/src/main/java/com/kt/api/controller/AuthController.java:152](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/AuthController.java:152>) |
| 가입 인증 서버·일회 코드 | [koreaTaiwanApi/src/main/java/com/kt/api/controller/AuthController.java:417](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/AuthController.java:417>) |
| 소셜 가입·약관 | [koreaTaiwan/components/login/register.js:165](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/login/register.js:165>) |
| Google·카카오 가입 요청 | [koreaTaiwan/components/login/register.js:531](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/login/register.js:531>) |
| 네이버 가입 요청 | [koreaTaiwan/components/login/register.js:438](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/login/register.js:438>) |
| 소셜 신규 가입·중복 거절 | [koreaTaiwanApi/src/main/java/com/kt/api/controller/SocialAuthController.java:64](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/SocialAuthController.java:64>) |
| 네이버 신규 가입 | [koreaTaiwanApi/src/main/java/com/kt/api/controller/SocialAuthController.java:250](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/SocialAuthController.java:250>) |
| 메인 관리 섹션 | [koreaTaiwanApi/src/main/resources/static/admin/core.js:118](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/resources/static/admin/core.js:118>) |
| 운영자 인증 | [koreaTaiwanApi/src/main/resources/static/admin/core.js:97](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/resources/static/admin/core.js:97>) |
| 메인 조회 | [koreaTaiwan/components/home/index.js:648](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/home/index.js:648>) |
| 메인 API | [koreaTaiwan/components/home/mainContentApi.js:5](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/home/mainContentApi.js:5>) |
| 메인 활성 제한 | [koreaTaiwanApi/src/main/java/com/kt/api/service/main/MainContentService.java:36](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/service/main/MainContentService.java:36>) |
| 메인 활성 필터 | [koreaTaiwanApi/src/main/java/com/kt/api/repository/UserPostsRepository.java:84](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/repository/UserPostsRepository.java:84>) |
| 신청 화면 | [koreaTaiwan/components/membership/index.js:502](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/membership/index.js:502>) |
| 신청 API | [koreaTaiwan/components/membership/hook/membershipHook.js:49](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/membership/hook/membershipHook.js:49>) |
| 멤버십 심사 | [koreaTaiwanApi/src/main/resources/static/admin/membership.js:14](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/resources/static/admin/membership.js:14>) |
| 승인 권한 변경 | [koreaTaiwanApi/src/main/java/com/kt/api/admin/service/MembershipAdminService.java:34](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/admin/service/MembershipAdminService.java:34>) |
| 신청 사유 저장 | [koreaTaiwanApi/src/main/java/com/kt/api/service/MembershipService.java:54](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/service/MembershipService.java:54>) |
| 업체 등록 리다이렉트 | [koreaTaiwan/app/(views)/store/manage/create.js:14](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/app/(views)/store/manage/create.js:14>) |
| 업체 실제 등록 모달 | [koreaTaiwan/components/store/index.js:237](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/store/index.js:237>) |
| 업체 등록 처리 | [koreaTaiwan/src/hooks/useMap.js:218](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/src/hooks/useMap.js:218>) |
| 업체 등록 API | [koreaTaiwan/src/api/placeApi.js:55](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/src/api/placeApi.js:55>) |
| 업체 수정 소유권 | [koreaTaiwanApi/src/main/java/com/kt/api/controller/PlaceController.java:131](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/PlaceController.java:131>) |
| 쿠폰 UI 사용 API | [koreaTaiwan/components/coupon/hook/couponHook.js:361](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/coupon/hook/couponHook.js:361>) |
| 쿠폰 사용 서비스 | [koreaTaiwanApi/src/main/java/com/kt/api/service/CouponService.java:264](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/service/CouponService.java:264>) |
| 쿠폰 사용 컨트롤러 | [koreaTaiwanApi/src/main/java/com/kt/api/controller/CouponController.java:290](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/CouponController.java:290>) |
| 기존 코드형 사용 API | [koreaTaiwanApi/src/main/java/com/kt/api/controller/CouponController.java:192](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/controller/CouponController.java:192>) |
| 개인쿠폰 다운로드 | [koreaTaiwanApi/src/main/java/com/kt/api/service/CouponService.java:346](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/service/CouponService.java:346>) |
| 메인 쿠폰 조회 | [koreaTaiwan/components/home/index.js:716](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/home/index.js:716>) |
| 내 쿠폰 조회 | [koreaTaiwan/components/coupon/couponMyList.js:38](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/components/coupon/couponMyList.js:38>) |
| 토큰 재시도 | [koreaTaiwan/contexts/useTokenFetch.js:31](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwan/contexts/useTokenFetch.js:31>) |
| 정적 로그 예정 | [koreaTaiwanApi/src/main/resources/static/admin/logs.html:6](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/resources/static/admin/logs.html:6>) |
| 인증 본문 로그 확인 | [koreaTaiwanApi/src/main/java/com/kt/api/config/logging/ApiLoggingFilter.java:55](<C:/Users/dante/Desktop/core_project/대표님/app/koreaTaiwanApi/src/main/java/com/kt/api/config/logging/ApiLoggingFilter.java:55>) |

## 소스에서 추출한 프론트 주소

파일명만 추출하며 과거/샘플 경로의 운영 포함 여부는 별도 판단한다.

| 주소 | 라우트 파일 |
|---|---|
| `/admin` | `koreaTaiwan/app/(auth)/admin/index.js` |
| `/admin/login` | `koreaTaiwan/app/(auth)/admin/login.js` |
| `/block` | `koreaTaiwan/app/(auth)/block.js` |
| `/forget/id` | `koreaTaiwan/app/(auth)/forget/id.js` |
| `/forget/password` | `koreaTaiwan/app/(auth)/forget/password.js` |
| `/forget/resetPassword` | `koreaTaiwan/app/(auth)/forget/resetPassword.js` |
| `/` | `koreaTaiwan/app/(auth)/index.js` |
| `/index_splash` | `koreaTaiwan/app/(auth)/index_splash.js` |
| `/login` | `koreaTaiwan/app/(auth)/login.js` |
| `/register` | `koreaTaiwan/app/(auth)/register.js` |
| `/sample` | `koreaTaiwan/app/(auth)/sample/index.js` |
| `/sample/upload` | `koreaTaiwan/app/(auth)/sample/upload.js` |
| `/terms/location/[lang]` | `koreaTaiwan/app/(auth)/terms/location/[lang].js` |
| `/terms/location` | `koreaTaiwan/app/(auth)/terms/location/index.js` |
| `/terms/marketing/[lang]` | `koreaTaiwan/app/(auth)/terms/marketing/[lang].js` |
| `/terms/marketing` | `koreaTaiwan/app/(auth)/terms/marketing/index.js` |
| `/terms/policy/[lang]` | `koreaTaiwan/app/(auth)/terms/policy/[lang].js` |
| `/terms/policy` | `koreaTaiwan/app/(auth)/terms/policy/index.js` |
| `/terms/privacy/[lang]` | `koreaTaiwan/app/(auth)/terms/privacy/[lang].js` |
| `/terms/privacy` | `koreaTaiwan/app/(auth)/terms/privacy/index.js` |
| `/view_layout` | `koreaTaiwan/app/(auth)/view_layout.js` |
| `/admin/main-content` | `koreaTaiwan/app/(views)/admin/main-content/index.js` |
| `/community/create` | `koreaTaiwan/app/(views)/community/create.js` |
| `/community/detail/[id]` | `koreaTaiwan/app/(views)/community/detail/[id].js` |
| `/community/edit-post/[id]` | `koreaTaiwan/app/(views)/community/edit-post/[id].js` |
| `/community` | `koreaTaiwan/app/(views)/community/index.js` |
| `/coupon/[target]` | `koreaTaiwan/app/(views)/coupon/[target].js` |
| `/coupon` | `koreaTaiwan/app/(views)/coupon/index.js` |
| `/coupon/manage/[target]` | `koreaTaiwan/app/(views)/coupon/manage/[target].js` |
| `/coupon/manage/create` | `koreaTaiwan/app/(views)/coupon/manage/create.js` |
| `/coupon/manage` | `koreaTaiwan/app/(views)/coupon/manage/index.js` |
| `/coupon/my/[target]` | `koreaTaiwan/app/(views)/coupon/my/[target].js` |
| `/coupon/my` | `koreaTaiwan/app/(views)/coupon/my/index.js` |
| `/discover` | `koreaTaiwan/app/(views)/discover/index.js` |
| `/likes` | `koreaTaiwan/app/(views)/likes/index.js` |
| `/main` | `koreaTaiwan/app/(views)/main/index.js` |
| `/membership` | `koreaTaiwan/app/(views)/membership/index.js` |
| `/mypage/edit` | `koreaTaiwan/app/(views)/mypage/edit.js` |
| `/mypage` | `koreaTaiwan/app/(views)/mypage/index.js` |
| `/mypage/profile` | `koreaTaiwan/app/(views)/mypage/profile.js` |
| `/rules/customer` | `koreaTaiwan/app/(views)/rules/customer.js` |
| `/rules/location/[lang]` | `koreaTaiwan/app/(views)/rules/location/[lang].js` |
| `/rules/marketing/[lang]` | `koreaTaiwan/app/(views)/rules/marketing/[lang].js` |
| `/rules/policy/[lang]` | `koreaTaiwan/app/(views)/rules/policy/[lang].js` |
| `/rules/policy/privacy/[lang]` | `koreaTaiwan/app/(views)/rules/policy/privacy/[lang].js` |
| `/rules/privacy/[lang]` | `koreaTaiwan/app/(views)/rules/privacy/[lang].js` |
| `/rules/privacy` | `koreaTaiwan/app/(views)/rules/privacy.js` |
| `/setting` | `koreaTaiwan/app/(views)/setting/index.js` |
| `/setting/withdraw` | `koreaTaiwan/app/(views)/setting/withdraw.js` |
| `/store` | `koreaTaiwan/app/(views)/store/index.js` |
| `/store/manage/[target]` | `koreaTaiwan/app/(views)/store/manage/[target].js` |
| `/store/manage/create` | `koreaTaiwan/app/(views)/store/manage/create.js` |
| `/store/manage` | `koreaTaiwan/app/(views)/store/manage/index.js` |
| `/` | `koreaTaiwan/app/index.js` |
