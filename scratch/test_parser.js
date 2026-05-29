/**
 * test_parser.js — 파서 로직 Node.js 환경 단독 테스트
 * (window 의존 없이 parser.js 핵심 로직만 추출)
 */

// ─── parser.js 핵심 함수 인라인 재구현 (테스트용) ───
function _cleanCell(raw) {
  let v = (raw || '').trim();
  if (v.length >= 2 && v.charAt(0) === '"' && v.charAt(v.length - 1) === '"') {
    v = v.slice(1, -1);
  }
  if (v.toUpperCase() === 'NULL' || v === '(null)' || v === '\\N') v = '';
  return v;
}

function _splitLine(line, delimiter) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
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

function _normalizeKeys(obj) {
  const out = {};
  Object.keys(obj).forEach(k => { out[k.toUpperCase()] = obj[k]; });
  return out;
}

// ─── 샘플 데이터 (사용자가 제공한 예시) ───
const sampleTSV = `"ROW_TYPE"\t"TABLE_NAME"\t"COLUMN_NAME"\t"DATA_TYPE"\t"IS_PK"\t"IS_FK"\t"IS_NULLABLE"\t"IS_UNIQUE"\t"REF_TABLE"\t"REF_COLUMN"\t"COLUMN_COMMENT"
"COLUMN"\t"20260203_new_monthly_report"\t"balance"\t"decimal"\t"NO"\t"NO"\t"YES"\t"NO"\t\t\t""
"COLUMN"\t"20260203_new_monthly_report"\t"date_created"\t"datetime"\t"NO"\t"NO"\t"NO"\t"NO"\t\t\t""
"COLUMN"\t"20260203_new_monthly_report"\t"id"\t"bigint"\t"NO"\t"NO"\t"NO"\t"NO"\t\t\t""
"FK"\t"account_chars"\t"clas_id"\t\t"NO"\t"YES"\t\t"NO"\t"chars_class"\t"id"\t
"FK"\t"account_chars"\t"game_id"\t\t"NO"\t"YES"\t\t"NO"\t"game"\t"id"\t
"COLUMN"\t"account_chars"\t"char_name"\t"varchar"\t"NO"\t"NO"\t"NO"\t"NO"\t\t\t""
"COLUMN"\t"account_chars"\t"id"\t"bigint"\t"YES"\t"NO"\t"NO"\t"NO"\t\t\t""
"COLUMN"\t"account_chars"\t"clas_id"\t"bigint"\t"NO"\t"NO"\t"NO"\t"NO"\t\t\t""`;

// ─── 테스트 실행 ───
const text = sampleTSV.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const lines = text.split('\n').map(l => l.trimEnd()).filter(l => l.trim().length > 0);

console.log(`\n=== 줄 수: ${lines.length} ===\n`);

// 헤더 파싱
const delimiter = '\t';
const rawHeaderCells = _splitLine(lines[0], delimiter);
const headers = rawHeaderCells.map(h => _cleanCell(h).toUpperCase());
console.log('✅ 헤더 (총 ' + headers.length + '개):', headers.join(' | '));
console.log('   ROW_TYPE 포함?', headers.includes('ROW_TYPE'));

// 데이터 파싱
const rows = lines.slice(1).map((line) => {
  const cells = _splitLine(line, delimiter);
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = _cleanCell(cells[i] !== undefined ? cells[i] : '');
  });
  return obj;
});

console.log('\n=== 파싱된 행 ===');
rows.forEach((row, i) => {
  const norm = _normalizeKeys(row);
  const type = (norm.ROW_TYPE || '').toUpperCase().trim();
  if (type === 'COLUMN') {
    console.log(`[COLUMN] ${norm.TABLE_NAME}.${norm.COLUMN_NAME} (${norm.DATA_TYPE}) PK=${norm.IS_PK} FK=${norm.IS_FK} NULL=${norm.IS_NULLABLE}`);
  } else if (type === 'FK') {
    console.log(`[FK]     ${norm.TABLE_NAME}.${norm.COLUMN_NAME} → ${norm.REF_TABLE}.${norm.REF_COLUMN}`);
  } else {
    console.log(`[???]    ROW_TYPE="${norm.ROW_TYPE}" (row ${i})`);
  }
});

// 테이블 집계
const tableMap = {};
const fkRows = [];
rows.forEach(row => {
  const norm = _normalizeKeys(row);
  const type = (norm.ROW_TYPE || '').toUpperCase().trim();
  if (type === 'COLUMN') {
    const tbl = norm.TABLE_NAME;
    if (tbl) {
      if (!tableMap[tbl]) tableMap[tbl] = { name: tbl, fields: [] };
      tableMap[tbl].fields.push({ name: norm.COLUMN_NAME, type: norm.DATA_TYPE, pk: norm.IS_PK === 'YES', fk: norm.IS_FK === 'YES' });
    }
  } else if (type === 'FK') {
    if (norm.TABLE_NAME && norm.COLUMN_NAME && norm.REF_TABLE) fkRows.push(norm);
  }
});

console.log('\n=== 결과 요약 ===');
console.log(`테이블 수: ${Object.keys(tableMap).length}`);
Object.entries(tableMap).forEach(([tbl, t]) => {
  console.log(`  - ${tbl}: ${t.fields.length}개 컬럼`);
});
console.log(`FK 관계 수: ${fkRows.length}`);
fkRows.forEach(fk => console.log(`  - ${fk.TABLE_NAME}.${fk.COLUMN_NAME} → ${fk.REF_TABLE}.${fk.REF_COLUMN}`));
console.log('\n✅ 파싱 성공!\n');
