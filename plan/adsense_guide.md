# AutoERD — Google AdSense 신청 가이드 & SEO 최적화 방향

> 작성일: 2026-05-21  
> 대상 프로젝트: AutoERD (autoerd.pages.dev)  
> 현재 상태: AdSense 코드 삽입 전 (placeholder 구성 완료)

---

## 목차

1. [AdSense 신청 준비 조건 체크리스트](#1-adsense-신청-준비-조건-체크리스트)
2. [트래픽 요건 — 얼마나 필요한가?](#2-트래픽-요건--얼마나-필요한가)
3. [AdSense 신청 절차](#3-adsense-신청-절차)
4. [코드 삽입 방법 (placeholder → 실제 광고)](#4-코드-삽입-방법-placeholder--실제-광고)
5. [현재 프로젝트 준비 상태 점검](#5-현재-프로젝트-준비-상태-점검)
6. [SEO 마케팅 최적화 방향](#6-seo-마케팅-최적화-방향)
7. [AdSense 승인 후 수익 예측](#7-adsense-승인-후-수익-예측)

---

## 1. AdSense 신청 준비 조건 체크리스트

### ✅ 필수 조건

| 항목 | 기준 | 현재 상태 |
|------|------|---------|
| **웹사이트 실제 운영** | 인터넷에서 접속 가능한 URL 필요 | ⚠️ Cloudflare Pages 배포 필요 |
| **도메인 소유권** | pages.dev 서브도메인도 가능 | ✅ autoerd.pages.dev 예정 |
| **고유한 콘텐츠** | 복사/스크래핑 아닌 자체 콘텐츠 | ✅ 직접 개발한 ERD 도구 |
| **정책 페이지** | 개인정보처리방침 필수 | ✅ privacy.html 작성 완료 |
| **이용약관** | 권장 (필수는 아님) | ✅ terms.html 작성 완료 |
| **명확한 내비게이션** | 사용자가 사이트를 이동할 수 있는 구조 | ✅ 랜딩 → ERD 화면 구조 |
| **모바일 반응형** | 모바일에서도 정상 동작 | ✅ 반응형 스타일 적용 완료 |
| **성인/도박/불법 콘텐츠 없음** | AdSense 정책 준수 | ✅ 기술 도구 서비스 |
| **Google 계정** | AdSense 신청용 Google 계정 | 🔲 개인 Google 계정 준비 필요 |
| **만 18세 이상** | 계정 소유자 기준 | ✅ (성인 운영 전제) |

### ⚠️ 권장 조건 (승인률에 영향)

| 항목 | 권장 기준 | 현재 상태 |
|------|---------|---------|
| **사이트 운영 기간** | 최소 1~3개월 권장 (필수 아님) | ⚠️ 배포 후 바로 신청 가능하나 운영 이력 있으면 유리 |
| **콘텐츠량** | 충분한 페이지/콘텐츠 | ⚠️ 현재 3페이지 (index, privacy, terms) — 부족할 수 있음 |
| **트래픽** | 일 30~100명 이상 권장 | ⚠️ 아래 트래픽 섹션 참고 |
| **HTTPS** | 필수 | ✅ Cloudflare Pages 자동 HTTPS |
| **robots.txt / sitemap.xml** | SEO 기반 구축 | ✅ 완료 |
| **About/소개 페이지** | 사이트 신뢰도 향상 | 🔲 없음 — 추가 권장 |

---

## 2. 트래픽 요건 — 얼마나 필요한가?

### Google AdSense 공식 입장

> **"AdSense는 트래픽 최소 요건을 공식적으로 명시하지 않습니다."**

즉, **이론상 트래픽 0에서도 신청 가능**합니다.  
그러나 실제 승인 여부는 **콘텐츠 품질 + 정책 준수**가 핵심입니다.

### 실질적 권장 기준 (커뮤니티/경험치 기반)

| 일일 방문자 | 승인 가능성 | 비고 |
|-----------|-----------|------|
| 0~10명 | 낮음 | 콘텐츠만 충실하면 승인 사례 있음 |
| 30~100명 | 보통 | 이 정도면 검토 충분히 가능 |
| 100명 이상 | 높음 | 승인 가능성 크게 올라감 |
| 500명 이상 | 매우 높음 | 거의 통과 |

### AutoERD의 경우

- **배포 직후 신청 가능** — AdSense는 트래픽보다 **콘텐츠 적합성**을 더 중시
- **기술 도구 + 영어/한국어 콘텐츠** → 승인 친화적 카테고리
- **단, 콘텐츠가 단 3페이지라면** 심사에서 "콘텐츠 부족"으로 반려될 수 있음

### 권장 전략 : 배포 2~4주 후 신청
```
[Week 1]  Cloudflare Pages 배포 + 실 사용자 테스트
[Week 2]  about.html, blog/faq 페이지 추가 → 콘텐츠 보강
[Week 3]  SEO 인덱싱 확인 (Google Search Console)
[Week 4]  AdSense 신청
```

---

## 3. AdSense 신청 절차

### Step 1: 배포 확인

```
https://autoerd.pages.dev/        ← 메인 도구
https://autoerd.pages.dev/privacy.html  ← 개인정보처리방침
https://autoerd.pages.dev/terms.html    ← 이용약관
```
- 모든 페이지 정상 접속 확인
- 모바일에서도 정상 동작 확인

### Step 2: Google AdSense 계정 신청

1. [https://adsense.google.com](https://adsense.google.com) 접속
2. **"시작하기"** 클릭
3. 보유 Google 계정으로 로그인
4. 웹사이트 URL 입력: `https://autoerd.pages.dev`
5. 이메일 수신 동의 선택
6. **"AdSense 사용 시작"** 클릭

### Step 3: 사이트 연결 (소유권 인증)

Google이 제공하는 **확인 코드 스니펫**을 `<head>` 태그 안에 삽입:

```html
<!-- Google AdSense 소유권 확인 코드 (예시) -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

> ⚠️ `ca-pub-XXXXXXXX` 부분은 본인 계정의 실제 publisher ID로 교체해야 합니다.

**삽입 위치** (`index.html` 기준):

```html
<head>
  <meta charset="UTF-8" />
  <!-- ... 기존 메타 태그들 ... -->
  
  <!-- ▼ AdSense 확인 코드 여기에 삽입 -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
       crossorigin="anonymous"></script>
</head>
```

### Step 4: 심사 대기

- 심사 기간: **보통 1~14일** (평균 2~7일)
- 심사 중에도 사이트는 정상 운영
- Google이 이메일로 결과 통보

### Step 5: 승인 후 광고 단위 생성

승인 완료 후:
1. AdSense 대시보드 → **"광고"** 메뉴
2. **"광고 단위 기준"** → 광고 유형 선택
3. 자동 광고(Auto Ads) 또는 수동 광고 단위 생성
4. 생성된 코드를 placeholder 위치에 삽입

### Step 6: 반려 시 대처

| 반려 사유 | 해결책 |
|---------|--------|
| 콘텐츠 부족 | about.html, FAQ 페이지 추가 |
| 콘텐츠 없음/불충분 | 도구 사용법 블로그 포스트 추가 |
| 탐색 불가 | 헤더 내비게이션 메뉴 보강 |
| 정책 미준수 | privacy.html 내용 보강 |
| 사이트 접속 불가 | Cloudflare Pages 배포 상태 점검 |

---

## 4. 코드 삽입 방법 (placeholder → 실제 광고)

### 현재 placeholder 구조 (index.html)

현재 `index.html`에는 3곳의 광고 영역이 shimmer 애니메이션으로 표시됩니다:

```
[상단 배너]  728×90  → .ad-banner-top > .ad-placeholder
[사이드]    160×600  → .ad-side > .ad-side-block  
[결과 상단] 728×90   → .result-ad-strip
```

### 승인 후 교체 방법

#### 상단 배너 (728×90 / Leaderboard)

**변경 전 (placeholder):**
```html
<div class="ad-banner-top">
  <div class="ad-placeholder" style="width:728px;height:90px;">광고 영역</div>
</div>
```

**변경 후 (실제 AdSense):**
```html
<div class="ad-banner-top">
  <ins class="adsbygoogle"
       style="display:inline-block;width:728px;height:90px"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

#### 사이드 광고 (160×600 / Wide Skyscraper)

**변경 후:**
```html
<ins class="adsbygoogle"
     style="display:inline-block;width:160px;height:600px"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

#### 자동 광고 (Auto Ads) — 가장 간단한 방법

`<head>` 안에 한 줄만 추가하면 Google이 최적 위치에 자동 배치:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

> 💡 **자동 광고 권장** — 처음에는 Auto Ads로 시작하고, 수익 데이터를 보며 수동 단위로 최적화

---

## 5. 현재 프로젝트 준비 상태 점검

### ✅ 잘 된 것들

| 항목 | 내용 |
|------|------|
| SEO 메타 태그 | title, description, keywords, og, twitter:card 모두 완료 |
| robots.txt | `Allow: /` + sitemap 경로 정상 |
| sitemap.xml | 3개 URL 등록됨 |
| HTTPS | Cloudflare Pages 자동 적용 |
| 정책 페이지 | privacy.html, terms.html 존재 |
| 모바일 반응형 | 반응형 스타일 완료 |
| 광고 placeholder | 3개 영역 구성 완료 |
| 콘텐츠 가치 | 실제 기능이 있는 무료 도구 |

### ⚠️ 보강 권장 항목

| 항목 | 이유 | 우선순위 |
|------|------|---------|
| `about.html` 또는 About 섹션 | AdSense 심사 시 사이트 신뢰도 | 높음 |
| FAQ / 사용법 페이지 | 콘텐츠량 보강 | 중간 |
| 헤더 내비게이션 메뉴 | privacy, terms, about 링크 | 높음 |
| og:url, og:image 완성 | 소셜 공유 미리보기 | 중간 |
| Google Search Console 등록 | 인덱싱 확인 및 sitemap 제출 | 높음 |
| canonical URL 태그 | 중복 페이지 방지 | 낮음 |

---

## 6. SEO 마케팅 최적화 방향

### 6-1. 기술 SEO (즉시 실행 가능)

#### ① `og:url` / `og:image` 완성
현재 `index.html`에 누락된 OG 태그 보완:
```html
<meta property="og:url" content="https://autoerd.pages.dev/" />
<meta property="og:image" content="https://autoerd.pages.dev/og-image.png" />
```
> OG 이미지(1200×630px)를 별도로 만들어 업로드하면 SNS 공유 시 미리보기 카드가 생성됩니다.

#### ② `canonical` 태그 추가
```html
<link rel="canonical" href="https://autoerd.pages.dev/" />
```

#### ③ sitemap.xml에 `lastmod`, `priority` 추가
```xml
<url>
  <loc>https://autoerd.pages.dev/</loc>
  <lastmod>2026-05-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

#### ④ Google Search Console 등록

1. [https://search.google.com/search-console](https://search.google.com/search-console) 접속
2. 속성 추가 → URL 접두사 → `https://autoerd.pages.dev/`
3. 소유권 확인 (HTML 파일 업로드 또는 메타 태그 방식)
4. sitemap.xml 제출: `https://autoerd.pages.dev/sitemap.xml`
5. 색인 생성 요청 (URL 검사 → 색인 생성 요청)

### 6-2. 콘텐츠 SEO (단기 — 배포 후 1~2주)

#### 타겟 키워드 전략

| 키워드 | 월 검색량(추정) | 경쟁도 | 전략 |
|--------|--------------|--------|------|
| `ERD 생성기` | 중 | 낮음 | 메인 타겟 |
| `SQL DDL ERD 자동` | 낮음 | 매우 낮음 | 롱테일 타겟 |
| `MySQL ERD 무료` | 낮음-중 | 낮음 | 롱테일 타겟 |
| `database diagram free` | 높음 | 높음 | 장기 목표 |
| `ERD generator online` | 중-높음 | 중간 | 장기 목표 |
| `PostgreSQL ERD tool` | 낮음-중 | 낮음 | 틈새 공략 |

#### 콘텐츠 확장 방향

```
[추가 권장 페이지]
├── about.html         — 서비스 소개, 만든 이유
├── how-to-use.html    — 사용법 가이드 (스크린샷 포함)
├── faq.html           — 자주 묻는 질문
└── blog/
    ├── mysql-erd-tutorial.html    — "MySQL ERD 그리는 법"
    ├── postgresql-erd.html        — "PostgreSQL ERD 자동 생성"
    └── ddl-guide.html             — "CREATE TABLE로 ERD 만들기"
```

> 블로그 포스트 1~3개만 추가해도 AdSense 심사 콘텐츠 충족 + 롱테일 키워드 유입 확보

### 6-3. 마케팅 채널 전략 (단기 트래픽 확보)

#### 무료 채널 우선

| 채널 | 방법 | 기대 효과 |
|------|------|---------|
| **Reddit** | r/webdev, r/programming, r/Database에 공유 | 초기 트래픽 폭발 가능 |
| **Product Hunt** | 론칭 등록 (무료) | 개발자 커뮤니티 노출 |
| **Hacker News: Show HN** | "Show HN: Free ERD generator from SQL DDL" | 고품질 트래픽 |
| **GitHub** | 공개 레포 + GitHub README 링크 | 개발자 유입 |
| **Twitter/X** | #webdev #database #sql 태그 포스팅 | 지속적 노출 |
| **DEV.to** | 기술 블로그 포스트 ("I built a free ERD tool") | SEO + 커뮤니티 유입 |
| **국내: 기계인간 / 개발바닥** | 국내 개발자 커뮤니티 | 한국어 유입 |

#### 기대 시나리오

```
Week 1: 배포 + Reddit/HN 공유 → 200~1,000명 일시 유입
Week 2: 자연 유입 시작 (Google 인덱싱)
Week 3~4: AdSense 신청 → 심사 통과
Month 2~3: 자연 검색 트래픽 월 500~2,000명
Month 6+: SEO 정착 시 월 5,000명+ 가능
```

### 6-4. AdSense 외 수익화 보완 옵션

| 방법 | 특징 | 추천도 |
|------|------|--------|
| **Google AdSense** | 자동 광고, 설정 쉬움 | ⭐⭐⭐⭐⭐ |
| **Carbon Ads** | 개발자 친화적, CPC 높음, 심사 있음 | ⭐⭐⭐⭐ |
| **EthicalAds** | 개발자 타겟, 텍스트 광고 | ⭐⭐⭐ |
| **Affiliate (공구상, DB 호스팅)** | Railway, PlanetScale 등 추천 링크 | ⭐⭐⭐ |
| **Buy Me a Coffee / Ko-fi** | 후원 버튼 추가 | ⭐⭐ |

---

## 7. AdSense 승인 후 수익 예측

### 수익 계산 기준

| 지표 | 기준값 |
|------|--------|
| RPM (1000회 노출당 수익) | $1~3 (기술 도구 평균) |
| CTR (클릭률) | 1~3% |
| CPC (클릭당 단가) | $0.10~0.50 |

### 시나리오별 예상 월 수익

| 월 페이지뷰 | RPM $2 기준 | CTR 2% × CPC $0.3 |
|-----------|-----------|------------------|
| 3,000 PV | $6 | $18 |
| 10,000 PV | $20 | $60 |
| 30,000 PV | $60 | $180 |
| 100,000 PV | $200 | $600 |

> 💡 기술 도구 사이트는 개발자 타겟이라 CTR은 낮지만 CPC가 높게 나오는 편

---

## 요약 — 지금 당장 할 일

```
✅ 이미 완료
  - SEO 메타 태그 / robots.txt / sitemap.xml
  - privacy.html / terms.html
  - 광고 placeholder 3영역
  - 모바일 반응형

🔲 배포 전 (필수)
  1. Cloudflare Pages 실배포 확인
  2. 도메인 확정 후 robots.txt, sitemap.xml URL 갱신
  3. og:url, og:image 메타 태그 완성
  4. 헤더에 privacy / terms 링크 추가 (내비게이션)

🔲 배포 후 즉시 (AdSense 신청 전 준비)
  5. Google Search Console 등록 + sitemap 제출
  6. about.html 또는 About 섹션 추가
  7. Reddit, Hacker News, Product Hunt 공유 (초기 트래픽)

🔲 배포 2~4주 후
  8. AdSense.google.com 에서 신청
  9. 소유권 확인 스크립트를 <head>에 삽입 후 재배포
  10. 심사 통과 후 placeholder → 실제 광고 코드 교체
```

---

*참고: Google AdSense 정책 및 심사 기준은 Google에 의해 수시로 변경될 수 있으므로, 신청 시점에 [https://support.google.com/adsense](https://support.google.com/adsense) 공식 문서를 함께 확인하세요.*
