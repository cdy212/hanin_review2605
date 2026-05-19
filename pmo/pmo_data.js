window.PMO_STATE = {
  "meta": {
    "eyebrow": "AI PMO / Executive Dashboard / 2026-05-13 Review",
    "title": "대만한인회 리뉴얼 PMO 대시보드",
    "lead": "회의록과 GitHub 작업 상태를 기반으로 회원 정책, 메인 운영 기능, 뉴스 피드, 지도/서버 확인사항을 의사결정 중심으로 압축했습니다.",
    "chips": [
      {
        "label": "결정 필요 5건",
        "tone": "urgent"
      },
      {
        "label": "확인 필요 4건"
      },
      {
        "label": "진행률 60%"
      },
      {
        "label": "한인회 의견 검토 필요",
        "tone": "urgent"
      },
      {
        "label": "승인 전 초안"
      }
    ],
    "approvalState": "draft",
    "lastGeneratedAt": "2026-05-15T06:59:35.163Z"
  },
  "kpis": [
    {
      "label": "전체 진행률",
      "value": "60%",
      "sub": "1차 리뷰 내용 정리 및 TODO 분해 완료",
      "tone": "green",
      "progress": true
    },
    {
      "label": "의사결정 필요",
      "value": "5건",
      "sub": "한인회 의견 반영 범위, 회원 단계, 권한, 메인 운영, 뉴스 원천",
      "tone": "red"
    },
    {
      "label": "확인 필요",
      "value": "4건",
      "sub": "지도 비용, 업체 추출, 서버/도메인, 웹푸쉬",
      "tone": "amber"
    },
    {
      "label": "다음 액션",
      "value": "승인",
      "sub": "정회원 기준과 뉴스 피드 원천 우선 확정",
      "tone": "blue"
    }
  ],
  "cycle": [
    {
      "title": "회의",
      "desc": "웹앱 버전 1차 리뷰 완료",
      "state": "done"
    },
    {
      "title": "AI 요약",
      "desc": "결정, 미결, TODO 분리 완료",
      "state": "done"
    },
    {
      "title": "TODO",
      "desc": "회원/뉴스/지도 확인 작업화",
      "state": "active"
    },
    {
      "title": "GitHub",
      "desc": "Issue 생성 및 담당자 배정 대기",
      "state": ""
    },
    {
      "title": "Push 확인",
      "desc": "최근 변경사항 검토 대기",
      "state": ""
    },
    {
      "title": "진척률",
      "desc": "완료, QA, 병목 종합 판단",
      "state": ""
    },
    {
      "title": "Dashboard",
      "desc": "대표용 현황판 갱신",
      "state": ""
    }
  ],
  "decisions": [
    {
      "level": "high",
      "badge": "High",
      "title": "260515 한인회 의견 반영 범위 결정",
      "body": "세부페이지, 회원가입, 커뮤니티, 쿠폰 등록, 마이페이지, MVP 범위가 기존 260513 기준보다 확장되어 협의가 필요합니다.",
      "impact": "바로 반영하면 1차 개발 범위와 일정이 커질 수 있으므로 확정 항목만 작업 Issue로 발행해야 합니다."
    },
    {
      "level": "high",
      "badge": "High",
      "title": "회원가입 2단계 입력 정책 결정",
      "body": "2단계 정보를 언제 받을지, 어떤 항목을 받을지, 수동/인증 중 어떤 방식으로 관리할지 결정해야 합니다.",
      "impact": "쿠폰 사용, 게시글 등록, 정회원 전환 흐름 전체에 영향을 줍니다."
    },
    {
      "level": "high",
      "badge": "High",
      "title": "회원 권한 구조 확정",
      "body": "일반회원, 정회원, 업체회원, 관리자의 권한과 정회원 전환 기준을 확정해야 합니다.",
      "impact": "게시판 글쓰기, 쿠폰 사용, 업체 쿠폰 등록 승인 정책의 기준이 됩니다."
    },
    {
      "level": "medium",
      "badge": "Medium",
      "title": "메인 화면 운영 관리자 기능 결정",
      "body": "메인 배너 등 메인 화면에서 운영자가 직접 관리해야 하는 기능 범위를 정해야 합니다.",
      "impact": "관리자 페이지 범위와 초기 개발 작업량을 결정합니다."
    },
    {
      "level": "high",
      "badge": "High",
      "title": "뉴스 피드 구성 원천 결정",
      "body": "코트라 RSS, 타이완 투데이 RSS, 인스타 공식 커뮤니티 중 어떤 원천을 사용할지 결정해야 합니다.",
      "impact": "커뮤니티 탭의 자동화 범위, 출처 표기, 운영 검수 방식에 영향을 줍니다."
    }
  ],
  "todos": [
    {
      "id": "todo-compare-260515-opinion",
      "p": "P0",
      "tone": "p0",
      "title": "260515 한인회 의견 비교 검토",
      "owner": "기획/승인자",
      "targetRepo": "review",
      "body": "260513 기준안과 260515 한인회 의견의 차이를 검토하고, 협의/확정/보류 항목을 분리합니다."
    },
    {
      "id": "todo-member-step2-policy",
      "p": "P0",
      "tone": "p0",
      "title": "회원가입 2단계 정책안 작성",
      "owner": "기획/승인자",
      "targetRepo": "review",
      "body": "입력 시점, 수집 항목, 인증 방식, 약관/선택정보 포함 여부를 한 장으로 정리합니다."
    },
    {
      "id": "todo-member-role-policy",
      "p": "P0",
      "tone": "p0",
      "title": "정회원 기준 및 권한표 확정",
      "owner": "승인자",
      "targetRepo": "review",
      "body": "일반회원, 정회원, 업체회원, 관리자 권한과 쿠폰/게시판 접근 기준을 확정합니다."
    },
    {
      "id": "todo-admin-backoffice-partner",
      "p": "P0",
      "tone": "p0",
      "title": "백오피스 관리자 기능 및 제휴업체 기능 체크",
      "owner": "승인자/개발팀",
      "targetRepo": "back",
      "body": "쿠폰 등록 승인, 회원 관리, 홈페이지 운영 관리 범위와 접근 권한을 확정합니다."
    },
    {
      "id": "todo-coupon-review",
      "p": "P0",
      "tone": "p0",
      "title": "쿠폰기능 검토",
      "owner": "기획/개발팀",
      "targetRepo": "front+back",
      "body": "업체회원 쿠폰 등록, 오프라인 승인 비밀번호, 사용자 쿠폰 사용 흐름을 검토합니다."
    },
    {
      "id": "todo-main-design-update",
      "p": "P0",
      "tone": "p0",
      "title": "메인화면 디자인 수정",
      "owner": "디자인/개발팀",
      "targetRepo": "front",
      "body": "결정 시안 기준으로 메인 화면과 하단 공지 스크롤 처리 수정 범위를 정리합니다."
    },
    {
      "id": "todo-news-source-compare",
      "p": "P1",
      "tone": "p1",
      "title": "뉴스 피드 원천 비교",
      "owner": "운영팀",
      "targetRepo": "review",
      "body": "코트라 RSS, 타이완 투데이 RSS, 인스타 공식 커뮤니티의 출처 안정성과 운영 부담을 비교합니다."
    },
    {
      "id": "todo-google-map-check",
      "p": "P1",
      "tone": "p1",
      "title": "구글 지도 비용 및 업체 정보 확인",
      "owner": "개발팀",
      "targetRepo": "back",
      "body": "지도 사용 비용, 업체 정보 추출 가능 여부, 제휴맵 소팅 방식 검토 결과를 정리합니다."
    },
    {
      "id": "todo-server-domain-check",
      "p": "P1",
      "tone": "p1",
      "title": "서버/도메인 사양 확인",
      "owner": "개발팀",
      "targetRepo": "back",
      "body": "현 배포 환경과 향후 운영 사양을 확인하고 필요한 변경 여부를 보고합니다."
    },
    {
      "id": "todo-webpush-review",
      "p": "P2",
      "tone": "p2",
      "title": "웹푸쉬 적용 가능성 검토",
      "owner": "개발팀",
      "targetRepo": "front+back",
      "body": "공지, 쿠폰, 커뮤니티 알림에 웹푸쉬를 적용할 필요와 구현 부담을 검토합니다."
    }
  ],
  "github": [
    {
      "status": "Review Gate",
      "body": "260515 한인회 의견 비교 검토 완료 전 FRONT/BACK Issue 발행 보류",
      "count": "1건"
    },
    {
      "status": "Need Decision",
      "body": "회원 2단계 입력 정책, 권한 구조, 메인 관리자 기능, 뉴스 원천",
      "count": "4건"
    },
    {
      "status": "Ready",
      "body": "회원 정책표, 뉴스 원천 비교표, 지도 비용 확인 이슈 생성 가능",
      "count": "3건"
    },
    {
      "status": "In Progress",
      "body": "회의록 정리, PMO 대시보드 반영",
      "count": "2건"
    },
    {
      "status": "Blocked",
      "body": "구글 지도 비용, 업체 정보 추출, 서버/도메인 사양 확인 전 개발 범위 확정 어려움",
      "count": "3건"
    }
  ],
  "analysis": [
    [
      "완료 반영",
      "1차 리뷰 회의록 정리와 의사결정 항목 추출 완료"
    ],
    [
      "검토 게이트",
      "260515 한인회 의견은 기존 기준안과 차이가 있어 확정 전 작업 발행을 보류"
    ],
    [
      "진행 요인",
      "하단 네비게이션과 쿠폰/제휴맵 방향성은 초안 정리됨"
    ],
    [
      "정체 요인",
      "회원 정책과 뉴스 원천 결정 전 기능 범위 확정 어려움"
    ],
    [
      "판단",
      "P0 정책 2건 확정 시 개발 착수 가능성이 크게 올라감"
    ]
  ],
  "meetingDirectoryUrl": "cowork_plan/회의/",
  "meetingIndexUrl": "cowork_plan/회의/meetings.json",
  "reviewPlanUrl": "pmo/review_plan_260515.json"
};

