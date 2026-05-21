# ERD HTML 공통 프롬프트 템플릿

> koreaTaiwanApi 프로젝트 ERD (`docs/erd.html`) 제작을 기반으로 작성된  
> **재사용 가능한 ERD 화면 제작 공통 프롬프트** (v2 — 비즈니스 그룹 패널 적용)

---

## 1. 기술 스택

| 구분 | 내용 |
|------|------|
| **마크업** | HTML5 (단일 파일, 외부 의존성 없음) |
| **스타일** | Vanilla CSS + CSS Custom Properties |
| **스크립트** | Vanilla JavaScript (ES6+) |
| **다이어그램** | Inline SVG (관계선 동적 생성) |
| **폰트** | Google Fonts — `Inter` (UI) + `JetBrains Mono` (컬럼명/타입) |
| **배포** | `.html` 단일 파일, 브라우저 직접 실행 |

---

## 2. 디자인 시스템

### 2-1. CSS 변수 (라이트 테마)

```css
:root {
  --bg:           #f4f6f9;   /* 전체 배경 */
  --surface:      #ffffff;   /* 카드 배경 */
  --surface2:     #f0f2f5;   /* 보조 서피스 */
  --border:       #d0d7de;   /* 기본 보더 */
  --border-bright:#a8b1bb;   /* hover 보더 */
  --text:         #1c2128;   /* 기본 텍스트 */
  --text-muted:   #57606a;   /* 보조 텍스트 */
  --text-dim:     #8c959f;   /* 희미한 텍스트 */
  --pk-color:     #b08000;   /* PK 골드 */
  --fk-color:     #0969da;   /* FK 블루 */
}
```

### 2-2. 배경

```css
#canvas-wrap {
  background-image: radial-gradient(circle, #c8d0d9 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## 3. 비즈니스 그룹 패널 ★ 핵심

테이블을 업무 도메인별로 **그룹 패널**로 묶어서 시각화합니다.

### 3-1. 그룹 데이터 구조

```js
const groups = [
  {
    id: 'user',                          // 고유 id (DOM: grp-user)
    name: '사용자 관리',                  // 한글 표시명
    nameEn: 'User Management',           // 영문 표시명
    color: '#0969da',                    // 텍스트 색
    bgColor: 'rgba(9,105,218,0.045)',    // 패널 배경 (연한 tint)
    borderColor: 'rgba(9,105,218,0.25)', // 점선 테두리 색
    barColor: '#0969da',                 // 왼쪽 컬러 바
    members: ['user', 'role', 'user_roles'], // 소속 테이블 id 목록
  },
  // ... 추가 그룹
];
```

### 3-2. 그룹 패널 HTML 구조

```html
<div class="erd-group" id="grp-{id}"
     style="background:{bgColor}; border-color:{borderColor};">
  <div class="group-header">
    <div class="group-bar" style="background:{barColor};"></div>
    <div>
      <span class="group-name"   style="color:{color};">{name}</span>
      <span class="group-name-en" style="color:{color};">{nameEn}</span>
    </div>
  </div>
</div>
```

### 3-3. 그룹 CSS

```css
.erd-group {
  position: absolute; border-radius: 18px;
  border: 2px dashed transparent;
  pointer-events: none; z-index: 0;
}
.group-header { position: absolute; top: 14px; left: 18px; display: flex; align-items: center; gap: 10px; }
.group-bar    { width: 4px; height: 30px; border-radius: 2px; flex-shrink: 0; }
.group-name   { font-size: 13px; font-weight: 800; display: block; }
.group-name-en { font-size: 10px; font-weight: 500; opacity: 0.6; display: block; }
```

### 3-4. 동적 그룹 경계 계산 (핵심 함수)

테이블을 드래그해도 그룹 패널이 자동으로 따라 이동합니다.

```js
const G_PAD = { top: 52, right: 28, bottom: 28, left: 28 };

