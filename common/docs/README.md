# ERD Builder Pro — 사용법 가이드

## 개요

**ERD Builder Pro**는 MySQL, MSSQL, Oracle, PostgreSQL 등 다양한 DB의 스키마 정보를 SQL 조회 결과만으로 인터랙티브한 ERD(Entity Relationship Diagram)를 자동 생성하고, URL로 팀과 공유할 수 있는 웹 서비스입니다.

> 서버 없이 브라우저만으로 동작합니다. (Static HTML + JS)

---

## 시작하기

### Step 1 — DB 종류 선택 & SQL 복사
1. `index.html`을 브라우저로 엽니다.
2. 사용 중인 DB 종류를 클릭 선택합니다 (MySQL, MSSQL, Oracle, PostgreSQL, SQLite).
3. 자동으로 표시되는 **컬럼 조회 SQL**과 **FK 조회 SQL**을 복사합니다.
4. `YOUR_DB_NAME` / `YOUR_SCHEMA` 부분을 실제 DB명으로 교체합니다.

### Step 2 — SQL 실행 후 결과 붙여넣기
1. DBeaver, SQL*Plus, SSMS 등 DB 도구에서 SQL을 실행합니다.
2. 결과를 **JSON 형식**으로 내보냅니다.
   - DBeaver: 결과탭 → 우클릭 → **"Copy as JSON"**
   - SSMS: 결과탭 → 마우스 드래그 선택 → 복사 (CSV 가능)
3. **컬럼 정보 JSON**과 **FK 관계 JSON**을 각 입력창에 붙여넣기 합니다.
4. **[ERD 생성]** 버튼 클릭.

### Step 3 — ERD 확인 & 그룹화
- 자동으로 테이블 카드가 생성되고 관계선이 그려집니다.
- 테이블 카드를 **드래그**하여 원하는 위치로 이동할 수 있습니다.
- **그룹 타이틀**을 드래그하면 그룹 내 모든 테이블이 함께 이동합니다.
- **[자동 배치]** 버튼: 연관 관계 기반 스마트 레이아웃 재실행
- **[자동 그룹화 재실행]**: FK 기반 클러스터 자동 구성
- 그룹 이름은 우측 패널에서 직접 수정 가능합니다.

### Step 4 — 공유
- 현재 ERD 상태(테이블, 관계, 위치 포함)가 URL로 직렬화됩니다.
- **[링크 복사]** → 팀원에게 전달 → 링크 열기만으로 동일한 ERD 확인 가능.
- **로컬 버전 저장**: 버전명 입력 후 저장 → 브라우저 localStorage에 영구 보관.
- **[뷰어에서 열기]**: 공유용 뷰어(viewer.html) 별도 탭으로 오픈.

---

## ERD 캔버스 조작법

| 동작 | 방법 |
|---|---|
| 화면 이동(Pan) | 빈 영역 클릭 드래그 |
| 확대/축소 | 마우스 휠 스크롤 |
| 테이블 이동 | 테이블 카드 드래그 |
| 그룹 전체 이동 | 그룹 타이틀 드래그 |
| 뷰 초기화 | ⊙ 버튼 |
| 자동 배치 초기화 | ⟲ 버튼 (localStorage 삭제) |

---

## 지원 DB & 필드 매핑

### 입력 포맷 (컬럼 JSON)
```json
[
  {
    "TABLE_NAME": "user",
    "COLUMN_NAME": "id",
    "DATA_TYPE": "bigint",
    "COLUMN_TYPE": "bigint unsigned",
    "IS_NULLABLE": "NO",
    "COLUMN_KEY": "PRI",
    "COLUMN_COMMENT": "사용자 고유번호"
  },
  ...
]
```

| 필드명 | 설명 | MySQL | MSSQL | Oracle | PG |
|---|---|---|---|---|---|
| `TABLE_NAME` | 테이블명 | ✅ | ✅ | ✅ | ✅ |
| `COLUMN_NAME` | 컬럼명 | ✅ | ✅ | ✅ | ✅ |
| `DATA_TYPE` | 데이터 타입 | ✅ | ✅ | ✅ | ✅ |
| `COLUMN_KEY` | PRI/UNI/MUL | ✅ | 변환됨 | 변환됨 | 변환됨 |
| `IS_NULLABLE` | YES/NO | ✅ | ✅ | N/Y | YES/NO |

### 입력 포맷 (FK 관계 JSON)
```json
[
  {
    "TABLE_NAME": "user_posts",
    "COLUMN_NAME": "user_id",
    "REFERENCED_TABLE_NAME": "user",
    "REFERENCED_COLUMN_NAME": "id"
  }
]
```

---

## 파일 구조

```
common/
├── index.html          ← 메인 Wizard (Step 1~4)
├── viewer.html         ← 공유 링크 뷰어
├── erd-core.css        ← ERD 렌더링 스타일
├── erd-core.js         ← ERD 렌더링 엔진
├── sql-queries.js      ← DB별 스키마 조회 SQL
├── parser.js           ← 파싱 & 자동 그룹화
├── layout.js           ← 스마트 레이아웃 알고리즘
├── share.js            ← URL 공유/버전 관리
└── docs/
    ├── README.md       ← 이 파일
    ├── QUERIES.md      ← DB별 SQL 상세 레퍼런스
    ├── AI_GUIDELINE.md ← AI 코드 작성 지침
    └── ROADMAP.md      ← 수익화/로드맵
```

---

## FAQ

**Q. 서버가 없어도 동작하나요?**  
A. 네. 모든 기능이 순수 HTML+JS로 동작합니다. 로컬 파일로 열어도 됩니다.

**Q. 공유 URL이 너무 길어요.**  
A. 테이블/컬럼 수가 많을수록 URL이 길어집니다. 단축 URL 기능은 향후 서버 버전에서 제공 예정입니다.

**Q. 저장한 버전은 어디에 보관되나요?**  
A. 브라우저의 `localStorage`에 저장됩니다. 브라우저 데이터를 삭제하면 사라집니다. 중요한 버전은 공유 URL로 백업해두세요.

**Q. CSV 형식으로도 입력할 수 있나요?**  
A. `ERDParser.parseCSV(csvText)` 함수를 사용하면 가능합니다. UI에서의 CSV 직접 입력은 다음 버전에서 지원 예정입니다.
