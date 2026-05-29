# ERD Builder Pro — 로드맵 & 수익화 계획

## 제품 비전

> "DB 스키마를 URL 하나로 팀과 공유하는 가장 빠른 방법"

개발자, DBA, 기획자, PM이 DB 구조를 빠르게 파악하고 문서화할 수 있도록 돕는 ERD 자동화 도구.

---

## 현재 버전 (v0.1 — Static MVP)

### 완료된 기능
- [x] MySQL / MSSQL / Oracle / PostgreSQL / SQLite SQL 템플릿 제공
- [x] JSON 붙여넣기 → 테이블 & 관계선 자동 생성
- [x] FK 기반 자동 그룹화 (Union-Find 알고리즘)
- [x] 관계 중심 스마트 레이아웃 (십자형 배치)
- [x] 테이블 & 그룹 드래그 이동
- [x] URL 공유 (Base64 인코딩, 서버 불필요)
- [x] 로컬스토리지 자동저장 + 수동 버전 관리
- [x] viewer.html — 공유 URL 뷰어

---

## 로드맵

### v0.2 — UX 개선 (1~2개월)
- [ ] CSV 직접 붙여넣기 지원
- [ ] 테이블 검색 & 필터 (사이드바)
- [ ] 특정 테이블 클릭 시 관련 관계 하이라이트
- [ ] PNG/SVG 내보내기 (html2canvas)
- [ ] 그룹 색상 선택 UI
- [ ] 모바일 반응형 최적화

### v0.3 — 협업 기능 (2~4개월)
- [ ] 공유 URL → 단축 ID 변환 (간단한 백엔드 필요, Cloudflare Workers / Supabase)
- [ ] URL로 받은 ERD 편집 후 재공유 (수정 버전 분기)
- [ ] 팀 댓글 & 메모 기능

### v1.0 — 상용화 (4~6개월)
- [ ] 사용자 계정 시스템 (OAuth: GitHub / Google)
- [ ] 프로젝트 저장소 (내 ERD 목록)
- [ ] PDF 내보내기 (고품질)
- [ ] Confluence / Notion 임베드
- [ ] 슬랙 알림 연동

### v1.5 — 엔터프라이즈 (6~12개월)
- [ ] DB 직접 연결 (서버 백엔드, AWS RDS / Azure 지원)
- [ ] 변경사항 자동 감지 & ERD 업데이트
- [ ] 실시간 협업 (WebSocket)
- [ ] 온프레미스(자체 서버) 배포 패키지

---

## 수익화 플랜

### Free (무료)
| 항목 | 제한 |
|---|---|
| 테이블 수 | 최대 15개 |
| 공유 URL | 유효기간 72시간 |
| 버전 저장 | 최대 3개 (localStorage) |
| 그룹 수 | 최대 3개 |
| 내보내기 | 없음 |

### Pro (월 ₩9,900 / $7.9)
| 항목 | 제한 |
|---|---|
| 테이블 수 | 무제한 |
| 공유 URL | 영구 (서버 저장) |
| 버전 저장 | 무제한 (클라우드) |
| 그룹 수 | 무제한 |
| 내보내기 | PNG / SVG / PDF |
| 우선 지원 | 이메일 |

### Team (월 ₩29,900 / $22 · 최대 10인)
| 항목 | 내용 |
|---|---|
| Pro 모든 기능 | ✅ |
| 팀 공유 저장소 | 팀원 전체 접근 |
| 실시간 협업 뷰 | WebSocket (read-only) |
| Slack / Notion 연동 | ✅ |
| 우선 지원 | 슬랙 채널 |

### Enterprise (커스텀 견적)
- 온프레미스 배포
- DB 직접 연결 (VPC 내부)
- SSO (SAML / OIDC)
- SLA 보장

---

## 마케팅 전략

### 초기 채널 (무료)
1. **GitHub 오픈소스 공개** — Star 확보, 개발자 커뮤니티 유입
2. **노션/티스토리 포스팅** — "DBeaver 결과로 ERD 자동 생성하기" 튜토리얼
3. **개발자 커뮤니티** — OKKY, 인프런 Q&A, Reddit r/datascience
4. **Product Hunt 런칭** — 글로벌 사용자 확보

### 유료 전환 채널
1. **LinkedIn Ads** — DBA, Backend Dev 타겟
2. **Google Ads** — "ERD 자동 생성", "DB 설계 도구" 키워드
3. **엔터프라이즈 영업** — 중견~대기업 개발팀 직접 영업

---

## 기술 스택 선택 기준

| 구분 | 현재 | 향후 확장 |
|---|---|---|
| 프론트엔드 | Vanilla HTML/JS | 필요 시 Vue.js |
| 백엔드 | 없음 (정적) | Cloudflare Workers / FastAPI |
| 데이터베이스 | localStorage | Supabase / PlanetScale |
| 배포 | GitHub Pages / Vercel | Cloudflare Pages |
| 도메인 | 미정 | erdbuilderpro.io 또는 .app |

---

## KPI (목표 지표)

| 기간 | 목표 |
|---|---|
| 3개월 | GitHub Stars 200+, MAU 500 |
| 6개월 | Pro 구독자 30명 ($200+/월) |
| 12개월 | Pro/Team 합산 200명 ($2,000+/월) |
| 24개월 | Enterprise 계약 3건+ |
