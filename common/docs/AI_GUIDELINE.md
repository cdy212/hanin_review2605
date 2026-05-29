# ERD Builder Pro — AI 코드 작성 지침 (AI Guideline)

## 프로젝트 개요
ERD Builder Pro는 **정적 HTML+JS 기반 웹 서비스**입니다.
백엔드 없이 브라우저만으로 동작하며, 수익화 목표의 상용 제품입니다.

---

## 아키텍처 원칙

### 1. 정적 파일 우선 (Static First)
- 모든 핵심 기능은 서버 없이 동작해야 합니다.
- Node.js, Python 등 백엔드 코드는 스크립트/유틸리티 용도로만 사용합니다.
- DB 직접 접속은 **Node.js 스크립트** 또는 **향후 백엔드 서버**에서만 허용합니다.

### 2. 모듈 분리
| 파일 | 역할 | 변경 시 주의 |
|---|---|---|
| `erd-core.js` | ERD 렌더링 엔진 | 다른 모듈에 의존하지 않아야 함 |
| `erd-core.css` | ERD 스타일 | 테마 클래스명 변경 시 `erd-core.js` 동기화 필요 |
| `parser.js` | 데이터 파싱 | 입력/출력 포맷 문서화 필수 |
| `layout.js` | 레이아웃 알고리즘 | 좌표 계산 로직만 포함 (DOM 조작 금지) |
| `share.js` | URL 공유/저장 | localStorage 키 변경 시 마이그레이션 필요 |
| `sql-queries.js` | SQL 모음 | 새 DB 추가 시 동일 인터페이스 유지 |

---

## 데이터 포맷

### Tables 배열
```js
[
  {
    id: 'user',             // 고유 식별자 (보통 table name)
    name: 'user',           // 화면 표시 테이블명
    label: '사용자',         // 부제목/설명
    theme: 'blue',          // 테마 클래스 (blue|green|orange|gray|pink|purple|red|teal)
    tag: 'CORE',            // 우측 뱃지 텍스트
    x: 100, y: 200,         // 캔버스 절대좌표
    fields: [
      {
        key: 'PK',          // 'PK' | 'FK' | 'UQ' | ''
        name: 'id',
        type: 'BIGINT',
        pk: true,
        fk: false,
        uq: false,
        nn: true,           // NOT NULL
        comment: '...'      // optional
      }
    ]
  }
]
```

### Relations 배열
```js
[
  {
    from: 'user_posts',        // 자식 테이블 (FK 보유)
    to: 'user',                // 부모 테이블 (PK 참조)
    type: 'many-one',          // 'many-one' | 'many-many' | 'self'
    label: 'N:1'              // 표시 레이블
  }
]
```

### Groups 배열
```js
[
  {
    id: 'user_group',
    name: '사용자 관리',
    nameEn: 'User Management',
    color: '#0969da',
    bgColor: 'rgba(9,105,218,0.045)',
    borderColor: 'rgba(9,105,218,0.25)',
    barColor: '#0969da',
    members: ['user', 'role', 'user_roles']  // table ids
  }
]
```

---

## 코딩 규칙

### JavaScript
- `const`/`let` 사용, `var` 사용 금지
- 모듈은 `window.MODULENAME = (function() { ... return {}; })();` IIFE 패턴 사용
- DOM 조작은 `erd-core.js`에서만 수행
- 외부 라이브러리 사용 최소화 (현재: Google Fonts만 사용)
- 에러는 `throw new Error()` + 사용자 친화적 메시지

### CSS
- CSS 변수(`--var`) 사용으로 테마 일관성 유지
- 클래스명 `erd-`, `tbl-`, `grp-` 접두사 유지
- 인라인 스타일은 동적 값(색상, 좌표)에만 사용

### HTML
- 시맨틱 태그 사용 (`header`, `main`, `section` 등)
- `id`는 고유하게, `class`는 재사용으로 구분
- SEO: 각 페이지마다 `<title>`, `<meta name="description">` 필수

---

## 확장 시 주의사항

### 새 DB 추가 (`sql-queries.js`)
```js
window.SQL_QUERIES['newdb'] = {
  label: 'New DB',
  icon: '🆕',
  columns: `-- SQL ...`,
  relations: `-- SQL ...`
};
```

### 새 테마 추가 (`erd-core.css`)
```css
.theme-newcolor .table-header { background: #...; border-bottom-color: #...; }
.theme-newcolor .table-name   { color: #...; }
.theme-newcolor .table-tag    { background: #...; color: #...; border: 1px solid #...; }
```

### ERDCore.init() 옵션 변경 시
- `erd-core.js`의 `init()` 파라미터 변경 시 `index.html`, `viewer.html` 동기화 필요
- 기존 공유 URL 하위호환성 고려 (payload.v 버전 필드 참고)

---

## 로컬스토리지 키 목록

| 키 | 내용 | 수명 |
|---|---|---|
| `erd_auto_positions` | 드래그 후 자동 저장된 테이블 위치 | 무기한 |
| `erd_versions` | 사용자 수동 저장 버전 목록 | 무기한 |
| `erd_positions` | (레거시) 한인회 ERD 전용 위치 | 무기한 |

---

## Git 커밋 메시지 규칙
```
feat: 새 기능 추가
fix: 버그 수정
style: CSS/UI 변경 (기능 변경 없음)
refactor: 코드 구조 개선
docs: 문서 추가/수정
chore: 빌드/설정 변경
```
