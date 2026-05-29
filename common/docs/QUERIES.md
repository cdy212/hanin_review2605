# DB별 스키마 조회 SQL 레퍼런스

> ERD Builder Pro에서 사용되는 DB별 스키마 조회 SQL을 정리합니다.
> `YOUR_DB_NAME` / `YOUR_SCHEMA` 를 실제 이름으로 교체하여 사용하세요.

---

## 🐬 MySQL / MariaDB

### 컬럼 정보 조회
```sql
SELECT
  TABLE_NAME,
  COLUMN_NAME,
  DATA_TYPE,
  COLUMN_TYPE,
  IS_NULLABLE,
  COLUMN_KEY,
  COLUMN_DEFAULT,
  EXTRA,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'YOUR_DB_NAME'
ORDER BY TABLE_NAME, ORDINAL_POSITION;
```

### FK 관계 조회
```sql
SELECT
  TABLE_NAME,
  COLUMN_NAME,
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'YOUR_DB_NAME'
  AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME, COLUMN_NAME;
```

**결과 내보내기 (DBeaver):**
- 결과탭 → 우클릭 → "Copy as JSON"

---

## 🪟 Microsoft SQL Server (MSSQL)

### 컬럼 정보 조회
```sql
SELECT
  t.name          AS TABLE_NAME,
  c.name          AS COLUMN_NAME,
  tp.name         AS DATA_TYPE,
  c.max_length    AS MAX_LENGTH,
  c.precision,
  c.scale,
  c.is_nullable   AS IS_NULLABLE,
  c.is_identity,
  CASE WHEN pk.column_id IS NOT NULL THEN 'PRI' ELSE '' END AS COLUMN_KEY,
  ep.value        AS COLUMN_COMMENT
FROM sys.tables t
JOIN sys.columns c ON t.object_id = c.object_id
JOIN sys.types tp ON c.user_type_id = tp.user_type_id
LEFT JOIN (
  SELECT ic.object_id, ic.column_id
  FROM sys.index_columns ic
  JOIN sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
  WHERE i.is_primary_key = 1
) pk ON c.object_id = pk.object_id AND c.column_id = pk.column_id
LEFT JOIN sys.extended_properties ep
  ON ep.major_id = c.object_id AND ep.minor_id = c.column_id AND ep.name = 'MS_Description'
ORDER BY t.name, c.column_id;
```

### FK 관계 조회
```sql
SELECT
  tp.name   AS TABLE_NAME,
  cp.name   AS COLUMN_NAME,
  tr.name   AS REFERENCED_TABLE_NAME,
  cr.name   AS REFERENCED_COLUMN_NAME
FROM sys.foreign_key_columns fkc
JOIN sys.tables tp  ON fkc.parent_object_id  = tp.object_id
JOIN sys.columns cp ON fkc.parent_object_id  = cp.object_id AND fkc.parent_column_id  = cp.column_id
JOIN sys.tables tr  ON fkc.referenced_object_id = tr.object_id
JOIN sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
ORDER BY TABLE_NAME, COLUMN_NAME;
```

---

## 🔴 Oracle

### 컬럼 정보 조회
```sql
SELECT
  c.TABLE_NAME,
  c.COLUMN_NAME,
  c.DATA_TYPE,
  c.DATA_LENGTH,
  c.DATA_PRECISION,
  c.NULLABLE AS IS_NULLABLE,
  CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 'PRI' ELSE '' END AS COLUMN_KEY,
  cc.COMMENTS AS COLUMN_COMMENT
FROM ALL_TAB_COLUMNS c
LEFT JOIN (
  SELECT cc2.TABLE_NAME, cc2.COLUMN_NAME
  FROM ALL_CONS_COLUMNS cc2
  JOIN ALL_CONSTRAINTS con ON cc2.CONSTRAINT_NAME = con.CONSTRAINT_NAME
  WHERE con.CONSTRAINT_TYPE = 'P' AND con.OWNER = 'YOUR_SCHEMA'
) pk ON c.TABLE_NAME = pk.TABLE_NAME AND c.COLUMN_NAME = pk.COLUMN_NAME
LEFT JOIN ALL_COL_COMMENTS cc
  ON c.TABLE_NAME = cc.TABLE_NAME AND c.COLUMN_NAME = cc.COLUMN_NAME AND cc.OWNER = 'YOUR_SCHEMA'
WHERE c.OWNER = 'YOUR_SCHEMA'
ORDER BY c.TABLE_NAME, c.COLUMN_ID;
```

