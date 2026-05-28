# AutoERD 배포 메모

AutoERD는 SQL DDL을 브라우저에서 파싱해 ERD를 생성하는 정적 HTML MVP입니다.

## 배포 대상

- 메인 파일: `erd_generator_v1.html`
- 권장 배포 파일명: `index.html`
- 정책 문서: `privacy.html`, `terms.html`
- 호스팅: Cloudflare Pages

## Cloudflare Pages 배포 순서

1. 배포 폴더에 `index.html`이 있는지 확인합니다.
2. Cloudflare Pages에서 정적 사이트 프로젝트를 생성합니다.
3. 빌드 명령은 비워둡니다.
4. 출력 폴더는 루트(`/`)로 지정합니다.
5. 배포 후 생성된 `*.pages.dev` 주소로 접속해 샘플 SQL 4종을 테스트합니다.

## AdSense 적용 전 체크

- 광고 코드는 placeholder 영역의 주석을 실제 AdSense 코드로 교체합니다.
- 광고 클릭을 강제하거나 결과 열람 조건으로 광고 클릭을 요구하지 않습니다.
- 개인정보처리방침과 이용약관 페이지를 함께 배포합니다.
- 실제 데이터가 아니라 `CREATE TABLE` 구조만 붙여넣도록 안내합니다.

## 기능 검증 체크

- MySQL 샘플 SQL 파싱
- PostgreSQL 샘플 SQL 파싱
- MariaDB 샘플 SQL 파싱
- 복합 PK/FK 파싱
- 긴 테이블명/컬럼명 표시
- PNG 저장
- SVG 저장
- 모바일 레이아웃
