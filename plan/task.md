# AutoERD 작업 현황 / Task Log

- 확인일: 2026-05-21 (잔여작업 완료: 15:25)
- 대상 폴더: `C:\Users\dante\Desktop\2026_new_project\대표님\한인회리뷰_260526\plan`
- 확인 파일:
  - `plan_v1.md` (최종 수정: 2026-05-21 10:53)
  - `erd_generator_v1.html` (최종 수정: 2026-05-21 10:57)

## 현재 결론

현재 작업은 **ERD Auto-Generator SaaS 1차 MVP 배포 준비 단계**까지 진행되어 있습니다.

1차 MVP 기준 핵심 기능, 광고 배치, DDL 추출 가이드, PNG/SVG 내보내기, 정책 문서, 배포용 `index.html`까지 정리되었습니다.

- 1차 MVP 프로토타입 진척도: 약 95%
- 실제 공개 배포 가능 상태 기준 진척도: 약 85~90%
- 전체 SaaS 로드맵 기준 진척도: 약 30~35%

## 마지막 진행사항

마지막으로 진행된 작업은 1차 MVP 잔여 작업 정리입니다.

확인된 마지막 변경 흐름:

1. `plan_v1.md`에서 서비스 방향 확정
   - SQL DDL 붙여넣기 전용
   - 무료 서비스 + 광고 수익화
   - 순수 HTML + JS 기반
   - Cloudflare Pages 무료 배포 계획

2. 이후 `erd_generator_v1.html` 작성/수정
   - 랜딩 화면 구성
   - SQL 입력 UI 구성
   - 샘플 SQL 버튼 구성
   - ERD 결과 화면 구성
   - 광고 영역 placeholder 구성
   - SQL 파싱 및 ERD 렌더링 로직 구현

3. 사용자 입력 편의 기능 추가
   - MySQL, MariaDB, PostgreSQL DDL 추출 명령 안내 추가
   - `SHOW CREATE TABLE`, `mysqldump`, `mariadb-dump`, `pg_dump` 사용 예시 추가
   - 입력한 DDL, 쿼리, DB명, 테이블명 등은 기본적으로 별도 저장하지 않는다는 안내 문구 추가

4. 광고 UX 배치 개선
   - 결과 열람 전 광고 클릭을 강제하는 방식은 정책/UX 리스크가 있어 제외
   - 결과 화면에 상단 광고 스트립 추가
   - 결과 화면 우측 사이드 광고를 자연 노출형 영역으로 정리
   - 조작 버튼과 광고 영역을 분리해 오클릭 가능성을 낮춤

5. 잔여 작업 처리
   - SQL 파서 보강: 한 줄 DDL, 스키마명 포함 테이블, PostgreSQL 타입, MySQL UNIQUE KEY, 복합 PK/FK 케이스 대응
   - PNG 저장 기능 실제 구현
   - SVG 저장 기능 별도 버튼으로 분리
   - 모바일 반응형 스타일 추가
   - SEO 메타 태그 추가
   - 개인정보처리방침 / 이용약관 / README / robots.txt / sitemap.xml 추가
   - Cloudflare Pages 배포용 `index.html` 생성
   - 샘플 SQL 4종 및 PostgreSQL/MySQL 파서 케이스 스크립트 검증 완료

## 구현 완료된 항목

### 기획

- [x] 서비스 방향 정리
- [x] 1차 MVP 범위 정의
- [x] 광고 수익화 구조 정리
- [x] 인프라 비용 구조 정리
- [x] 2차 회원/PRO 플랜 로드맵 정리
- [x] 주차별 개발 일정 초안 작성

### 프론트엔드 / UI

- [x] 단일 HTML 파일 구조 작성
- [x] 랜딩 화면 작성
- [x] SQL DDL 입력 영역 작성
- [x] DB 종류 탭 작성: MySQL, PostgreSQL, MariaDB
- [x] 샘플 SQL 버튼 작성: 블로그, 쇼핑몰, 커뮤니티, 인증/권한
- [x] ERD 결과 화면 작성
- [x] 테이블/관계 개수 표시 UI 작성
- [x] 범례 UI 작성: PK, FK, UQ, 관계선
- [x] 확대/축소/초기화 컨트롤 작성
- [x] 광고 영역 placeholder 작성: 상단, 사이드, 결과 하단
- [x] DDL 추출 가이드 작성: MySQL, MariaDB, PostgreSQL
- [x] 사용자 입력 DB 정보/쿼리 미저장 안내 문구 작성
- [x] 결과 화면 광고 배치 개선: 상단 광고 스트립 + 우측 사이드 광고
- [x] 광고 클릭 강제 방식 정책 리스크 검토
- [x] 모바일 반응형 스타일 보강
- [x] SEO 메타 태그 보강

### ERD 기능

- [x] `CREATE TABLE` 구문 파싱 함수 작성
- [x] 컬럼명/타입 추출
- [x] PRIMARY KEY 감지
- [x] FOREIGN KEY 감지
- [x] inline `REFERENCES` 감지
- [x] UNIQUE 감지
- [x] NOT NULL 감지
- [x] 관계 중복 제거
- [x] self-reference 관계 표시 타입 구분
- [x] 테이블 자동 그룹화 로직 작성
- [x] 자동 레이아웃 로직 작성
- [x] ERD 카드 렌더링 작성
- [x] SVG 관계선 렌더링 작성
- [x] 테이블 드래그 이동 작성
- [x] 캔버스 패닝/줌 작성
- [x] 파싱 실패 메시지 처리
- [x] 한 줄 DDL 파싱 보강
- [x] 스키마명 포함 테이블 파싱 보강
- [x] PostgreSQL 문법 케이스 보강
- [x] MySQL UNIQUE KEY / INDEX 케이스 보강
- [x] 복합 PK/FK 케이스 보강