window.PMO_APPLY_PLAN = {
  "approvalState": "blocked_pending_review",
  "reviewGate": {
    "status": "pending",
    "reason": "260515 한인회 의견이 기존 260513 기준안과 다른 부분이 있어, 확정 전 FRONT/BACK Issue 발행을 보류합니다.",
    "sourceMeeting": "260515_한인회.md",
    "reviewPlan": "pmo/review_plan_260515.json",
    "comparisonDoc": "doc/meeting_compare_260513_vs_260515.md"
  },
  "reviewRepo": {
    "purpose": "회의록, dashboard, 승인 전 초안 관리"
  },
  "workRepos": {
    "front": {
      "purpose": "프론트엔드 실제 작업 Issue/PR 관리",
      "repo": ""
    },
    "back": {
      "purpose": "백엔드/API/관리자 실제 작업 Issue/PR 관리",
      "repo": ""
    }
  },
  "items": [
    {
      "id": "todo-admin-backoffice-partner",
      "sourceMeeting": "auto",
      "title": "[P0][BACK] 백오피스 관리자 기능 및 제휴업체 기능 체크",
      "targetRepo": "back",
      "priority": "P0",
      "type": "todo",
      "owner": "승인자/개발팀",
      "status": "draft",
      "body": "쿠폰 등록 승인, 회원 관리, 홈페이지 운영 관리 범위와 접근 권한을 확정합니다.",
      "acceptanceCriteria": []
    },
    {
      "id": "todo-coupon-review",
      "sourceMeeting": "auto",
      "title": "[P0][FRONT+BACK] 쿠폰기능 검토",
      "targetRepo": "front+back",
      "priority": "P0",
      "type": "todo",
      "owner": "기획/개발팀",
      "status": "draft",
      "body": "업체회원 쿠폰 등록, 오프라인 승인 비밀번호, 사용자 쿠폰 사용 흐름을 검토합니다.",
      "acceptanceCriteria": []
    },
    {
      "id": "todo-main-design-update",
      "sourceMeeting": "auto",
      "title": "[P0][FRONT] 메인화면 디자인 수정",
      "targetRepo": "front",
      "priority": "P0",
      "type": "todo",
      "owner": "디자인/개발팀",
      "status": "draft",
      "body": "결정 시안 기준으로 메인 화면과 하단 공지 스크롤 처리 수정 범위를 정리합니다.",
      "acceptanceCriteria": []
    },
    {
      "id": "todo-google-map-check",
      "sourceMeeting": "auto",
      "title": "[P1][BACK] 구글 지도 비용 및 업체 정보 확인",
      "targetRepo": "back",
      "priority": "P1",
      "type": "todo",
      "owner": "개발팀",
      "status": "draft",
      "body": "지도 사용 비용, 업체 정보 추출 가능 여부, 제휴맵 소팅 방식 검토 결과를 정리합니다.",
      "acceptanceCriteria": []
    },
    {
      "id": "todo-server-domain-check",
      "sourceMeeting": "auto",
      "title": "[P1][BACK] 서버/도메인 사양 확인",
      "targetRepo": "back",
      "priority": "P1",
      "type": "todo",
      "owner": "개발팀",
      "status": "draft",
      "body": "현 배포 환경과 향후 운영 사양을 확인하고 필요한 변경 여부를 보고합니다.",
      "acceptanceCriteria": []
    },
    {
      "id": "todo-webpush-review",
      "sourceMeeting": "auto",
      "title": "[P2][FRONT+BACK] 웹푸쉬 적용 가능성 검토",
      "targetRepo": "front+back",
      "priority": "P2",
      "type": "todo",
      "owner": "개발팀",
      "status": "draft",
      "body": "공지, 쿠폰, 커뮤니티 알림에 웹푸쉬를 적용할 필요와 구현 부담을 검토합니다.",
      "acceptanceCriteria": []
    }
  ]
};

