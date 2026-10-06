# 한인회 최종 QA 문서

현재 소스 기반 문서 패키지다. 전체 실제 E2E는 아직 완료되지 않았다. 소스 분석·공개화면 실행·정적 양식 미리보기를 구분한다.

| 파일 | 용도 |
|---|---|
| 한인회_최종QA_문서.html | 오프라인 통합 열람본, 스크린샷 내장·인쇄 가능 |
| 운영자_매뉴얼.md | 접속 URL, 역할, 업무별 운영 절차, 사용자 반영 확인, 스크린샷 |
| QA_CASES.md | 기능별 한 사이클·실패 케이스·Expected·상태 |
| SOURCE_MAP.md / source_inventory.json | 실제 화면·API·서비스 위치 및 commit·파일 해시 |
| BROWSER_QA_REPORT.md | 이번 로컬 브라우저 실행 Actual과 캡처 |
| FINDINGS.md | 소스 정합성 후보와 미확인 항목 |
| AI_QA_WORKFLOW.md | AI 지침, 단계, 데이터/증빙, 중단·재개 방식 |
| E2E_RETEST_GUIDE.md | 별도 E2E를 다시 실행할 때의 독립 절차 |
| 00_progress.md | 현재 진척·블로커·정확한 다음 행동 |
| implementation_plan.md | 작업 범위와 검증 계획 |
| screenshots/ | 현재 소스 화면11개·문서 열람본1개 JPG |
| build_source_inventory.py | 보호 설정 파일을 읽지 않고 근거·라우트 재추출 |
| serve_admin_preview.py | UTF-8 관리자 정적 양식 미리보기 전용 서버 |
| qa_cases.json | 자동화용 TC ID·전제·순서·기대결과·실행상태 |
| build_qa_package.py / document_validation.json | 통합 HTML·TC 목록 생성 및 근거/링크 점검 결과 |

자동 재개: 이 채팅의 heartbeat `qa`, 매시간 확인. 한도 도달 시 기록을 읽고 초기화 후 재개하며 완료하면 중지한다. 호스트/앱 실행 상태에 의존한다. 공식 안내: [예약 작업](https://learn.chatgpt.com/docs/automations?surface=app).

신청·승인·업체·쿠폰의 실제 사이클에는 확인된 테스트 환경과 역할별 계정이 필요하다. 이미 기록된 공개화면 결과를 새 실행의 통과 증거로 복사하지 않는다.
