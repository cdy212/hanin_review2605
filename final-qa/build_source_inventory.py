"""Read only permitted source files and write route/API anchors for repeatable QA preparation."""
import hashlib
import json
import re
import subprocess
from pathlib import Path

OUT = Path(__file__).resolve().parent
APP = OUT.parents[1]
FRONT = APP / "koreaTaiwan"
BACK = APP / "koreaTaiwanApi"


def git(repo, *args):
    result = subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True, encoding="utf-8")
    if result.returncode:
        raise RuntimeError(f"git read failed: {repo.name}")
    return result.stdout.strip()


def evidence(path, needle):
    source = APP / path
    lines = source.read_text(encoding="utf-8-sig").splitlines()
    for number, line in enumerate(lines, 1):
        if needle in line:
            return {"path": path, "line": number, "needle": needle,
                    "sha256": hashlib.sha256(source.read_bytes()).hexdigest()}
    raise ValueError(f"Source anchor missing: {path} / {needle}")


ANCHORS = [
    ("일반 가입 UI 검증·자동 로그인", "koreaTaiwan/components/login/register.js", 'if (!isEmailVerified) {'),
    ("가입 인증번호 발송", "koreaTaiwan/components/login/register.js", '/api/auth/sendSignupAuthCode'),
    ("가입 인증번호 확인", "koreaTaiwan/components/login/register.js", '/api/auth/verifySignupAuthCode'),
    ("일반 가입 서버", "koreaTaiwanApi/src/main/java/com/kt/api/controller/AuthController.java", 'public ResponseEntity<?> registerUser'),
    ("가입 인증 서버·일회 코드", "koreaTaiwanApi/src/main/java/com/kt/api/controller/AuthController.java", 'public ResponseEntity<?> verifySignupAuthCode'),
    ("소셜 가입·약관", "koreaTaiwan/components/login/register.js", 'const handleSocialRegister'),
    ("Google·카카오 가입 요청", "koreaTaiwan/components/login/register.js", 'const socialRegisterProcess'),
    ("네이버 가입 요청", "koreaTaiwan/components/login/register.js", '/api/social/naver/register'),
    ("소셜 신규 가입·중복 거절", "koreaTaiwanApi/src/main/java/com/kt/api/controller/SocialAuthController.java", 'public ResponseEntity<?> registerSocialUser'),
    ("네이버 신규 가입", "koreaTaiwanApi/src/main/java/com/kt/api/controller/SocialAuthController.java", '@PostMapping("/naver/register")'),
    ("메인 관리 섹션", "koreaTaiwanApi/src/main/resources/static/admin/core.js", 'mainContent: ['),
    ("운영자 인증", "koreaTaiwanApi/src/main/resources/static/admin/core.js", 'roles.includes("ROLE_ADMIN")'),
    ("메인 조회", "koreaTaiwan/components/home/index.js", 'const [topBanners, middleIcons]'),
    ("메인 API", "koreaTaiwan/components/home/mainContentApi.js", 'const publicBaseUrl'),
    ("메인 활성 제한", "koreaTaiwanApi/src/main/java/com/kt/api/service/main/MainContentService.java", 'TOP_MAX_ACTIVE_COUNT = 5'),
    ("메인 활성 필터", "koreaTaiwanApi/src/main/java/com/kt/api/repository/UserPostsRepository.java", 'AND p.active = true'),
    ("신청 화면", "koreaTaiwan/components/membership/index.js", 'const getStatusDisplay'),
    ("신청 API", "koreaTaiwan/components/membership/hook/membershipHook.js", '"/api/membership/create"'),
    ("멤버십 심사", "koreaTaiwanApi/src/main/resources/static/admin/membership.js", 'async function nativeFetch'),
    ("승인 권한 변경", "koreaTaiwanApi/src/main/java/com/kt/api/admin/service/MembershipAdminService.java", 'private void handleUserRoleGrantOrRevoke'),
    ("신청 사유 저장", "koreaTaiwanApi/src/main/java/com/kt/api/service/MembershipService.java", '"기타".equals(dto.getReasonType())'),
    ("업체 등록 리다이렉트", "koreaTaiwan/app/(views)/store/manage/create.js", '<Redirect href="/store"'),
    ("업체 실제 등록 모달", "koreaTaiwan/components/store/index.js", '{isAdmin && ('),
    ("업체 등록 처리", "koreaTaiwan/src/hooks/useMap.js", 'await placeApiHook.createPlace(newPlace)'),
    ("업체 등록 API", "koreaTaiwan/src/api/placeApi.js", 'const createPlace'),
    ("업체 수정 소유권", "koreaTaiwanApi/src/main/java/com/kt/api/controller/PlaceController.java", 'if (!place.getUser().getId().equals(userId))'),
    ("쿠폰 UI 사용 API", "koreaTaiwan/components/coupon/hook/couponHook.js", 'const applyCouponUse'),
    ("쿠폰 사용 서비스", "koreaTaiwanApi/src/main/java/com/kt/api/service/CouponService.java", 'public CouponUser useCoupon'),
    ("쿠폰 사용 컨트롤러", "koreaTaiwanApi/src/main/java/com/kt/api/controller/CouponController.java", '@PostMapping("/use")'),
    ("기존 코드형 사용 API", "koreaTaiwanApi/src/main/java/com/kt/api/controller/CouponController.java", '@PostMapping("/{code}/use")'),
    ("개인쿠폰 다운로드", "koreaTaiwanApi/src/main/java/com/kt/api/service/CouponService.java", 'coupon.getTargetUser() == null'),
    ("메인 쿠폰 조회", "koreaTaiwan/components/home/index.js", '/api/v2/coupon/list?status=ALL'),
    ("내 쿠폰 조회", "koreaTaiwan/components/coupon/couponMyList.js", '/api/v2/coupon/myCoupons'),
    ("토큰 재시도", "koreaTaiwan/contexts/useTokenFetch.js", 'response.status === 401 || response.status == 403'),
    ("정적 로그 예정", "koreaTaiwanApi/src/main/resources/static/admin/logs.html", '감사 이력 저장 예정'),
    ("인증 본문 로그 확인", "koreaTaiwanApi/src/main/java/com/kt/api/config/logging/ApiLoggingFilter.java", 'request.getMethod(), request.getRequestURI(), requestBody, responseBody'),
]


