# 범용 게시판 비즈니스 로직 및 API 참조 가이드

이 문서는 `user_posts` 모델을 `content_article`로 범용화한 테이블 구조의 비즈니스 로직과 API 포팅을 위한 참조 내용을 제공합니다. 프론트엔드 및 백엔드 프레임워크에 구애받지 않고 유연하게 도입할 수 있도록 설계되었습니다.

## 1. 테이블 구성 및 관계 (ERD Logic)

- **`content_article_category` (게시판 카테고리)**
  - 게시판의 유형(예: 공지사항, 자유게시판, 갤러리 등)을 정의합니다.
  - 카테고리에 속한 게시글을 식별하는 기본 메타데이터 역할을 합니다.
- **`content_article` (게시글 본체)**
  - N:1 관계로 `content_article_category`에 속하며, N:1 관계로 작성자(`user`)에 속합니다.
  - 게시글의 제목, 내용, 조회수(`view_count`), 추천수(`like_count`), 중요여부(`is_important`) 등을 포함합니다.
- **`content_article_comment` (게시글 댓글)**
  - N:1 관계로 `content_article`에 속하며, N:1 관계로 작성자(`user`)에 속합니다.
  - 계층형 댓글 처리를 위해 자신을 참조하는 Self-Join(1:N) 관계(`parent_id`)를 가집니다.
- **`content_article_bookmark` (게시글 북마크)**
  - 사용자가 특정 게시글을 저장(북마크)하는 다대다(M:N) 중간 테이블 역할을 합니다.
  - `user`와 `content_article` 각각에 N:1 관계를 가집니다.
- **`content_article_action` (게시글 액션 - 좋아요/싫어요)**
  - 사용자가 게시글에 대해 좋아요, 싫어요 등의 액션을 남기는 테이블입니다.
  - 중복 투표를 방지하고 이력을 남기기 위해 사용되며, `user`와 `content_article` 각각에 N:1 관계를 가집니다.

## 2. 핵심 비즈니스 로직

1. **게시글 등록/조회/수정/삭제 (CRUD)**
   - **조회수 증가 로직**: 게시글 상세 조회 시 `view_count`를 1 증가시킵니다. (동시성 제어를 고려한 로직 필요)
   - **소프트 삭제 (Soft Delete)**: 데이터를 DB에서 완전히 지우지 않고 `is_deleted` 플래그를 true로 변경하여 복구 및 이력 관리가 가능하도록 합니다.
   - **중요 게시물 상단 노출**: `is_important` 플래그가 true인 게시물은 목록 조회 시 최상단에 우선 정렬합니다.

2. **계층형 댓글 구조 (Hierarchical Comments)**
   - 부모 댓글이 없는 경우 `parent_id`는 null로 설정되며, 대댓글의 경우 해당 부모 댓글의 ID를 `parent_id`에 저장합니다.
   - 대댓글 깊이(Depth) 제한이 필요한 경우 애플리케이션 레벨에서 로직을 추가하여 무한 뎁스를 방지합니다.

3. **토글형 액션 (좋아요/북마크)**
   - **Action Toggle**: 동일 사용자가 같은 게시물에 액션을 중복 요청할 경우, 플래그를 전환(Toggle)하거나 레코드를 Soft Delete 처리하는 방식으로 구현합니다. 
   - 액션이 발생할 때마다 `content_article` 테이블의 `like_count` 캐싱 필드를 원자적으로 증감(Atomic Update)시킵니다.

## 3. 백엔드 API 기능 참조 내용 (기존 구현 기반)

기존 Spring Boot 코드 (`UserPostsController`, `UserPostsCommentController` 등)에 구현되어 있던 기능들을 새로운 스펙으로 포팅할 때 참고할 수 있는 명세입니다.

### 3.1 Category API
| API 엔드포인트 | Method | 설명 | 요청 파라미터 | 기존 참조 코드 |
|---|---|---|---|---|
| `/api/article/categories` | GET | 카테고리 목록 조회 | `isCommunity` (Boolean) | `getCategories(isCommunity)` |

### 3.2 Article (게시글) API
| API 엔드포인트 | Method | 설명 | 요청 파라미터 | 기존 참조 코드 |
|---|---|---|---|---|
| `/api/article/list` | GET | 일반 게시글 페이징 목록 조회 | `categoryCode`, `page`, `rowPerPageCount`, `deleted` | `getUserPostsList(...)` |
| `/api/article/list-important`| GET | 중요 게시글 우선 페이징 목록 조회 | `categoryCode`, `page`, `rowPerPageCount`, `deleted` | `getUserPostsListImportant(...)` |
| `/api/article/detail` | GET | 게시글 상세 조회 (및 조회수 증가) | `contentNo` (게시글 ID) | `getUserPostsDetail(...)` |
| `/api/article/create` | POST | 게시글 작성 | `title`, `content`, `categoryCode`, JWT 토큰 | `createUserPosts(...)` |
| `/api/article/update` | PATCH | 게시글 수정 | `contentNo`, `title`, `content`, `categoryCode`, JWT 토큰 | `updateUserPosts(...)` |
| `/api/article/delete` | DELETE | 게시글 삭제 (Soft Delete) | `contentNo`, JWT 토큰 | `deleteUserPosts(...)` |

### 3.3 Comment (댓글) API
| API 엔드포인트 | Method | 설명 | 요청 파라미터 | 기존 참조 코드 |
|---|---|---|---|---|
| `/api/article/comment/create`| POST | 댓글 및 대댓글 작성 | `contentNo`, `content`, `parentNo`(대댓글 시), JWT 토큰 | `createComment(...)` |
| `/api/article/comment/update`| PATCH | 댓글 내용 수정 | `commentNo`, `content`, JWT 토큰 | `updateComment(...)` |
| `/api/article/comment/delete`| DELETE | 댓글 삭제 (Soft Delete) | `commentNo`, JWT 토큰 | `deleteComment(...)` |

### 3.4 Action & Bookmark API
| API 엔드포인트 | Method | 설명 | 요청 파라미터 | 기존 참조 코드 |
|---|---|---|---|---|
| `/api/article/action/toggle` | POST | 게시글 좋아요/싫어요 토글 | `contentNo`, `actionType`(LIKE/DISLIKE) | `UserPostsActionController` 참조 |
| `/api/article/bookmark/toggle`| POST | 게시글 북마크 설정/해제 | `contentNo` | 북마크 토글 로직 구현 필요 |