### FK 관계 조회
```sql
SELECT
  a.TABLE_NAME,
  a.COLUMN_NAME,
  c_pk.TABLE_NAME AS REFERENCED_TABLE_NAME,
  b.COLUMN_NAME   AS REFERENCED_COLUMN_NAME
FROM ALL_CONS_COLUMNS a
JOIN ALL_CONSTRAINTS c  ON a.OWNER = c.OWNER AND a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
JOIN ALL_CONSTRAINTS c_pk ON c.R_OWNER = c_pk.OWNER AND c.R_CONSTRAINT_NAME = c_pk.CONSTRAINT_NAME
JOIN ALL_CONS_COLUMNS b ON c_pk.CONSTRAINT_NAME = b.CONSTRAINT_NAME AND a.POSITION = b.POSITION
WHERE c.CONSTRAINT_TYPE = 'R' AND a.OWNER = 'YOUR_SCHEMA'
ORDER BY a.TABLE_NAME, a.COLUMN_NAME;
```

---

## 🐘 PostgreSQL

### 컬럼 정보 조회
```sql
SELECT
  c.table_name                        AS TABLE_NAME,
  c.column_name                       AS COLUMN_NAME,
  c.data_type                         AS DATA_TYPE,
  c.character_maximum_length          AS MAX_LENGTH,
  c.is_nullable                       AS IS_NULLABLE,
  CASE WHEN pk.column_name IS NOT NULL THEN 'PRI' ELSE '' END AS COLUMN_KEY,
  pgd.description                     AS COLUMN_COMMENT
FROM information_schema.columns c
LEFT JOIN (
  SELECT kcu.table_name, kcu.column_name
  FROM information_schema.key_column_usage kcu
  JOIN information_schema.table_constraints tc
    ON kcu.constraint_name = tc.constraint_name
   AND kcu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'PRIMARY KEY'
    AND kcu.table_schema = 'YOUR_SCHEMA'
) pk ON c.table_name = pk.table_name AND c.column_name = pk.column_name
LEFT JOIN pg_catalog.pg_statio_all_tables st
  ON st.schemaname = c.table_schema AND st.relname = c.table_name
LEFT JOIN pg_catalog.pg_description pgd
  ON pgd.objoid = st.relid AND pgd.objsubid = c.ordinal_position
WHERE c.table_schema = 'YOUR_SCHEMA'
ORDER BY c.table_name, c.ordinal_position;
```

### FK 관계 조회
```sql
SELECT
  tc.table_name      AS TABLE_NAME,
  kcu.column_name    AS COLUMN_NAME,
  ccu.table_name     AS REFERENCED_TABLE_NAME,
  ccu.column_name    AS REFERENCED_COLUMN_NAME
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu
  ON tc.constraint_name = ccu.constraint_name AND tc.table_schema = ccu.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'YOUR_SCHEMA'
ORDER BY tc.table_name, kcu.column_name;
```

---

## 📦 SQLite

```sql
-- 테이블 목록
SELECT name AS TABLE_NAME FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';

-- 특정 테이블 컬럼 조회 (TABLE_NAME 교체 후 반복 실행)
PRAGMA table_info('TABLE_NAME');
-- 컬럼: cid, name, type, notnull, dflt_value, pk(1=PRI)

-- FK 관계 조회 (TABLE_NAME 교체)
PRAGMA foreign_key_list('TABLE_NAME');
-- 컬럼: id, seq, table, from, to
```