def main():
    routes = []
    for path in sorted((FRONT / "app").rglob("*.js")):
        rel = path.relative_to(FRONT / "app")
        if path.name.startswith("_"):
            continue
        parts = [p for p in rel.with_suffix("").parts if not (p.startswith("(") and p.endswith(")"))]
        if parts[-1] == "index":
            parts.pop()
        routes.append({"route": "/" + "/".join(parts), "path": path.relative_to(APP).as_posix()})
    mappings = []
    for path in sorted((BACK / "src/main/java").rglob("*Controller.java")):
        for number, line in enumerate(path.read_text(encoding="utf-8-sig").splitlines(), 1):
            # Annotation anchors only. Does not claim to be a full Java parser.
            if re.search(r"@(Request|Get|Post|Put|Patch|Delete)Mapping", line):
                mappings.append({"path": path.relative_to(APP).as_posix(), "line": number,
                                 "annotation": line.strip()})
    anchors = [{"feature": name, **evidence(path, needle)} for name, path, needle in ANCHORS]
    data = {"date": "2026-10-06", "frontCommit": git(FRONT, "rev-parse", "HEAD"),
            "backCommit": git(BACK, "rev-parse", "HEAD"),
            "frontStatus": git(FRONT, "status", "--short"), "backStatus": git(BACK, "status", "--short"),
            "routes": routes, "controllerMappingAnchors": mappings, "evidence": anchors}
    (OUT / "source_inventory.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    text = ["# 실제 소스 연결 근거", "", "2026-10-06. 자동 추출한 라우트 및 annotation anchor는 실행 성공 증거가 아니다.",
            "민감 resources 설정 파일은 읽지 않는다. source_inventory.json에 commit·작업 상태·근거 파일 해시를 저장한다.",
            "", "## 기능별 근거", "", "| 기능 | 실제 소스 위치 |", "|---|---|"]
    for a in anchors:
        uri = (APP / a["path"]).as_posix()
        text.append(f'| {a["feature"]} | [{a["path"]}:{a["line"]}](<{uri}:{a["line"]}>) |')
    text += ["", "## 소스에서 추출한 프론트 주소", "", "파일명만 추출하며 과거/샘플 경로의 운영 포함 여부는 별도 판단한다.",
             "", "| 주소 | 라우트 파일 |", "|---|---|"]
    for route in routes:
        text.append(f'| `{route["route"]}` | `{route["path"]}` |')
    (OUT / "SOURCE_MAP.md").write_text("\n".join(text) + "\n", encoding="utf-8")
    print(f"Verified {len(anchors)} source anchors; {len(routes)} route candidates; {len(mappings)} mapping anchors")


if __name__ == "__main__":
    main()
