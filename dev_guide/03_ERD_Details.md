# 03. ERD 정보 구체화 (ERD Details & Sample Data)

이 문서는 이전 `02_Workflow_Business.md`에서 설명한 비즈니스 로직이 실제 데이터베이스(MySQL)에 어떻게 저장되고 연관되는지 설명합니다.

## 📌 전체적인 테이블 관계도
> 💡 프로젝트 루트 폴더에 있는 **`erd_260528.html`** 파일을 브라우저로 여시면, 테이블 간의 연관관계를 시각적인 다이어그램으로 한눈에 확인하실 수 있습니다!

## 1. 회원 및 권한 (User Management)
- **`user` 테이블**: 회원의 기본 정보 보관
  - *샘플 데이터*: `id`=1, `username`='hong123', `email`='hong@gmail.com', `account_status`='ACTIVE'
- **`role` 테이블**: 시스템 권한 목록 (일반, 정회원, 제휴회원, 관리자)
  - *샘플 데이터*: `id`=1(`ROLE_USER`), `id`=2(`ROLE_PREMIUM`), `id`=3(`ROLE_ADMIN`)
- **`user_roles` 테이블**: 사용자와 권한을 연결하는 중간 다리 (N:1 연관관계)
  - *샘플 데이터*: `user_id`=1, `role_id`=2 (홍길동은 정회원 권한을 가짐)

## 2. 커뮤니티 및 활동 (Community & Posts)
- **`user_posts` 테이블**: 커뮤니티 게시글 본문. 작성자(`user_id`)를 왜래키(FK)로 가집니다.
  - *샘플 데이터*: `id`=100, `content_title`='대만 타이베이 맛집 추천', `user_id`=1, `deleted`=false
  - *주의점*: 게시글을 삭제할 때 실제로 DB 레코드를 날리는 것이 아니라, **`deleted` 컬럼을 `true`**로 바꾸는 소프트 삭제(Soft Delete) 방식을 사용합니다.
- **`user_posts_actions` 테이블**: 좋아요, 싫어요, 신고(Report) 내역 관리.
  - *비즈니스 연관*: 이 테이블에서 `action_type='REPORT'`인 레코드가 동일한 `user_posts_id`에 대해 3개가 쌓이면, 프론트에서 자동 블라인드(숨김) 처리됩니다.

## 3. 장소 및 업체 정보 (Place & Region)
새롭게 도입된 정책으로 현지 업체 정보가 체계화됩니다.
- **`place` 테이블 (신규)**: 승인된 업체 정보 보관
  - *샘플 데이터*: `id`=10, `name`='타이베이 한식당', `address`='타이베이시 101빌딩 근처', `user_id`=1 (등록한 기업회원 ID)
  - *연관관계*: `category_id` (식당, 병원 등 분류), `user_id` (등록자 맵핑)

## 4. 쿠폰 시스템 (Coupon)
쿠폰 발행(기업) 및 사용(정회원) 흐름을 위한 3개의 핵심 테이블입니다.
- **`coupon` 테이블**: 발행된 쿠폰의 '틀(원형)' 데이터
  - *샘플 데이터*: `id`=50, `code`='WELCOME2026', `user_id`=1(발행 기업 ID), `place_id`=10(사용처 장소 ID)
- **`coupon_user` 테이블**: 특정 유저가 다운로드 받아 '보유'하고 있는 쿠폰 지갑 역할
  - *샘플 데이터*: `id`=1, `coupon_id`=50, `user_id`=5(다운로드한 정회원), `is_used`=false
- **`coupon_user_history` 테이블**: 실제 쿠폰을 매장에 가서 '사용(Use)' 완료했을 때 찍히는 로그 히스토리

## 5. 포인트 및 알림 (Push & Points)
- **`user_push` / `user_push_history` 테이블**: 앱(안드로이드/iOS) 푸시 알림 발송 시 디바이스 토큰 및 발송 이력을 저장합니다. 신고에 의한 제재 시 팝업/푸시 알림 발송에 사용됩니다.
- (향후 도입) 구인구직 권한 등에 쓰일 수동 부여 포인트는 `user` 테이블의 컬럼이나 신규 `point_log` 테이블을 통해 관리될 예정입니다.