window.PMO_REVIEW_PLAN = {
  "status": "pending",
  "sourceMeetings": {
    "baseline": "260513.md",
    "opinion": "260515_한인회.md"
  },
  "purpose": "260515 한인회 의견을 기존 260513 기준안에 바로 반영하지 않고, 차이점을 협의/확정/보류/2차범위로 판정하기 위한 검토표입니다.",
  "decisionOptions": [
    "confirm",
    "defer",
    "discuss",
    "phase2",
    "reject"
  ],
  "items": [
    {
      "id": "review-bottom-tab-structure",
      "category": "하단 탭",
      "baseline": "홈 / 제휴(쿠폰 Map) / 커뮤니티 / 마이페이지",
      "opinion": "홈 / 쿠폰 / 커뮤니티 / 마이페이지",
      "decisionNeeded": "제휴(쿠폰 Map) 구조를 유지할지, 쿠폰 탭으로 단순화할지 결정",
      "recommendedDecision": "discuss",
      "applyPolicy": "승인 전 작업 Issue 발행 금지"
    },
    {
      "id": "review-signup-steps",
      "category": "회원가입",
      "baseline": "2단계 정보 입력 시점과 항목 결정 필요",
      "opinion": "1단계 간편가입, 2단계 기본정보, 3단계 선택정보, 4단계 약관동의",
      "decisionNeeded": "가입 단계와 필수/선택 수집 항목 확정",
      "recommendedDecision": "discuss",
      "applyPolicy": "회원가입 관련 FRONT/BACK Issue 발행 전 확정 필요"
    },
    {
      "id": "review-member-roles",
      "category": "권한 구조",
      "baseline": "일반회원 / 정회원 / 업체회원 / 관리자",
      "opinion": "비회원 / 일반회원 / 업체회원 / 관리자 및 초기 버전 일반회원/정회원/업체회원/관리자",
      "decisionNeeded": "비회원 포함 여부, 일반회원과 정회원 차이, 업체회원/관리자 권한 범위 확정",
      "recommendedDecision": "discuss",
      "applyPolicy": "권한 구조 확정 전 관리자/쿠폰/커뮤니티 Issue 발행 보류"
    },
    {
      "id": "review-coupon-registration",
      "category": "쿠폰",
      "baseline": "업체가 쿠폰 발급, 오프라인 승인 비밀번호로 사용",
      "opinion": "쿠폰 상세, 업체 상세, 쿠폰 등록 페이지, 승인 상태까지 구체화",
      "decisionNeeded": "쿠폰 등록 주체와 승인 프로세스, 1차 MVP 포함 여부 결정",
      "recommendedDecision": "discuss",
      "applyPolicy": "쿠폰 기능 Issue는 검토 상태 유지"
    },
    {
      "id": "review-community-policy",
      "category": "커뮤니티",
      "baseline": "소식 / 중고거래 / 구인구직 / 공지 / 코트라 경제뉴스",
      "opinion": "전체 / 자유 / 질문 / 사고팔기 / 구인구직 / 공지, 글쓰기/댓글/신고/관리자 삭제",
      "decisionNeeded": "게시판 카테고리와 글쓰기/댓글/신고/관리 정책 확정",
      "recommendedDecision": "discuss",
      "applyPolicy": "커뮤니티 상세 기능은 확정 전 발행 보류"
    },
    {
      "id": "review-mypage-scope",
      "category": "마이페이지",
      "baseline": "찜한 쿠폰, 나의 활동, 고객센터/설정",
      "opinion": "개인정보 수정, 내가 쓴 글/댓글, 쿠폰 등록/제보, 사용내역, 1:1 문의, 회원탈퇴",
      "decisionNeeded": "1차 MVP에 포함할 마이페이지 하위 기능 결정",
      "recommendedDecision": "discuss",
      "applyPolicy": "마이페이지 추가 범위는 확정 전 발행 보류"
    },
    {
      "id": "review-mvp-scope",
      "category": "MVP 범위",
      "baseline": "1차/2차 범위가 명확히 분리되지 않음",
      "opinion": "1차: 로그인/회원가입, 홈, 쿠폰, 커뮤니티, 마이페이지 주요 기능. 2차: 위치 추천, 히스토리, 업체 등록, 관리자 승인, 푸시, 다국어",
      "decisionNeeded": "1차 MVP 범위와 2차 범위를 재확정",
      "recommendedDecision": "discuss",
      "applyPolicy": "MVP 범위 확정 전 신규 대형 Issue 발행 금지"
    }
  ],
  "nextAction": "승인자는 각 항목을 confirm/defer/discuss/phase2/reject 중 하나로 판정한 뒤, confirm 항목만 pmo/state.json 및 pmo/apply_plan.json에 반영합니다."
};

