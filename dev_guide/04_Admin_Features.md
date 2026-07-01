# 04. 관리자 기능 구체화 및 코드 구조 (Admin Features)

본 문서는 관리자(Admin) 권한을 가진 사용자가 접근할 수 있는 백엔드 주요 기능들과, 이 기능들이 소스코드 상에서 어떻게 구현되는지 설명합니다.

---

## 👨‍💻 관리자 화면 기능 명세

### 1. 회원 등급(Role) 및 제재 관리
- **업무 플로우**: 가입한 일반 회원 중 회비/후원 납부자를 확인하여 '정회원' 수동 승인을 처리합니다. 또한, 신고 누적 등 제재가 필요한 유저에게 3일/5일 차단 조치를 내립니다.
- **프론트 작업 경로 (`koreaTaiwan`)**:
  - `src/pages/Admin/UserManagement.js`
- **백엔드 작업 경로 (`koreaTaiwanApi`)**:
  - `controller/admin/AdminUserController.java` : 관리자용 API 진입점. Spring Security 설정으로 인해 `@PreAuthorize("hasRole('ROLE_ADMIN')")` 어노테이션이 붙어 있어 일반 사용자는 접근 불가.
  - `service/admin/AdminUserService.java` : DB의 `user_roles` 테이블 값을 조작하여 권한을 상승/하강시키는 로직 수행.

### 2. 업체 등록 심사 및 관리
- **업무 플로우**: 일반 사용자가 제출한 '업체 등록' 폼(이름, 사진, 주소)을 심사(Reject/Approve)합니다.
- **백엔드 로직 흐름**: `AdminPlaceController`에서 승인 API 호출 -> `AdminPlaceService`에서 `place` 테이블의 특정 레코드 상태를 대기(WAIT)에서 승인(APPROVED)으로 변경 (또는 `is_partner=true` 변경).

### 3. 커뮤니티 검열 및 공지사항
- **업무 플로우**: 전체 게시글(`user_posts`)을 조회하며, 3회 이상 신고되어 숨김 처리된 글의 삭제(Soft Delete: `deleted=true`)를 최종 확정합니다.

### 4. 쿠폰 사용 내역 추출 (Excel Download)
- **업무 플로우**: '정회원'들이 쿠폰을 얼마나 발급받고 사용했는지(`coupon_user_history`) 목록을 확인하고, 오프라인 정산을 위해 외부 파일(Excel/CSV) 형식으로 다운로드(Export)합니다.
- **백엔드 작업 포인트**: API 컨트롤러에서 JSON이 아닌 `application/vnd.ms-excel` 형태로 HttpServletResponse에 Apache POI 라이브러리 등을 활용해 파일을 출력(Write)해줍니다.

---

> 💡 **주의 사항 (권한 방어)**
> 관리자 API는 단순히 프론트엔드에서 버튼을 숨기는 것만으로는 안전하지 않습니다. 포스트맨(Postman) 같은 툴을 이용해 강제로 URL을 찌를 수 있으므로, 반드시 백엔드 Controller 단에서 **토큰 유효성 검사 및 ADMIN 권한 체크 로직**이 이중으로 들어가야 합니다.