## 미완료 / 확인 필요 항목

### 릴리즈 전 필수 점검

- [x] 샘플 SQL별 파서 동작 확인: 블로그, 쇼핑몰, 커뮤니티, 인증/권한
- [x] 모바일 화면 레이아웃 스타일 보강
- [x] 긴 테이블명/컬럼명 표시 폭 계산 보강
- [x] 복합 PK/FK 케이스 확인
- [x] PostgreSQL 문법 케이스 추가 확인
- [x] MySQL 인덱스/제약조건 다양한 문법 확인
- [x] 파싱 실패 시 사용자 안내 문구 유지/확인

### 내보내기 기능

- [x] `PNG 저장` 버튼 실제 PNG 다운로드로 변경
- [x] Canvas 기반 PNG 렌더링 구현
- [x] SVG 저장 기능 별도 버튼으로 분리
- [x] 다운로드 파일에 테이블 카드와 관계선 포함되도록 구현

### 광고 / 수익화

- [ ] 실제 AdSense 코드 삽입 전 상태 ← 배포 후 신청 필요
- [x] 광고 placeholder 및 교체 위치 정리
- [x] AdSense 승인용 정책 페이지 초안 추가
- [x] 개인정보처리방침 / 이용약관 페이지 추가
- [x] AdSense 신청 가이드 문서 작성 (`adsense_guide.md`)

### 배포 / 운영

- [x] Cloudflare Pages 배포용 `index.html` 생성
- [ ] 실제 Cloudflare Pages 배포 미확인 ← 사용자 직접 수행 필요
- [ ] 도메인 결정 필요 ← 사용자 결정 필요
- [x] SEO 메타 태그 보완
- [x] og:url / og:image / canonical 태그 추가
- [x] 헤더 내비게이션 링크 추가 (소개 / 개인정보처리방침 / 이용약관)
- [x] Footer 링크 추가
- [x] README 또는 운영 메모 작성
- [x] `about.html` 소개 페이지 작성 (AdSense 심사 콘텐츠 보강)
- [x] `privacy.html` 내용 보강 + 내비게이션 통일
- [x] `terms.html` 내용 보강 + 내비게이션 통일
- [x] `sitemap.xml` 보강 (about.html 추가, lastmod/changefreq/priority)
- [ ] 배포 후 Google Search Console 등록 + sitemap 제출 ← 배포 후
- [ ] 배포 후 AdSense 신청 필요 ← 배포 2~4주 후

### 2차 기능

- [ ] 회원가입/로그인 미구현
- [ ] ERD 저장/불러오기 미구현
- [ ] PRO 플랜 미구현
- [ ] Stripe 결제 미구현
- [ ] Supabase 연동 미구현
- [ ] 팀 공유 기능 미구현
- [ ] DB 직접 연결 미구현

## 다음 작업 추천 순서

1. **[필수] Cloudflare Pages에 `plan` 폴더를 정적 사이트로 배포**
2. 배포 URL에서 `index.html`, `about.html`, `privacy.html`, `terms.html` 접속 확인
3. 실제 브라우저에서 샘플 SQL 4종 생성/드래그/줌/PNG/SVG 저장 확인
4. **[필수] Google Search Console 등록 + sitemap 제출**
5. Reddit / Hacker News / Product Hunt 공유 (초기 트래픽 확보)
6. 배포 2~4주 후 AdSense 신청 (`adsense_guide.md` 참고)
7. AdSense 승인 후 placeholder 영역을 광고 코드로 교체
8. 도메인 확정 시 `robots.txt`, `sitemap.xml`, OG URL 정보 갱신
9. 2차 기능 착수 전 Supabase/Stripe/Next.js 전환 여부 결정

## 현재 파일별 역할

| 파일 | 상태 | 역할 |
|---|---:|---|
| `plan_v1.md` | 완료 | 서비스 방향, MVP 범위, 수익화, 개발 일정 정리 |
| `erd_generator_v1.html` | 완료 | 단일 파일 MVP 원본 |
| `index.html` | 완료 | Cloudflare Pages 배포용 진입 파일 (OG/canonical/nav 추가) |
| `about.html` | **신규 완료** | 서비스 소개 페이지 (AdSense 심사 콘텐츠 보강용) |
| `privacy.html` | 완료(보강) | 개인정보처리방침 (내용 보강 + 내비게이션 추가) |
| `terms.html` | 완료(보강) | 이용약관 (내용 보강 + 내비게이션 추가) |
| `README.md` | 완료 | 배포/운영 메모 |
| `robots.txt` | 완료 | 검색엔진 크롤링 설정 |
| `sitemap.xml` | 완료(보강) | 사이트맵 (about.html 추가, lastmod/priority 보강) |
| `adsense_guide.md` | **신규 완료** | AdSense 신청 절차 + SEO 최적화 가이드 |
| `task.md` | 진행 중 | 작업 진척도와 마지막 진행사항 추적 |

## 요약

**AdSense 신청 전 준비 가능한 모든 작업이 완료**되었습니다.

코드 작업 기준으로 완료된 사항:
- `index.html` OG/canonical 태그 완성, 헤더/푸터 내비게이션 추가
- `about.html` 서비스 소개 페이지 신규 생성 (AdSense 심사 콘텐츠 보강)
- `privacy.html` / `terms.html` 내용 보강 + 내비게이션 통일
- `sitemap.xml` 4개 URL + lastmod/priority 보강
- `adsense_guide.md` 신청 절차 + SEO 가이드 문서 작성

**남은 항목은 모두 사용자 직접 수행 필요:**
Cloudflare Pages 실배포 → Google Search Console 등록 → 초기 트래픽 확보 → AdSense 신청 (배포 2~4주 후)
