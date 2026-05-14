# 전체 워크플로우

목표는 개발 관리가 아니라 의사결정 압축입니다.

## 1. 회의

- 리뷰 내용 기록
- 결정된 내용 표시
- 미결 사항 표시
- 담당자와 일정 후보 기록
- 리스크 후보 기록

## 2. AI 회의록 요약

- 회의 핵심 요약
- 결정 사항
- 미결 사항
- TODO
- 담당자
- 일정
- 리스크
- 의사결정 필요사항

## 3. TODO 및 GitHub Task 생성

- MVP 1차
- MVP 2차
- 운영 안정화
- 개선 사항
- 긴급 대응

우선순위 기준:

- P0: 긴급 / 서비스 영향
- P1: 핵심 기능
- P2: 일반 기능
- P3: 개선 사항

## 4. GitHub 작업 진행

- Issue 생성
- Branch 작업
- Commit / Push
- Pull Request 생성
- Review / QA 상태 갱신

추천 Status:

- Backlog
- Ready
- In Progress
- Review
- Need Decision
- QA
- Done

추천 Labels:

- P0
- P1
- P2
- P3
- risk
- blocked
- decision-needed
- qa
- review
- mvp1
- mvp2

## 5. Push 확인

- 최근 Push 내용 확인
- 완료 기능 추정
- 진행 중 기능 추정
- 미완료 가능성 확인
- 병목 상태 확인

## 6. AI 진척률 분석

진척률은 단순 Commit 수가 아니라 아래 기준을 종합합니다.

- 완료된 TODO 수
- PR Merge 상태
- 최근 Commit 활동
- 남은 중요 Task
- Review 상태
- QA 상태

## 7. Executive Dashboard 갱신

항상 아래 구조로 압축합니다.

1. 전체 진행률
2. 현재 핵심 목표
3. 주요 완료 사항
4. 현재 진행 사항
5. 리스크 및 이슈
6. 의사결정 필요
7. 다음 진행 예정
8. 회의 핵심 내용

대표/리더가 3~5분 안에 판단 가능한 분량으로 유지합니다.
