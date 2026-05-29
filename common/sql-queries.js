/**
 * sql-queries.js — ERD Builder Pro
 * 모든 DB에서 컬럼 정보 + FK 관계를 단일 쿼리로 조회
 * 결과 포맷이 DB에 관계없이 동일하게 출력됩니다.
 *
 * 통일 출력 포맷:
 * ROW_TYPE | TABLE_NAME | COLUMN_NAME | DATA_TYPE | IS_PK | IS_FK | IS_NULLABLE | IS_UNIQUE | REF_TABLE | REF_COLUMN | COLUMN_COMMENT
 * ─────────────────────────────────────────────────────────────────────
 * COLUMN   | user       | id          | bigint    | YES   | NO    | NO          | NO        | NULL      | NULL       | 사용자 ID
 * FK       | user_posts | user_id     | (null)    | NO    | YES   | (null)      | NO        | user      | id         | (null)
 */

window.SQL_QUERIES = {

  /* ─────────────────────────────────────────────────────
     MySQL / MariaDB
  ───────────────────────────────────────────────────── */
  mysql: {
    label: 'MySQL / MariaDB',
    icon: '🐬',
    description: "'YOUR_DB_NAME'을 실제 데이터베이스명으로 교체",
    unified: `-- ✅ [MySQL] 컬럼 + FK 관계 통합 조회 쿼리
-- 'YOUR_DB_NAME' → 실제 DB명으로 교체 후 실행하세요.

SELECT
  'COLUMN'                          AS ROW_TYPE,
  c.TABLE_NAME,
  c.COLUMN_NAME,
  c.DATA_TYPE,
  IF(c.COLUMN_KEY = 'PRI','YES','NO') AS IS_PK,
  'NO'                              AS IS_FK,
  c.IS_NULLABLE,
  IF(c.COLUMN_KEY = 'UNI','YES','NO') AS IS_UNIQUE,
  NULL                              AS REF_TABLE,
  NULL                              AS REF_COLUMN,
  c.COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS c
WHERE c.TABLE_SCHEMA = 'YOUR_DB_NAME'

UNION ALL

SELECT
  'FK'                              AS ROW_TYPE,
  k.TABLE_NAME,
  k.COLUMN_NAME,
  NULL                              AS DATA_TYPE,
  'NO'                              AS IS_PK,
  'YES'                             AS IS_FK,
  NULL                              AS IS_NULLABLE,
  'NO'                              AS IS_UNIQUE,
  k.REFERENCED_TABLE_NAME           AS REF_TABLE,
  k.REFERENCED_COLUMN_NAME          AS REF_COLUMN,
  NULL                              AS COLUMN_COMMENT
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE k
WHERE k.TABLE_SCHEMA = 'YOUR_DB_NAME'
  AND k.REFERENCED_TABLE_NAME IS NOT NULL

ORDER BY TABLE_NAME, ROW_TYPE DESC, COLUMN_NAME;`
  },

  /* ─────────────────────────────────────────────────────
     Microsoft SQL Server (MSSQL)
  ───────────────────────────────────────────────────── */
  mssql: {
    label: 'Microsoft SQL Server',
    icon: '🪟',
    description: "별도 스키마 변경 불필요, 현재 DB 기준 전체 조회",
    unified: `-- ✅ [MSSQL] 컬럼 + FK 관계 통합 조회 쿼리
-- 현재 선택된 DB 기준으로 전체 테이블을 조회합니다.

SELECT
  'COLUMN'    AS ROW_TYPE,
  t.name      AS TABLE_NAME,
  c.name      AS COLUMN_NAME,
  tp.name     AS DATA_TYPE,
  CASE WHEN pk.column_id IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_PK,
  'NO'        AS IS_FK,
  CASE WHEN c.is_nullable = 1 THEN 'YES' ELSE 'NO' END        AS IS_NULLABLE,
  CASE WHEN uq.column_id IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_UNIQUE,
  NULL        AS REF_TABLE,
  NULL        AS REF_COLUMN,
  CAST(ep.value AS NVARCHAR(500))                             AS COLUMN_COMMENT
FROM sys.tables t
JOIN sys.columns c  ON t.object_id = c.object_id
JOIN sys.types tp   ON c.user_type_id = tp.user_type_id
LEFT JOIN (
  SELECT ic.object_id, ic.column_id
  FROM sys.index_columns ic
  JOIN sys.indexes i ON ic.object_id=i.object_id AND ic.index_id=i.index_id
  WHERE i.is_primary_key = 1
) pk ON c.object_id = pk.object_id AND c.column_id = pk.column_id
LEFT JOIN (
  SELECT ic.object_id, ic.column_id
  FROM sys.index_columns ic
  JOIN sys.indexes i ON ic.object_id=i.object_id AND ic.index_id=i.index_id
  WHERE i.is_unique = 1 AND i.is_primary_key = 0
) uq ON c.object_id = uq.object_id AND c.column_id = uq.column_id
LEFT JOIN sys.extended_properties ep
  ON ep.major_id=c.object_id AND ep.minor_id=c.column_id AND ep.name='MS_Description'

UNION ALL

SELECT
  'FK'        AS ROW_TYPE,
  tp2.name    AS TABLE_NAME,
  cp.name     AS COLUMN_NAME,
  NULL        AS DATA_TYPE,
  'NO'        AS IS_PK,
  'YES'       AS IS_FK,
  NULL        AS IS_NULLABLE,
  'NO'        AS IS_UNIQUE,
  tr.name     AS REF_TABLE,
  cr.name     AS REF_COLUMN,
  NULL        AS COLUMN_COMMENT
FROM sys.foreign_key_columns fkc
JOIN sys.tables tp2 ON fkc.parent_object_id     = tp2.object_id
JOIN sys.columns cp ON fkc.parent_object_id     = cp.object_id AND fkc.parent_column_id     = cp.column_id
JOIN sys.tables tr  ON fkc.referenced_object_id = tr.object_id
JOIN sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id

ORDER BY TABLE_NAME, ROW_TYPE DESC, COLUMN_NAME;`
  },

  /* ─────────────────────────────────────────────────────
     Oracle
  ───────────────────────────────────────────────────── */
  oracle: {
    label: 'Oracle',
    icon: '🔴',
    description: "'YOUR_SCHEMA'를 실제 스키마명(대문자)으로 교체",
    unified: `-- ✅ [Oracle] 컬럼 + FK 관계 통합 조회 쿼리
-- 'YOUR_SCHEMA' → 실제 스키마명(대문자)으로 교체 후 실행하세요.

SELECT
  'COLUMN'    AS ROW_TYPE,
  c.TABLE_NAME,
  c.COLUMN_NAME,
  c.DATA_TYPE,
  CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_PK,
  'NO'        AS IS_FK,
  CASE WHEN c.NULLABLE = 'N' THEN 'NO' ELSE 'YES' END          AS IS_NULLABLE,
  CASE WHEN uq.COLUMN_NAME IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_UNIQUE,
  NULL        AS REF_TABLE,
  NULL        AS REF_COLUMN,
  cc.COMMENTS AS COLUMN_COMMENT
FROM ALL_TAB_COLUMNS c
LEFT JOIN (
  SELECT cc2.TABLE_NAME, cc2.COLUMN_NAME
  FROM ALL_CONS_COLUMNS cc2
  JOIN ALL_CONSTRAINTS con ON cc2.CONSTRAINT_NAME = con.CONSTRAINT_NAME AND cc2.OWNER = con.OWNER
  WHERE con.CONSTRAINT_TYPE = 'P' AND con.OWNER = 'YOUR_SCHEMA'
) pk ON c.TABLE_NAME = pk.TABLE_NAME AND c.COLUMN_NAME = pk.COLUMN_NAME
LEFT JOIN (
  SELECT cc3.TABLE_NAME, cc3.COLUMN_NAME
  FROM ALL_CONS_COLUMNS cc3
  JOIN ALL_CONSTRAINTS con2 ON cc3.CONSTRAINT_NAME = con2.CONSTRAINT_NAME AND cc3.OWNER = con2.OWNER
  WHERE con2.CONSTRAINT_TYPE = 'U' AND con2.OWNER = 'YOUR_SCHEMA'
) uq ON c.TABLE_NAME = uq.TABLE_NAME AND c.COLUMN_NAME = uq.COLUMN_NAME
LEFT JOIN ALL_COL_COMMENTS cc ON c.TABLE_NAME = cc.TABLE_NAME AND c.COLUMN_NAME = cc.COLUMN_NAME AND cc.OWNER = 'YOUR_SCHEMA'
WHERE c.OWNER = 'YOUR_SCHEMA'

UNION ALL

SELECT
  'FK'        AS ROW_TYPE,
  a.TABLE_NAME,
  a.COLUMN_NAME,
  NULL        AS DATA_TYPE,
  'NO'        AS IS_PK,
  'YES'       AS IS_FK,
  NULL        AS IS_NULLABLE,
  'NO'        AS IS_UNIQUE,
  c_pk.TABLE_NAME AS REF_TABLE,
  b.COLUMN_NAME   AS REF_COLUMN,
  NULL        AS COLUMN_COMMENT
FROM ALL_CONS_COLUMNS a
JOIN ALL_CONSTRAINTS c  ON a.OWNER = c.OWNER AND a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
JOIN ALL_CONSTRAINTS c_pk ON c.R_OWNER = c_pk.OWNER AND c.R_CONSTRAINT_NAME = c_pk.CONSTRAINT_NAME
JOIN ALL_CONS_COLUMNS b ON c_pk.CONSTRAINT_NAME = b.CONSTRAINT_NAME AND a.POSITION = b.POSITION
WHERE c.CONSTRAINT_TYPE = 'R' AND a.OWNER = 'YOUR_SCHEMA'

ORDER BY TABLE_NAME, ROW_TYPE DESC, COLUMN_NAME;`
  },

  /* ─────────────────────────────────────────────────────
     PostgreSQL
  ───────────────────────────────────────────────────── */
  postgresql: {
    label: 'PostgreSQL',
    icon: '🐘',
    description: "'YOUR_SCHEMA'를 실제 스키마명으로 교체 (기본값: public)",
    unified: `-- ✅ [PostgreSQL] 컬럼 + FK 관계 통합 조회 쿼리
-- 'YOUR_SCHEMA' → 실제 스키마명으로 교체 (보통 'public')

SELECT
  'COLUMN'    AS ROW_TYPE,
  c.table_name  AS TABLE_NAME,
  c.column_name AS COLUMN_NAME,
  c.data_type   AS DATA_TYPE,
  CASE WHEN pk.column_name IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_PK,
  'NO'          AS IS_FK,
  c.is_nullable AS IS_NULLABLE,
  CASE WHEN uq.column_name IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_UNIQUE,
  NULL          AS REF_TABLE,
  NULL          AS REF_COLUMN,
  pgd.description AS COLUMN_COMMENT
FROM information_schema.columns c
LEFT JOIN (
  SELECT kcu.table_name, kcu.column_name
  FROM information_schema.key_column_usage kcu
  JOIN information_schema.table_constraints tc
    ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'PRIMARY KEY' AND kcu.table_schema = 'YOUR_SCHEMA'
) pk ON c.table_name = pk.table_name AND c.column_name = pk.column_name
LEFT JOIN (
  SELECT kcu2.table_name, kcu2.column_name
  FROM information_schema.key_column_usage kcu2
  JOIN information_schema.table_constraints tc2
    ON kcu2.constraint_name = tc2.constraint_name AND kcu2.table_schema = tc2.table_schema
  WHERE tc2.constraint_type = 'UNIQUE' AND kcu2.table_schema = 'YOUR_SCHEMA'
) uq ON c.table_name = uq.table_name AND c.column_name = uq.column_name
LEFT JOIN pg_catalog.pg_statio_all_tables st ON st.schemaname = c.table_schema AND st.relname = c.table_name
LEFT JOIN pg_catalog.pg_description pgd ON pgd.objoid = st.relid AND pgd.objsubid = c.ordinal_position
WHERE c.table_schema = 'YOUR_SCHEMA'

UNION ALL

SELECT
  'FK'        AS ROW_TYPE,
  tc.table_name   AS TABLE_NAME,
  kcu.column_name AS COLUMN_NAME,
  NULL            AS DATA_TYPE,
  'NO'            AS IS_PK,
  'YES'           AS IS_FK,
  NULL            AS IS_NULLABLE,
  'NO'            AS IS_UNIQUE,
  ccu.table_name  AS REF_TABLE,
  ccu.column_name AS REF_COLUMN,
  NULL            AS COLUMN_COMMENT
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu
  ON tc.constraint_name = ccu.constraint_name AND tc.table_schema = ccu.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'YOUR_SCHEMA'

ORDER BY TABLE_NAME, ROW_TYPE DESC, COLUMN_NAME;`
  },

  /* ─────────────────────────────────────────────────────
     SQLite
  ───────────────────────────────────────────────────── */
  sqlite: {
    label: 'SQLite',
    icon: '📦',
    description: "SQLite는 PRAGMA 명령으로 조회. 아래 Python 스크립트로 JSON 자동 변환",
    unified: `-- ✅ [SQLite] 통합 조회 스크립트 (Python으로 실행)
-- SQLite는 UNION이 PRAGMA와 호환되지 않아 Python 스크립트를 사용합니다.
-- DB 파일 경로를 수정 후 실행하면 통합 JSON이 자동 출력됩니다.

import sqlite3, json

DB_PATH = "your_database.db"  # ← DB 파일 경로 교체
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

rows = []

cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
tables = [r[0] for r in cur.fetchall()]

for tbl in tables:
    # Columns
    cur.execute(f"PRAGMA table_info('{tbl}')")
    for col in cur.fetchall():
        rows.append({
            "ROW_TYPE": "COLUMN", "TABLE_NAME": tbl,
            "COLUMN_NAME": col[1], "DATA_TYPE": col[2].upper(),
            "IS_PK": "YES" if col[5] else "NO",
            "IS_FK": "NO", "IS_NULLABLE": "NO" if col[3] else "YES",
            "IS_UNIQUE": "NO", "REF_TABLE": None, "REF_COLUMN": None, "COLUMN_COMMENT": None
        })
    # FKs
    cur.execute(f"PRAGMA foreign_key_list('{tbl}')")
    for fk in cur.fetchall():
        rows.append({
            "ROW_TYPE": "FK", "TABLE_NAME": tbl,
            "COLUMN_NAME": fk[3], "DATA_TYPE": None,
            "IS_PK": "NO", "IS_FK": "YES",
            "IS_NULLABLE": None, "IS_UNIQUE": "NO",
            "REF_TABLE": fk[2], "REF_COLUMN": fk[4], "COLUMN_COMMENT": None
        })

print(json.dumps(rows, ensure_ascii=False, indent=2))
conn.close()`
  }
};
