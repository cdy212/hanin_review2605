# GitHub 중심 AI PMO 자동화 플랜

## 목적

회의록과 GitHub 작업 상태를 기반으로 아래 내용을 자동 정리한다.

- 최고경영자 진행 상황 보고
- 협업부서 요청 사항
- 프로젝트 TODO 리스트
- 진행률
- 이슈 및 의사결정 필요사안

기준 구조는 리뷰용 GitHub와 실제 작업 GitHub를 분리하는 방식이다.

- 리뷰용 GitHub: 회의록, dashboard, 승인 전 초안 관리
- FRONT GitHub: 프론트엔드 실제 작업 Issue/PR 관리
- BACK GitHub: 백엔드/API/관리자 실제 작업 Issue/PR 관리

## 전체 흐름

1. 회의록 분석
   - `cowork_plan/회의/*.md` 파일을 분석한다.
   - TODO, 의사결정 필요사항, 협업 요청, 확인 필요사항을 추출한다.

2. 리뷰용 GitHub에 초안 생성
   - `dashboard.html`이 읽을 `pmo/state.json`을 생성한다.
   - 승인 전 작업 계획은 `pmo/apply_plan.json`에 저장한다.
   - 실제 FRONT/BACK GitHub에는 아직 Issue를 만들지 않는다.

3. 사용자 승인 및 수정
   - 담당자는 dashboard와 `pmo/apply_plan.json`을 확인한다.
   - 제목, 우선순위, 담당 repo, 담당자, 내용을 수정한다.
   - 승인 후에만 실제 작업 GitHub로 발행한다.

4. FRONT/BACK 작업 GitHub에 Issue 발행
   - 승인된 항목을 FRONT/BACK repo에 Issue로 생성 또는 갱신한다.
   - 발행된 Issue URL은 `pmo/issue_map.json`에 저장한다.

5. 개발자 작업 및 Issue 완료 처리
   - 개발자는 FRONT/BACK repo의 Issue를 기준으로 branch와 PR을 만든다.
   - PR merge 또는 Issue close로 완료 상태를 남긴다.

6. dashboard 재생성 시 진행률 반영
   - `pmo/issue_map.json`에 저장된 Issue/PR 상태를 다시 읽는다.
   - dashboard의 TODO, GitHub 상태, Executive KPI에 진행률을 반영한다.

## 사용방법

1. 회의록 추가
   - 새 회의록을 `cowork_plan/회의/*.md`에 추가한다.
   - 필요 시 `cowork_plan/회의/meetings.json`에 파일명을 등록한다.

2. PMO 초안 생성
   - PMO 생성 스크립트를 실행해 `pmo/state.json`과 `pmo/apply_plan.json`을 갱신한다.
   - dashboard는 `pmo/state.json`을 읽어 화면을 표시한다.

3. 담당자 승인
   - 담당자가 dashboard와 `apply_plan.json`을 확인한다.
   - 승인 전에는 FRONT/BACK repo에 Issue를 생성하지 않는다.

4. 실제 Issue 발행
   - 승인 후 apply 모드로 실행한다.
   - FRONT/BACK repo에 Issue를 만들고 `pmo/issue_map.json`에 연결 정보를 저장한다.

## 개발자 가이드

- 실제 작업 기준은 FRONT/BACK repo의 Issue이다.
- 리뷰용 GitHub의 draft 항목은 작업 지시가 아니라 승인 전 초안이다.
- branch 규칙:
  - `feature/issue-번호-요약`
  - `hotfix/issue-번호-요약`
- PR 제목:
  - `[Issue #번호] 작업명`
- PR 본문:
  - `Closes #번호` 또는 `Refs #번호`를 포함한다.
- 상태 갱신:
  - 작업 시작: `In Progress`
  - 리뷰 요청: `Review`
  - QA 대기: `QA`
  - 결정 필요: `Need Decision`
  - 완료: PR merge 후 Issue close 또는 `Done`

## 진행률 기준

- Backlog: 0
- Ready: 20
- In Progress: 45
- Review: 65
- QA: 80
- Done: 100
- Blocked / Need Decision: 10

상위 TODO가 FRONT/BACK Issue 여러 개로 나뉘면 평균으로 계산한다. 단, P0 항목이 `Blocked` 또는 `Need Decision`이면 CEO 보고 화면에서 우선 강조한다.

## 기본 산출물

- `dashboard.html`: CEO 보고 화면
- `pmo/state.json`: dashboard 표시 데이터
- `pmo/apply_plan.json`: 승인 전 실제 Issue 발행 계획
- `pmo/issue_map.json`: 리뷰용 항목과 FRONT/BACK Issue 연결 정보
- `scripts/pmo_extract_meeting.js`: 회의록 분석 및 PMO 데이터 생성 스크립트