function updateGroupBounds() {
  groups.forEach(g => {
    const el = groupEls[g.id];
    let minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
    g.members.forEach(mid => {
      const t = tableEls[mid]; if (!t) return;
      const x=parseInt(t.style.left), y=parseInt(t.style.top);
      const w=t.offsetWidth||245,     h=t.offsetHeight||200;
      minX=Math.min(minX,x); minY=Math.min(minY,y);
      maxX=Math.max(maxX,x+w); maxY=Math.max(maxY,y+h);
    });
    if (minX===Infinity) return;
    el.style.left   = (minX - G_PAD.left) + 'px';
    el.style.top    = (minY - G_PAD.top)  + 'px';
    el.style.width  = (maxX - minX + G_PAD.left + G_PAD.right) + 'px';
    el.style.height = (maxY - minY + G_PAD.top  + G_PAD.bottom)+ 'px';
  });
}
// 드래그/줌/패닝 이벤트에서 항상 호출 필요
```

### 3-5. 렌더링 순서 (z-index)

| 레이어 | z-index | 설명 |
|--------|---------|------|
| 그룹 패널 `.erd-group` | 0 | 가장 아래 |
| SVG 관계선 `#svg-lines` | 2 | 패널 위, 카드 아래 |
| 테이블 카드 `.erd-table` | 3 | 기본 |
| 드래그 중 테이블 | 50 | 최상단 |
| UI (헤더/범례/버튼) | 200–300 | 항상 최상단 |

> **중요**: 그룹 div를 먼저 `canvas.appendChild()`, 그 다음 테이블 div 추가.

---

## 4. 테이블 컬러 테마 (그룹 내 통일)

그룹에 속한 모든 테이블은 **같은 테마 클래스**를 사용합니다.

| 그룹 | 테마 클래스 | 헤더 배경 | 테이블명 색 |
|------|-------------|-----------|-------------|
| 사용자 관리 | `theme-blue`   | `#e8f1fc` | `#0550ae` |
| 지역        | `theme-green`  | `#e6f4ea` | `#166534` |
| 게시판      | `theme-orange` | `#fef3e2` | `#92400e` |
| 공통/기타   | `theme-gray`   | `#f0f2f5` | `#424a53` |

```css
/* 예시 — 오렌지 테마 */
.theme-orange .table-header { background: #fef3e2; border-bottom-color: #fcd49a; }
.theme-orange .table-name   { color: #92400e; }
.theme-orange .table-tag    { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
```

---

## 5. 테이블 카드 구조

```html
<div class="erd-table theme-{color}" id="tbl-{id}">
  <div class="table-header">
    <div>
      <div class="table-name">{db_table_name}</div>
      <div class="table-sub">{한글 설명}</div>
    </div>
    <span class="table-tag">{CORE|AUTH|GEO|POST|UTIL|JOIN}</span>
  </div>
  <div class="table-fields">
    <div class="field-row">
      <span class="field-key pk">PK</span>
      <span class="field-name pk-name">id</span>
      <span class="field-type">BIGINT</span>
    </div>
    <!-- field-row 반복 -->
  </div>
</div>
```

### 컬럼 키 규칙

| key | field-name class | 색상 |
|-----|-----------------|------|
| `PK` | `pk-name` | `#b08000` 골드 + bold |
| `FK` | `fk-name` | `#0969da` 블루 |
| `UQ` | (없음) | `#7c3aed` 퍼플 |
| 빈값 | (없음) | 기본 텍스트 |

---

## 6. SVG 관계선

| 타입 | 색상 | 스타일 | 마커 |
|------|------|--------|------|
| `many-one` N:1 | `#1a7f37` | 실선 2px | 시작: dot, 끝: arrow |
| `many-many` M:N | `#7c3aed` | 점선 `6,3` 2px | 끝: arrow |
| `self` 자기참조 | `#b35900` | 실선 2px | 시작: dot, 끝: arrow |

- 경로: 베지어 곡선 (최적 포트 자동 선택 — 좌/우/상/하)
- 레이블: 흰색 rect 배경 + 텍스트 `JetBrains Mono 10px bold`
- opacity: `0.9`

---

## 7. 인터랙션

| 기능 | 구현 |
|------|------|
| 테이블 드래그 | `mousedown → mousemove → mouseup`, `updateGroupBounds()` 연동 |
| 캔버스 패닝 | 빈 영역 클릭+드래그 |
| 휠 줌 | 마우스 위치 기준 scale 변환 (0.25 ~ 2.0) |
| 줌 버튼 | ＋/－/⊙ (fixed 우하단) |
| 그룹 리사이즈 | 드래그/줌 시 `updateGroupBounds()` 자동 호출 |

---

## 8. JS 데이터 포맷

