# 범용 게시판 ERD (DDL 및 테이블 역할)

이 문서는 범용 게시판(Content Article)에 필요한 MySQL/MariaDB용 DDL 쿼리문과 각 테이블의 역할을 정의합니다. 특정 프레임워크나 언어에 종속되지 않는 범용성을 목적으로 작성되었습니다.

## 1. 테이블 역할 정의

- **`content_article_category`**: 시스템에서 사용하는 게시판들의 종류(공지사항, 질문답변, 자유게시판 등)를 관리합니다.
- **`content_article`**: 핵심 게시글 데이터를 저장합니다. 조회수, 좋아요 수 등 캐싱성 컬럼과 조회 최적화를 위한 썸네일(media_url) 등의 정보를 포함합니다.
- **`content_article_comment`**: 게시글에 종속된 사용자 의견(댓글)을 저장하며, 대댓글 구현을 위한 `parent_id`를 보유합니다.
- **`content_article_bookmark`**: 사용자의 개인적인 북마크/스크랩 이력을 저장합니다.
- **`content_article_action`**: 게시글 단위의 사용자 액션(추천, 비추천 등) 로그를 저장하며, 어뷰징 방지 목적으로도 사용됩니다.

## 2. DDL 쿼리문 (표준 MySQL/MariaDB 기준)

```sql
-- 1. 카테고리 테이블
CREATE TABLE `content_article_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '카테고리 고유 ID',
  `category_code` VARCHAR(50) NOT NULL COMMENT '카테고리 코드 (영문/숫자 고유값)',
  `category_name` VARCHAR(100) NOT NULL COMMENT '카테고리 노출명',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '사용 여부 (1: 활성, 0: 비활성)',
  `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
  `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '최종 수정 일시',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_category_code` (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시판 카테고리';

-- 2. 게시글 본체 테이블
CREATE TABLE `content_article` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '게시글 고유 ID',
  `category_id` BIGINT NOT NULL COMMENT '카테고리 참조 ID',
  `user_id` BIGINT NOT NULL COMMENT '작성자 사용자 ID (범용)',
  `title` VARCHAR(255) NOT NULL COMMENT '게시글 제목',
  `content` TEXT NOT NULL COMMENT '게시글 내용 (에디터 HTML 지원)',
  `view_count` BIGINT DEFAULT 0 COMMENT '조회수',
  `like_count` BIGINT DEFAULT 0 COMMENT '좋아요(추천) 수',
  `is_important` TINYINT(1) DEFAULT 0 COMMENT '중요(공지) 게시글 여부',
  `media_url` VARCHAR(1000) DEFAULT NULL COMMENT '대표 썸네일 이미지/동영상 URL',
  `link_url` VARCHAR(1000) DEFAULT NULL COMMENT '외부 링크 URL (배너형 게시글용)',
  `button_text` VARCHAR(100) DEFAULT NULL COMMENT '외부 링크 이동 버튼 텍스트',
  `display_order` INT DEFAULT 0 COMMENT '우선 정렬 순서',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '게시 노출 여부',
  `is_deleted` TINYINT(1) DEFAULT 0 COMMENT '소프트 삭제 여부',
  `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
  `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`id`),
  KEY `fk_article_category` (`category_id`),
  KEY `fk_article_user` (`user_id`),
  KEY `idx_article_created` (`date_created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시글 본체';

-- 3. 댓글 테이블
CREATE TABLE `content_article_comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '댓글 고유 ID',
  `article_id` BIGINT NOT NULL COMMENT '게시글 참조 ID',
  `user_id` BIGINT NOT NULL COMMENT '작성자 참조 ID',
  `parent_id` BIGINT DEFAULT NULL COMMENT '부모 댓글 ID (대댓글용)',
  `content` TEXT NOT NULL COMMENT '댓글 내용',
  `like_count` BIGINT DEFAULT 0 COMMENT '댓글 좋아요 수',
  `is_deleted` TINYINT(1) DEFAULT 0 COMMENT '소프트 삭제 여부',
  `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
  `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`id`),
  KEY `fk_comment_article` (`article_id`),
  KEY `fk_comment_user` (`user_id`),
  KEY `fk_comment_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시글 댓글';

-- 4. 북마크 테이블
CREATE TABLE `content_article_bookmark` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '북마크 고유 ID',
  `article_id` BIGINT NOT NULL COMMENT '게시글 참조 ID',
  `user_id` BIGINT NOT NULL COMMENT '북마크 사용자 ID',
  `is_deleted` TINYINT(1) DEFAULT 0 COMMENT '북마크 해제 여부(Soft Delete)',
  `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
  `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_bookmark_user_article` (`user_id`, `article_id`),
  KEY `fk_bookmark_article` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시글 북마크';

-- 5. 액션(좋아요/싫어요) 테이블
CREATE TABLE `content_article_action` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '액션 고유 ID',
  `article_id` BIGINT NOT NULL COMMENT '게시글 참조 ID',
  `user_id` BIGINT NOT NULL COMMENT '액션 사용자 ID',
  `action_type` VARCHAR(50) NOT NULL COMMENT '액션 종류 (LIKE, DISLIKE 등)',
  `action_flag` TINYINT(1) DEFAULT 1 COMMENT '액션 활성화 상태 (1: 유효, 0: 취소)',
  `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일시',
  `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_action_user_article_type` (`user_id`, `article_id`, `action_type`),
  KEY `fk_action_article` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시글 액션 (좋아요/싫어요)';
```