window.PMO_MEETINGS = [
  {
    "file": "260515_한인회.md",
    "title": "<양민영 회장님 리뷰>",
    "date": "2026-05-15",
    "content": "<양민영 회장님 리뷰>\r\n한인회앱\r\n리뷰\r\n초기 개발버전 문제 없음\r\n세부페이지 기획 필요. 예를들어, 쿠폰상세페이지처럼 각 상세페이지 기획\r\n가입페이지, 이름,휴대폰번호,이메일, 생년월일, 주소등등\r\n커뮤니티, 상세페이지 기획, 글쓰기, 보이기 방식등\r\n마이페이지, 개인정보 변경 기능, 자기가 쓴 글, 쿠폰 등록 페이지 등등\r\n\r\n<아젠다>\r\n방향성: 세부 화면과 운영 정책을 확정\r\n목표: 한인회 앱 v0.2 기획\r\n - 어떤 상세 페이지가 필요한가\r\n - 회원가입 때 어떤 정보를 필수/선택으로 받을 것인가?\r\n - 커뮤니티 글쓰기와 게시글 상세 화면은 어떻게 구성할 것인가?\r\n - 마이페이지에서 사용자가 무엇을 직접 관리할 수 있게 할 것인가?\r\n\r\n1. 어떤 세부페이지가 필요한가\r\n현재 기획안 및 개발 범위 (초기 개발 버전 문제 없음)\r\n하단 탭: \t  \t홈, 쿠폰, 커뮤니티, 마이페이지\r\n로그인: \t  \t카카오, Google, Apple, 이메일 가입\r\n홈: \t\t\t메인 배너, 퀵 메뉴, 핫딜 쿠폰\r\n쿠폰: \t\t\t검색, 지역/카테고리 필터, 혜택 강조\r\n쿠폰 상세:\t  \t지도 보기, 유의사항, 쿠폰 사용하기\r\n커뮤니티:\t  \t게시판 탭, 글쓰기 FAB, 댓글 수/썸네일\r\n        \t마이페이지:\t\t찜한 쿠폰, 나의 활동, 고객센터/설정\r\n\r\n    \t세부페이지 목록 예시\r\n        \t\t쿠폰 상세페이지\t      업체정보, 혜택, 유효기간, 사용조건, 지도, 전화\r\n        \t\t업체 상세페이지\t      업체 소개, 영업시간, 주소, 전화번호, 사진, 쿠폰 목록\r\n        \t\t이벤트 상세페이지\t      배너 클릭 시 이동할 페이지\r\n        \t\t공지사항 상세페이지\t      한인회 공지, 행사 안내\r\n        \t\t커뮤니티 글 상세페이지\t      본문, 이미지, 댓글, 수정/삭제, 신고\r\n        \t\t구인구직 상세페이지\t      모집 내용, 연락처, 지역, 마감일\r\n        \t\t마이페이지 하위 상세\t      개인정보 수정, 내가 쓴 글, 쿠폰 등록\r\n\r\n2. 회원가입 정보 수집 범위\r\n이름\t\t\t한인회 회원 확인용\r\n휴대폰 번호\t\t본인 확인, 연락\r\n이메일\t\t\t로그인/공지 수신\r\n생년월일\t\t회원 통계, 연령대 확인\r\n주소\t\t\t대만 내 거주 지역 확인\r\n거주 지역\t\t타이베이, 신베이, 타이중 등 지역 기반 서비스\r\n직업/소속\t\t한인 네트워크 기능 확장 가능\r\n마케팅/공지 수신 동의\t개인정보 이슈 방지\r\n\r\n회원가입에서 너무 많은 정보를 필수로 받으면 사용자가 가입을 포기 가능 \r\n1 단계: 간편 가입 - 카카오 / Google / Apple / 이메일\r\n2단계: 기본 정보 입력 - 이름, 휴대폰번호, 이메일, 거주 지역\r\n3단계: 선택 정보 입력 - 생년월일, 상세 주소, 직업/소속\r\n4단계: 약관 동의 - 서비스 이용약관, 개인정보 수집 동의, 커뮤니티 운영정책 동의\r\n\r\n\r\n3. 커뮤니티 기능 상세 기획\r\n현재 기획서: 커뮤니티 탭, 서브탭, 글쓰기 버튼, 댓글 수, 이미지 썸네일\r\n상세페이지, 글쓰기, 보이는 방식이 요구됨\r\n\r\n[커뮤니티 구조]\r\n게시판 카테고리\t전체, 자유, 질문, 사고팔기, 구인구직, 공지\r\n글 목록 방식\t\t최신순, 인기순, 댓글 많은 순\r\n글쓰기 권한\t\t로그인 사용자만 가능\r\n이미지 첨부\t\t가능/불가능, 최대 개수\r\n댓글 기능\t\t댓글만 허용할지, 대댓글도 허용할지\r\n익명 여부\t\t실명/닉네임/익명\r\n신고 기능\t\t\r\n관리자 삭제 권한\t\r\n금지 콘텐츠 정책\t\r\n\r\n[커뮤니티 화면별 필요 기획]\r\n커뮤니티 목록\t\t카테고리 탭, 검색, 글 제목, 작성자, 날짜, 댓글 수\r\n게시글 상세\t\t제목, 작성자, 작성일, 본문, 이미지, 댓글, 신고\r\n글쓰기\t\t\t카테고리 선택, 제목, 내용, 이미지 첨부, 등록 버튼\r\n글 수정\t\t\t기존 내용 불러오기, 수정 완료\r\n댓글 관리\t\t댓글 작성, 삭제, 신고\r\n\r\n4. 쿠폰 등록 및 관리 방식 결정\r\n“쿠폰 등록 페이지”를 언급 → 누가 쿠폰 등록\r\n\r\n[결정할 구조]\r\n관리자만 등록\t\t한인회 관리자 또는 운영자\t품질관리 쉬움\t운영자가 바쁨\r\n업체가 직접 등록\t가맹점주가 직접 쿠폰 등록\t확장성 좋음\t승인/검수 필요\r\n\r\n[쿠폰 등록 페이지 필드 예시]\r\n업체명\t\t집밥 박선성 1호점\r\n카테고리\t음식점\r\n지역\t\t타이베이\r\n주소\t\t지도 연결용\r\n전화번호\t전화 연결용\r\n혜택 내용\t김밥 1줄 무료, 10% 할인\r\n사용 조건\t1인 1회, 중복 사용 불가 등\r\n유효기간\t시작일/종료일\r\n대표 이미지\t업체 또는 쿠폰 이미지\r\n승인 상태\t대기, 승인, 반려\r\n\r\n\r\n5. 마이페이지 기능 범위 확정\r\n현재: 마이페이지에는 찜한 쿠폰, 나의 활동 내역, 고객센터 및 설정\r\n개인정보 변경, 내가 쓴 글, 쿠폰 등록 페이지를 추가로 요구\r\n\r\n[변경 마이페이지 구조]\r\n개인정보 수정\t\t이름, 휴대폰, 이메일, 주소, 생년월일 수정\r\n내가 찜한 쿠폰\t\t저장한 쿠폰 목록\r\n내가 쓴 글\t\t커뮤니티 게시글 목록\r\n내가 쓴 댓글\t\t댓글 목록\r\n쿠폰 등록/제보\t\t업체 또는 쿠폰 등록 신청\r\n내 쿠폰 사용내역\t사용한 쿠폰 기록\r\n공지사항\t\t한인회 공지\r\n1:1 문의\t\t문의 작성 및 답변 확인\r\n설정\t\t\t알림 설정, 언어 설정\r\n로그아웃/회원탈퇴\t계정 관리\r\n\r\n마이페이지를 일반 사용자용으로만 만들 것인지, 업체 회원도 사용할 수 있게 만들 것인지\r\n업체 회원까지 고려하면 권한 구조가 필요\r\n\r\n6. 사용자 권한 구조 결정\r\n커뮤니티 앱이 아닌 한인회, 쿠폰, 업체, 공지, 커뮤니티가 결합된 앱이므로 권한 구분\r\n\r\n비회원\t\t홈 일부 보기, 쿠폰 목록 보기\r\n일반 회원\t쿠폰 사용, 커뮤니티 글쓰기, 댓글, 마이페이지\r\n업체 회원\t쿠폰 등록 신청, 업체 정보 수정 요청\r\n관리자\t\t공지 등록, 쿠폰 승인, 게시글 관리, 회원 관리\r\n\t\r\n\t[초기 버전]\r\n일반회원 / 정회원 / 업체회원  / 관리자 \r\n\r\n7. MVP 개발 범위 결정\r\n\t1, 2차로 구분하여서 개발\r\n\r\n1차 개발 MVP 범위\r\n로그인/회원가입, 홈, 쿠폰 리스트, 쿠폰 상세, 커뮤니티 목록, 게시글 상세, 글쓰기, 마이페이지, 개인정보 수정, 내가 쓴 글\r\n\r\n2차 추가 범위\r\n위치 기반 근거리 업체 추천, 쿠폰 사용 히스토리, 업체 직접 쿠폰 등록, 관리자 승인 시스템, 푸시 알림, 댓글 알림, 다국어 지원\r\n\r\n\r\n\r\n\r\n"
  },
  {
    "file": "260513.md",
    "title": "20260513 1차 리뷰",
    "date": "2026-05-13",
    "content": "20260513 1차 리뷰\r\n\r\n주요 아젠다: 한인회 웹앱 버전 리뷰 후 추가 개선 사항 논의\r\n\r\n참고 문서\r\nhttps://docs.google.com/document/d/1aDpNSsQhTQ0oCjmosBCEi5oPF6blD0BZpqu3OHUvk-o/edit?tab=t.0\r\n\r\n참고 URL\r\nhttps://kr.happytuk.tw\r\n1. 회원, 로그인 및 회원가입\r\nURL: https://kr.happytuk.tw/register\r\n\r\n1.1 회원 가입 [ 참고 문서 - 2. 회원가입 정보 수집 범위 ]\r\n간편가입 - 현 소셜 버전 가입\r\n2단계 가입 - [결정 필요 사안] 언제 2단계 정보를 입력 할지, 어떤 정보를 입력 할지 (가입페이지, 이름, 휴대폰번호, 이메일, 생년월일, 주소), 어떻게 인증 혹은 관리 할지 (수동 혹은 인증 등)\r\n예: 쿠폰 사용, 게시글 등록 시점 2단계 처리\r\n3단계(선택 정보), 4단계(약관 동의 항목)은 2단계 시점에 포함 하여 함께 진행 할지 여부 결정 필요\r\n\r\n1.2 회원 정책 [ 6. 참고 문서 - 사용자 권한 구조 결정 ]\r\n일반회원 - 소셜로 로그인 한 사용자 (게시판 일반 조회 가능, 글쓰기 불가, 쿠폰 불가)\r\n정회원 - [결정 필요 사안] 기본정보 입력(2단계 정보) 혹은 인증을 거친 사용자 (게시판 일반 글쓰기 가능, 쿠폰 사용 가능)\r\n업체회원 - 쿠폰 등록 신청\r\n관리자 - 쿠폰 등록 승인 및 홈페이지 관리\r\n\r\n2. 메인화면\r\n현재 시안: https://kr.happytuk.tw/main\r\n결정 시안: https://hanin-review2605.pages.dev/main2\r\n하단 공지내용 스크롤 처리 반영\r\n\r\n2.1 컨텐츠 및 관리자 기능 결정\r\n[결정 필요 사안] 메인 화면 필요 운영 관리자 기능 결정 (예: 메인 배너 등)\r\n\r\n3. 하단 네비게이션\r\n구성: 홈 / 제휴(쿠폰 Map) / 커뮤니티(소식+공지+News) / 마이페이지\r\n\r\n4. 쿠폰\r\n업체 사용자가 사업장 번호 기반 쿠폰 발급, 사용자는 오프라인에서 업체 승인(비밀번호)을 통해 사용\r\n\r\n5. 제휴[맵]\r\n업체 임시 소팅 기능 검토 (가중치 소팅 방법)\r\n\r\n6. 커뮤니티\r\n구성: 소식 / 중고거래 / 구인구직 / 공지 / 코트라 경제뉴스\r\n커뮤니티 탭 최상단 공지 영역 확보 (주의 안내 사항)\r\n[결정 필요 사안] 뉴스 피드 구성 원천 결정\r\n코트라 RSS: https://dream.kotra.or.kr/kotra/rssList.do?pSetIdx=242&pAreaCd=01\r\n타이완 투데이 RSS: https://api.taiwantoday.tw/en/rss.php?unit=2,6,10,15,18\r\n인스타 공식 커뮤니티 사용 예정\r\n\r\netc. 확인 필요 사안\r\n구글 지도 비용 및 사용 여부 확인\r\n구글 지도 내 업체 정보 추출 가능 여부 확인\r\n서버 및 도메인 사양 확인\r\n웹 푸쉬 검토\r\n\r\n\r\n"
  }
];