```js
// 그룹
const groups = [
  { id, name, nameEn, color, bgColor, borderColor, barColor, members:['table_id'...] },
];

// 테이블
const tables = [
  {
    id: 'table_id',    name: 'db_table_name',
    label: '한글 설명', theme: 'blue',
    tag: 'CORE',        x: 80, y: 90,
    fields: [
      { key:'PK', name:'id',      type:'BIGINT',     pk:true },
      { key:'FK', name:'user_id', type:'BIGINT',     fk:true, nn:true },
      { key:'UQ', name:'(a,b)',   type:'UNIQUE',     uq:true },
      { key:'',   name:'name',    type:'VARCHAR(50)', nn:true },
    ]
  },
];

// 관계
const relations = [
  { from:'table_a', to:'table_b', type:'many-one',  label:'N:1'  },
  { from:'table_a', to:'table_a', type:'self',       label:'self' },
  { from:'tbl_join',to:'table_c', type:'many-many',  label:'M:N'  },
];
```

---

## 9. 새 ERD 제작 체크리스트

```
[ ] @Entity 클래스 목록 파악
[ ] 컬럼/타입/제약조건 확인 (@Id, @JoinColumn, @UniqueConstraint 등)
[ ] 관계 파악 (@ManyToOne, @ManyToMany, @OneToMany, self-reference)
[ ] 업무 도메인별 그룹 분류 (사용자/지역/게시판/공통 등)
[ ] 그룹 내 테이블 테마 통일 (같은 그룹 = 같은 theme 클래스)
[ ] tables[] 배열 작성 — 그룹별로 묶어서 주석 구분
[ ] groups[] 배열 작성 — members에 table id 목록
[ ] relations[] 배열 작성
[ ] x/y 초기 좌표 — 그룹별 영역 분리, 물리적 겹침 없도록
[ ] 브라우저에서 열어 그룹 패널/관계선/드래그/줌 동작 확인
[ ] 출력: docs/erd.html (단일 파일)
```

---

## 10. AI 활용 프롬프트 예시

```
다음 조건으로 ERD HTML을 생성해줘:

- 프로젝트: [프로젝트명] Spring Boot JPA
- 출력: docs/erd.html (단일 파일, 외부 의존성 없음)
- 디자인: docs/common/erd_prompt_template.md 기준 적용
- 모델 경로: [src/main/java/.../model 경로]

[그룹 구성 예시]
- 사용자 관리: user, role, user_roles → theme-blue
- 지역: regions, user_regions → theme-green
- 게시판: user_posts, user_posts_comment, ... → theme-orange
- 공통: category → theme-gray

[요구사항]
- 비즈니스 그룹별 패널(음영+점선 테두리+컬러바+그룹명) 표시
- 같은 그룹 내 테이블 헤더 색상 통일
- 드래그 시 그룹 패널 자동 리사이즈
- 테이블 드래그/줌/패닝 인터랙션
- 흰색 배경, 도트 그리드
- 이모지 없음 / 단순 텍스트 표현
- 기술 스택 배지: Spring Boot JPA / MySQL
```

---

