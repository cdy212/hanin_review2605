/**
 * parser.js — ERD Builder Pro
 * 통합 쿼리 결과 파싱 → tables[], relations[]
 *
 * 지원 입력 포맷:
 * 1. JSON 배열 (DBeaver "Copy as JSON")
 * 2. 탭 구분 TSV (DBeaver "Copy as Tabs" / "Copy as TSV") ← 가장 흔한 케이스
 * 3. 쉼표 구분 CSV
 *
 * 통일 출력 필드 (대소문자 무관):
 * ROW_TYPE | TABLE_NAME | COLUMN_NAME | DATA_TYPE | IS_PK | IS_FK |
 * IS_NULLABLE | IS_UNIQUE | REF_TABLE | REF_COLUMN | COLUMN_COMMENT
 */

window.ERDParser = (function() {

  const THEMES = [
    { theme:'blue',   tag:'G1', color:'#0969da', bgColor:'rgba(9,105,218,0.045)',   borderColor:'rgba(9,105,218,0.25)',   barColor:'#0969da', name:'그룹 1', nameEn:'Group 1' },
    { theme:'green',  tag:'G2', color:'#1a7f37', bgColor:'rgba(26,127,55,0.045)',   borderColor:'rgba(26,127,55,0.25)',   barColor:'#1a7f37', name:'그룹 2', nameEn:'Group 2' },
    { theme:'orange', tag:'G3', color:'#b35900', bgColor:'rgba(179,89,0,0.045)',    borderColor:'rgba(179,89,0,0.25)',    barColor:'#b35900', name:'그룹 3', nameEn:'Group 3' },
    { theme:'pink',   tag:'G4', color:'#db2777', bgColor:'rgba(219,39,119,0.045)', borderColor:'rgba(219,39,119,0.25)', barColor:'#db2777', name:'그룹 4', nameEn:'Group 4' },
    { theme:'purple', tag:'G5', color:'#7c3aed', bgColor:'rgba(124,58,237,0.045)', borderColor:'rgba(124,58,237,0.25)', barColor:'#7c3aed', name:'그룹 5', nameEn:'Group 5' },
    { theme:'teal',   tag:'G6', color:'#0f766e', bgColor:'rgba(15,118,110,0.045)', borderColor:'rgba(15,118,110,0.25)', barColor:'#0f766e', name:'그룹 6', nameEn:'Group 6' },
    { theme:'gray',   tag:'G7', color:'#57606a', bgColor:'rgba(87,96,106,0.045)',  borderColor:'rgba(87,96,106,0.25)',  barColor:'#57606a', name:'그룹 7', nameEn:'Group 7' },
  ];

  /* ═══════════════════════════════════════════════════
     PUBLIC: detectAndParse — 포맷 자동 감지 후 파싱
  ═══════════════════════════════════════════════════ */
  function detectAndParse(rawText) {
    if (!rawText || !rawText.trim()) throw new Error('입력값이 비어 있습니다.');

    // ① Windows \r\n / Mac \r 줄바꿈 → \n 통일 (핵심 전처리)
    const text = rawText.trim()
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');

    // ② JSON 배열/객체 감지
    if (text.charAt(0) === '[' || text.charAt(0) === '{') {
      return _parseJSON(text);
    }

    // ③ TSV vs CSV 판단
    //    Quoted TSV: 첫 줄이 "ROW_TYPE" 처럼 따옴표+탭 조합인 경우 → TAB
    //    일반 TSV:   탭 수 >= 쉼표 수 이고 탭이 존재 → TAB
    //    CSV:        나머지
    const firstLine = text.split('\n')[0];
    const tabCount   = (firstLine.match(/\t/g) || []).length;
    const commaCount = (firstLine.match(/,/g) || []).length;

    // Quoted TSV 감지: 탭이 있고 첫 토큰이 따옴표로 감싸진 경우
    const looksQuotedTSV = tabCount > 0 && /^\s*"/.test(firstLine);
    // 탭 구분자 우선: looksQuotedTSV 또는 탭이 더 많으면 탭 사용
    const delimiter = (looksQuotedTSV || (tabCount >= commaCount && tabCount > 0)) ? '\t' : ',';
    return _parseFlatText(text, delimiter);
  }

  /* ═══════════════════════════════════════════════════
     JSON 파싱
  ═══════════════════════════════════════════════════ */
  function _parseJSON(text) {
    let rows;
    try { rows = JSON.parse(text); } catch(e) {
      throw new Error('JSON 파싱 오류: ' + e.message + '\n(배열 형태인지 확인하세요)');
    }
    if (!Array.isArray(rows)) rows = [rows];
    if (rows.length === 0) throw new Error('JSON 배열이 비어 있습니다.');

    // ROW_TYPE 키 존재 여부로 통합/레거시 구분
    const sampleKeys = Object.keys(rows[0]).map(k => k.toUpperCase());
    if (sampleKeys.includes('ROW_TYPE')) return _parseUnified(rows);
    return _parseColumnsOnly(rows);
  }

  /* ═══════════════════════════════════════════════════
     TSV / CSV 파싱 → 통합 포맷 처리
  ═══════════════════════════════════════════════════ */
  function _parseFlatText(text, delimiter) {
    // 줄바꿈 분리 + 빈 줄 제거 + 각 줄 끝 공백 제거
    const lines = text.split('\n')
      .map(l => l.trimEnd())
      .filter(l => l.trim().length > 0);

    if (lines.length < 2) throw new Error('데이터가 부족합니다 (헤더 + 최소 1행 필요)');

    // 헤더 파싱
    const rawHeaderCells = _splitLine(lines[0], delimiter);
    const headers = rawHeaderCells.map(h => _cleanCell(h).toUpperCase());

    if (headers.length < 3) {
      throw new Error(
        `헤더 인식 실패 (감지된 컬럼 수: ${headers.length}개).\n` +
        `구분자: ${delimiter === '\t' ? 'TAB' : 'COMMA'}\n` +
        `첫 줄: ${lines[0].substring(0, 80)}`
      );
    }

    // 데이터 행 파싱 (헤더 수에 맞게 셀 정렬)
    const rows = lines.slice(1).map((line) => {
      const cells = _splitLine(line, delimiter);
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = _cleanCell(cells[i] !== undefined ? cells[i] : '');
      });
      return obj;
    });

    // ROW_TYPE 컬럼 유무에 따라 파서 분기
    if (headers.includes('ROW_TYPE')) {
      return _parseUnified(rows);
    }

    // ROW_TYPE 없는 경우: TABLE_NAME + COLUMN_NAME 기반 컬럼 전용 파싱
    if (headers.includes('TABLE_NAME') && headers.includes('COLUMN_NAME')) {
      return _parseColumnsOnly(rows);
    }

    throw new Error(
      `필수 컬럼을 찾을 수 없습니다.\n` +
      `감지된 컬럼: ${headers.join(', ')}\n` +
      `ROW_TYPE 컬럼이 포함된 통합 쿼리 결과 또는\n` +
      `TABLE_NAME + COLUMN_NAME 컬럼이 있는 결과를 붙여넣기 해주세요.`
    );
  }

  /* ═══════════════════════════════════════════════════
     통합 포맷 파싱 (ROW_TYPE = COLUMN | FK)
  ═══════════════════════════════════════════════════ */
  function _parseUnified(rows) {
    const tableMap = {};
    const fkRows   = [];

    rows.forEach((row, idx) => {
      const norm = _normalizeKeys(row);
      const type = (norm.ROW_TYPE || '').toUpperCase().trim();

      if (type === 'COLUMN') {
        const tbl = norm.TABLE_NAME;
        if (!tbl) return; // skip empty table name
        if (!tableMap[tbl]) {
          tableMap[tbl] = _initTable(tbl);
        }
        const field = _makeField(norm);
        if (field.name) tableMap[tbl].fields.push(field);

      } else if (type === 'FK') {
        // FK rows: REF_TABLE 값이 있어야 유효
        const refTable = norm.REF_TABLE || norm.REFERENCED_TABLE_NAME || '';
        if (norm.TABLE_NAME && norm.COLUMN_NAME && refTable) {
          fkRows.push(norm);
        }
      }
      // COLUMN_TYPE 등 미지원 ROW_TYPE은 무시
    });

    const tables = Object.values(tableMap);
    if (tables.length === 0) {
      throw new Error(
        `COLUMN 타입 행을 찾을 수 없습니다. (전체 ${rows.length}행)\n` +
        `ROW_TYPE 값 예시: ${[...new Set(rows.slice(0,10).map(r => (r.ROW_TYPE || r.row_type || 'N/A')))].join(', ')}`
      );
    }

    const relations = _buildRelations(fkRows, tables);
    return { tables, relations };
  }

  /* ─── 레거시: 컬럼만 있는 JSON (ROW_TYPE 없음) ─── */
  function _parseColumnsOnly(rows) {
    const tableMap = {};
    rows.forEach(row => {
      const norm = _normalizeKeys(row);
      const tbl = norm.TABLE_NAME;
      if (!tbl) return;
      if (!tableMap[tbl]) tableMap[tbl] = _initTable(tbl);
      const field = _makeField(norm);
      if (field.name) tableMap[tbl].fields.push(field);
    });
    return { tables: Object.values(tableMap), relations: [] };
  }

  /* ═══════════════════════════════════════════════════
     헬퍼 함수들
  ═══════════════════════════════════════════════════ */

  /**
   * 한 줄을 구분자로 나누기.
   * TSV: 단순 tab 분리.
   * CSV: 쌍따옴표 안의 쉼표는 무시하는 본격 파서.
   */
  /**
   * 한 줄을 구분자로 나누기.
   * TSV / CSV 모두 quote-aware 파싱 적용:
   *   - 쌍따옴표 내부의 구분자(탭/쉼표)는 필드 구분으로 처리하지 않음
   *   - "" (이중 따옴표) → 이스케이프된 따옴표 문자
   *   - DBeaver "Copy as Tabs" 출력처럼 셀이 "..."로 감싸인 경우도 정확히 처리
   */
  function _splitLine(line, delimiter) {
    const result = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; } // escaped ""
        else inQ = !inQ;
      } else if (c === delimiter && !inQ) {
        result.push(cur); cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result;
  }

  /**
   * 셀 값 정리:
   * 1. 앞뒤 공백 제거
   * 2. 쌍따옴표 제거 ("value" → value)
   * 3. NULL / (null) 리터럴 → 빈 문자열
   */
  function _cleanCell(raw) {
    let v = (raw || '').trim();
    // 쌍따옴표로 감싸인 경우 벗겨내기
    if (v.length >= 2 && v.charAt(0) === '"' && v.charAt(v.length - 1) === '"') {
      v = v.slice(1, -1);
    }
    // NULL 리터럴 처리 (MSSQL 등)
    if (v.toUpperCase() === 'NULL' || v === '(null)' || v === '\\N') v = '';
    return v;
  }

  /** 모든 키를 대문자로 정규화 */
  function _normalizeKeys(obj) {
    const out = {};
    Object.keys(obj).forEach(k => { out[k.toUpperCase()] = obj[k]; });
    return out;
  }

  function _initTable(name) {
    return {
      id: name, name: name, label: name,
      theme: 'gray', tag: 'TABLE',
      x: 0, y: 0, fields: []
    };
  }

  function _makeField(norm) {
    const isPK = _yesCheck(norm.IS_PK) || norm.COLUMN_KEY === 'PRI';
    const isFK = _yesCheck(norm.IS_FK) || norm.COLUMN_KEY === 'MUL';
    const isUQ = _yesCheck(norm.IS_UNIQUE) || norm.COLUMN_KEY === 'UNI';
    // IS_NULLABLE: YES → nullable, NO / 빈값 → not null
    const isNullable = norm.IS_NULLABLE === 'YES' || norm.IS_NULLABLE === 'Y';
    const type = (norm.DATA_TYPE || norm.COLUMN_TYPE || '').toUpperCase() || '';

    return {
      key:  isPK ? 'PK' : isUQ ? 'UQ' : isFK ? 'FK' : '',
      name: norm.COLUMN_NAME || '',
      type: type,
      pk: isPK, fk: isFK, uq: isUQ,
      nn: !isNullable,
      comment: norm.COLUMN_COMMENT || ''
    };
  }

  function _yesCheck(val) {
    if (!val) return false;
    const s = String(val).toUpperCase().trim();
    return s === 'YES' || s === 'Y' || s === '1' || s === 'TRUE';
  }

  function _buildRelations(fkRows, tables) {
    const relations = [];
    const seen = new Set();

    fkRows.forEach(row => {
      const from = (row.TABLE_NAME || '').trim();
      const col  = (row.COLUMN_NAME || '').trim();
      const to   = (row.REF_TABLE || row.REFERENCED_TABLE_NAME || '').trim();

      if (!from || !to) return;

      // FK 컬럼에 FK 마킹
      const tbl = tables.find(t => t.name === from);
      if (tbl && col) {
        const field = tbl.fields.find(f => f.name === col);
        if (field && !field.pk) { field.key = 'FK'; field.fk = true; }
      }

      const type  = from === to ? 'self' : 'many-one';
      const label = type === 'self' ? 'self' : 'N:1';
      const key   = `${from}→${to}`;
      if (!seen.has(key)) {
        seen.add(key);
        relations.push({ from, to, type, label });
      }
    });

    return relations;
  }

  /* ═══════════════════════════════════════════════════
     자동 그룹화 (Union-Find 클러스터링)
  ═══════════════════════════════════════════════════ */
  function autoGroup(tables, relations) {
    const parent = {};
    tables.forEach(t => { parent[t.id] = t.id; });

    function find(x) {
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    }
    function union(a, b) {
      const ra = find(a), rb = find(b);
      if (ra !== rb) parent[ra] = rb;
    }

    relations.forEach(r => {
      if (r.type !== 'self' && tables.find(t => t.id === r.from) && tables.find(t => t.id === r.to)) {
        union(r.from, r.to);
      }
    });

    const clusters = {};
    tables.forEach(t => {
      const root = find(t.id);
      if (!clusters[root]) clusters[root] = [];
      clusters[root].push(t.id);
    });

    return Object.values(clusters).map((members, i) => {
      const th = THEMES[i % THEMES.length];
      members.forEach(mid => {
        const t = tables.find(x => x.id === mid);
        if (t) { t.theme = th.theme; t.tag = th.tag; }
      });
      return {
        id: `group_${i}`,
        name: th.name, nameEn: th.nameEn,
        color: th.color, bgColor: th.bgColor,
        borderColor: th.borderColor, barColor: th.barColor,
        members
      };
    });
  }

  return { detectAndParse, autoGroup };
})();