## 11. 스켈레톤 코드 (복사 후 데이터만 교체)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{프로젝트명} — DB ERD</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    :root {
      --bg:#f4f6f9; --surface:#fff; --surface2:#f0f2f5;
      --border:#d0d7de; --border-bright:#a8b1bb;
      --text:#1c2128; --text-muted:#57606a; --text-dim:#8c959f;
      --pk-color:#b08000; --fk-color:#0969da;
    }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; overflow:hidden; }

    header {
      position:fixed; top:0; left:0; right:0; z-index:300; height:56px;
      background:rgba(255,255,255,0.96); backdrop-filter:blur(12px);
      border-bottom:1px solid var(--border);
      display:flex; align-items:center; justify-content:space-between; padding:0 24px;
      box-shadow:0 1px 4px rgba(0,0,0,0.08);
    }
    .logo { display:flex; align-items:center; gap:10px; font-weight:700; font-size:16px; }
    .logo-icon {
      width:28px; height:28px; border-radius:6px;
      background:linear-gradient(135deg,#0969da,#7c3aed);
      display:flex; align-items:center; justify-content:center;
      font-size:12px; font-weight:800; color:#fff;
    }
    .header-meta { display:flex; align-items:center; gap:14px; }
    .badge { padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600; border:1px solid; }
    .badge-blue  { color:#0969da; border-color:rgba(9,105,218,.3);  background:rgba(9,105,218,.06); }
    .badge-green { color:#1a7f37; border-color:rgba(26,127,55,.3); background:rgba(26,127,55,.06); }

    .controls { position:fixed; bottom:24px; right:24px; z-index:300; display:flex; flex-direction:column; gap:8px; }
    .ctrl-btn {
      width:40px; height:40px; background:#fff; border:1px solid var(--border);
      border-radius:8px; cursor:pointer; display:flex; align-items:center;
      justify-content:center; font-size:18px; box-shadow:0 1px 4px rgba(0,0,0,.1);
      transition:all .2s;
    }
    .ctrl-btn:hover { background:var(--surface2); }

    .legend {
      position:fixed; bottom:24px; left:24px; z-index:300;
      background:rgba(255,255,255,.96); border:1px solid var(--border);
      border-radius:12px; padding:14px 18px;
      box-shadow:0 2px 12px rgba(0,0,0,.1); font-size:11px;
    }
    .legend-title { font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; margin-bottom:8px; }
    .legend-item  { display:flex; align-items:center; gap:8px; margin-bottom:5px; }
    .legend-line  { width:26px; height:2px; border-radius:2px; }
    .legend-dot   { width:10px; height:10px; border-radius:3px; flex-shrink:0; }
    .legend-sep   { height:1px; background:var(--border); margin:8px 0; }

    #canvas-wrap {
      position:fixed; top:56px; left:0; right:0; bottom:0;
      overflow:hidden; cursor:grab;
      background-image:radial-gradient(circle,#c8d0d9 1px,transparent 1px);
      background-size:24px 24px;
    }
    #canvas-wrap:active { cursor:grabbing; }
    #erd-canvas { position:absolute; transform-origin:0 0; user-select:none; }
    #svg-lines  { position:absolute; top:0; left:0; pointer-events:none; overflow:visible; z-index:2; }

    /* Group */
    .erd-group { position:absolute; border-radius:18px; border:2px dashed transparent; pointer-events:none; z-index:0; }
    .group-header { position:absolute; top:14px; left:18px; display:flex; align-items:center; gap:10px; }
    .group-bar    { width:4px; height:30px; border-radius:2px; flex-shrink:0; }
    .group-name   { font-size:13px; font-weight:800; display:block; }
    .group-name-en{ font-size:10px; font-weight:500; opacity:.6; display:block; }

    /* Table Card */
    .erd-table {
      position:absolute; background:#fff;
      border:1.5px solid var(--border); border-radius:10px; min-width:245px;
      box-shadow:0 2px 8px rgba(0,0,0,.08); cursor:move; z-index:3;
      transition:box-shadow .2s,border-color .2s,transform .15s;
    }
    .erd-table:hover { border-color:var(--border-bright); box-shadow:0 6px 20px rgba(0,0,0,.13),0 0 0 2px var(--border-bright); transform:translateY(-2px); }
    .table-header { padding:10px 14px; border-radius:9px 9px 0 0; display:flex; align-items:center; gap:8px; border-bottom:1.5px solid var(--border); }
    .table-name { font-weight:700; font-size:13px; }
    .table-sub  { font-size:10px; color:var(--text-muted); margin-top:1px; }
    .table-tag  { margin-left:auto; font-size:9px; font-weight:700; padding:2px 7px; border-radius:6px; text-transform:uppercase; letter-spacing:.06em; }
    .table-fields { padding:4px 0; }
    .field-row {
      padding:4px 14px; display:grid; grid-template-columns:22px 1fr auto;
      align-items:center; gap:6px; font-size:12px; transition:background .1s;
    }
    .field-row:hover { background:#f5f7fa; }
    .field-key { font-size:9px; font-weight:800; text-align:center; color:var(--text-dim); }
    .field-key.pk { color:var(--pk-color); } .field-key.fk { color:var(--fk-color); } .field-key.uq { color:#7c3aed; }
    .field-name { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text); }
    .field-name.pk-name { color:var(--pk-color); font-weight:700; }
    .field-name.fk-name { color:var(--fk-color); }
    .field-type { font-size:10px; color:var(--text-dim); font-family:'JetBrains Mono',monospace; }

    /* Themes — 그룹마다 통일 */
    .theme-blue   .table-header { background:#e8f1fc; border-bottom-color:#bfd4f5; }
    .theme-blue   .table-name   { color:#0550ae; }
    .theme-blue   .table-tag    { background:#dbeafe; color:#0969da; border:1px solid #93c5fd; }
    .theme-green  .table-header { background:#e6f4ea; border-bottom-color:#a8d5b0; }
    .theme-green  .table-name   { color:#166534; }
    .theme-green  .table-tag    { background:#dcfce7; color:#15803d; border:1px solid #86efac; }
    .theme-orange .table-header { background:#fef3e2; border-bottom-color:#fcd49a; }
    .theme-orange .table-name   { color:#92400e; }
    .theme-orange .table-tag    { background:#fef3c7; color:#b45309; border:1px solid #fcd34d; }
    .theme-gray   .table-header { background:#f0f2f5; border-bottom-color:#d0d7de; }
    .theme-gray   .table-name   { color:#424a53; }
    .theme-gray   .table-tag    { background:#eaeef2; color:#57606a; border:1px solid #d0d7de; }

    .rel-label { font-family:'JetBrains Mono',monospace; font-size:10px; text-anchor:middle; font-weight:700; }
  </style>
</head>
<body>

<header>
  <div class="logo">
    <div class="logo-icon">{약칭}</div>
    {프로젝트명} &nbsp;<span style="color:#0969da;">DB Schema ERD</span>
  </div>
  <div class="header-meta">
    <span style="color:#57606a;font-size:13px;">총 <strong id="tblCount">0</strong>개 테이블</span>
    <span class="badge badge-blue">Spring Boot JPA</span>
    <span class="badge badge-green">MySQL</span>
  </div>
</header>

<div class="legend">
  <div class="legend-title">컬럼 키</div>
  <div class="legend-item"><div class="legend-dot" style="background:#b08000;"></div> PK 기본키</div>
  <div class="legend-item"><div class="legend-dot" style="background:#0969da;"></div> FK 외래키</div>
  <div class="legend-item"><div class="legend-dot" style="background:#7c3aed;"></div> UQ 유니크</div>
  <div class="legend-sep"></div>
  <div class="legend-title">관계선</div>
  <div class="legend-item"><div class="legend-line" style="border-top:2px solid #1a7f37;"></div> N:1</div>
  <div class="legend-item"><div class="legend-line" style="border-top:2px dashed #7c3aed;"></div> M:N</div>
  <div class="legend-item"><div class="legend-line" style="border-top:2px solid #b35900;"></div> Self</div>
  <div class="legend-sep"></div>
  <div class="legend-title">비즈니스 그룹</div>
  <!-- 그룹별 dot 추가 -->
</div>

<div class="controls">
  <button class="ctrl-btn" id="zoomIn">＋</button>
  <button class="ctrl-btn" id="zoomOut">－</button>
  <button class="ctrl-btn" id="resetView">⊙</button>
</div>

<div id="canvas-wrap">
  <div id="erd-canvas">
    <svg id="svg-lines" width="5000" height="4000"></svg>
  </div>
</div>

<script>
/* ── 1. 데이터 정의 ─────────────────────────────── */
const groups = [
  /* { id, name, nameEn, color, bgColor, borderColor, barColor, members:[] } */
];

const tables = [
  /* {
       id, name, label, theme,  // theme: blue|green|orange|gray
       tag, x, y,
       fields: [
         { key:'PK'|'FK'|'UQ'|'', name, type, pk, fk, uq, nn }
       ]
     } */
];

const relations = [
  /* { from:'table_id', to:'table_id', type:'many-one'|'many-many'|'self', label:'N:1' } */
];

/* ── 2. 렌더링 ─────────────────────────────────── */
document.getElementById('tblCount').textContent = tables.length;
const canvas=document.getElementById('erd-canvas'), svg=document.getElementById('svg-lines'),
      wrap=document.getElementById('canvas-wrap'), tableEls={}, groupEls={};
const G_PAD={top:52,right:28,bottom:28,left:28};

groups.forEach(g => {
  const div=document.createElement('div');
  div.className='erd-group'; div.id=`grp-${g.id}`;
  div.style.background=g.bgColor; div.style.borderColor=g.borderColor;
  div.innerHTML=`<div class="group-header">
    <div class="group-bar" style="background:${g.barColor};"></div>
    <div>
      <span class="group-name"    style="color:${g.color};">${g.name}</span>
      <span class="group-name-en" style="color:${g.color};">${g.nameEn}</span>
    </div></div>`;
  canvas.appendChild(div); groupEls[g.id]=div;
});

tables.forEach(t => {
  const div=document.createElement('div');
  div.className=`erd-table theme-${t.theme}`; div.id=`tbl-${t.id}`;
  div.style.left=t.x+'px'; div.style.top=t.y+'px';
  div.innerHTML=`<div class="table-header"><div>
      <div class="table-name">${t.name}</div>
      <div class="table-sub">${t.label}</div>
    </div><span class="table-tag">${t.tag}</span></div>
    <div class="table-fields">${t.fields.map(f=>{
      const kc=f.pk?'pk':f.fk?'fk':f.uq?'uq':'', nc=f.pk?'pk-name':f.fk?'fk-name':'',
            kt=f.pk?'PK':f.fk?'FK':f.uq?'UQ':'';
      return `<div class="field-row">
        <span class="field-key ${kc}">${kt}</span>
        <span class="field-name ${nc}">${f.name}</span>
        <span class="field-type">${f.type}</span></div>`;
    }).join('')}</div>`;
  canvas.appendChild(div); tableEls[t.id]=div; makeDraggable(div);
});

/* ── 3. 그룹 경계 업데이트 ─────────────────────── */
function updateGroupBounds(){
  groups.forEach(g=>{
    const el=groupEls[g.id]; if(!el)return;
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    g.members.forEach(mid=>{
      const t=tableEls[mid]; if(!t)return;
      const x=parseInt(t.style.left),y=parseInt(t.style.top),
            w=t.offsetWidth||245,h=t.offsetHeight||200;
      minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x+w);maxY=Math.max(maxY,y+h);
    });
    if(minX===Infinity)return;
    el.style.left=(minX-G_PAD.left)+'px'; el.style.top=(minY-G_PAD.top)+'px';
    el.style.width=(maxX-minX+G_PAD.left+G_PAD.right)+'px';
    el.style.height=(maxY-minY+G_PAD.top+G_PAD.bottom)+'px';
  });
}

/* ── 4. 드래그 ─────────────────────────────────── */
function makeDraggable(el){
  let sx,sy,ox,oy,drag=false;
  el.addEventListener('mousedown',e=>{
    drag=true;sx=e.clientX;sy=e.clientY;ox=parseInt(el.style.left);oy=parseInt(el.style.top);
    el.style.zIndex=50;e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    el.style.left=(ox+(e.clientX-sx)/scale)+'px';el.style.top=(oy+(e.clientY-sy)/scale)+'px';
    updateGroupBounds();drawLines();
  });
  document.addEventListener('mouseup',()=>{if(drag){drag=false;el.style.zIndex=3;}});
}

/* ── 5. SVG 관계선 ─────────────────────────────── */
function getBox(el){const l=parseInt(el.style.left),t=parseInt(el.style.top),w=el.offsetWidth,h=el.offsetHeight;return{l,t,w,h,cx:l+w/2,cy:t+h/2};}
function bestPort(a,b){const dx=b.cx-a.cx,dy=b.cy-a.cy;let ax,ay,bx,by;
  if(Math.abs(dx)>Math.abs(dy)){ax=dx>0?a.l+a.w:a.l;ay=a.t+a.h/2;bx=dx>0?b.l:b.l+b.w;by=b.t+b.h/2;}
  else{ax=a.l+a.w/2;ay=dy>0?a.t+a.h:a.t;bx=b.l+b.w/2;by=dy>0?b.t:b.t+b.h;}return{ax,ay,bx,by};}
function curve(ax,ay,bx,by){const cx=ax+(bx-ax)*.5;return `M${ax},${ay} C${cx},${ay} ${cx},${by} ${bx},${by}`;}

function drawLines(){
  while(svg.firstChild)svg.removeChild(svg.firstChild);
  const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
  function mk(id,col,shape){
    const m=document.createElementNS('http://www.w3.org/2000/svg','marker');
    m.setAttribute('id',id);m.setAttribute('markerWidth','8');m.setAttribute('markerHeight','8');
    m.setAttribute('refX','6');m.setAttribute('refY','4');m.setAttribute('orient','auto');
    let s;if(shape==='arrow'){s=document.createElementNS('http://www.w3.org/2000/svg','polygon');s.setAttribute('points','0,0 8,4 0,8');s.setAttribute('fill',col);}
    else{s=document.createElementNS('http://www.w3.org/2000/svg','circle');s.setAttribute('cx','4');s.setAttribute('cy','4');s.setAttribute('r','3');s.setAttribute('fill',col);}
    m.appendChild(s);return m;
  }
  defs.appendChild(mk('ag','#1a7f37','arrow'));defs.appendChild(mk('dg','#1a7f37','dot'));
  defs.appendChild(mk('ap','#7c3aed','arrow'));
  defs.appendChild(mk('ao','#b35900','arrow'));defs.appendChild(mk('do','#b35900','dot'));
  svg.appendChild(defs);
  relations.forEach(rel=>{
    const fEl=tableEls[rel.from],tEl=tableEls[rel.to];if(!fEl||!tEl)return;
    let stroke,dash,me,ms;
    if(rel.type==='many-one'){stroke='#1a7f37';dash='none';me='url(#ag)';ms='url(#dg)';}
    else if(rel.type==='many-many'){stroke='#7c3aed';dash='6,3';me='url(#ap)';ms='';}
    else{stroke='#b35900';dash='none';me='url(#ao)';ms='url(#do)';}
    let pathD,mx,my;
    if(rel.type==='self'){const c=getBox(fEl);const x1=c.l+c.w,y1=c.t+c.h*.38,x2=c.l+c.w,y2=c.t+c.h*.62;
      pathD=`M${x1},${y1} C${x1+65},${y1} ${x1+65},${y2} ${x2},${y2}`;mx=x1+44;my=(y1+y2)/2;}
    else{const p=bestPort(getBox(fEl),getBox(tEl));pathD=curve(p.ax,p.ay,p.bx,p.by);mx=(p.ax+p.bx)/2;my=(p.ay+p.by)/2;}
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',pathD);path.setAttribute('stroke',stroke);path.setAttribute('stroke-width','2');
    path.setAttribute('fill','none');path.setAttribute('stroke-dasharray',dash);path.setAttribute('opacity','0.9');
    if(me)path.setAttribute('marker-end',me);if(ms)path.setAttribute('marker-start',ms);svg.appendChild(path);
    const bg=document.createElementNS('http://www.w3.org/2000/svg','rect');
    bg.setAttribute('x',mx-16);bg.setAttribute('y',my-18);bg.setAttribute('width','32');bg.setAttribute('height','14');
    bg.setAttribute('rx','4');bg.setAttribute('fill','rgba(255,255,255,0.92)');svg.appendChild(bg);
    const txt=document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.setAttribute('x',mx);txt.setAttribute('y',my-7);txt.setAttribute('class','rel-label');txt.setAttribute('fill',stroke);
    txt.textContent=rel.label;svg.appendChild(txt);
  });
}

/* ── 6. Pan & Zoom ─────────────────────────────── */
let scale=0.75,panX=50,panY=28,panning=false,psx,psy;
function applyTransform(){canvas.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;updateGroupBounds();drawLines();}
wrap.addEventListener('mousedown',e=>{if(e.target!==wrap&&e.target!==canvas&&e.target!==svg)return;panning=true;psx=e.clientX-panX;psy=e.clientY-panY;});
document.addEventListener('mousemove',e=>{if(!panning)return;panX=e.clientX-psx;panY=e.clientY-psy;applyTransform();});
document.addEventListener('mouseup',()=>{panning=false;});
wrap.addEventListener('wheel',e=>{e.preventDefault();const d=e.deltaY>0?-.08:.08,ns=Math.min(2,Math.max(.25,scale+d)),r=wrap.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;panX=mx-(mx-panX)*(ns/scale);panY=my-(my-panY)*(ns/scale);scale=ns;applyTransform();},{passive:false});
document.getElementById('zoomIn').addEventListener('click',()=>{scale=Math.min(2,scale+.1);applyTransform();});
document.getElementById('zoomOut').addEventListener('click',()=>{scale=Math.max(.25,scale-.1);applyTransform();});
document.getElementById('resetView').addEventListener('click',()=>{scale=.75;panX=50;panY=28;applyTransform();});

requestAnimationFrame(()=>requestAnimationFrame(()=>{updateGroupBounds();applyTransform();}));
</script>
</body>
</html>
```

---

_Last updated: 2026-05-21 | v2 비즈니스 그룹 패널 적용_
