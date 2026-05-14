const data = {
    kpis: [
        { label: '전체 진행률', value: '62%', sub: '회의/디자인/개발 기준 종합' },
        { label: '의사결정 필요', value: '3건', sub: '일정/범위/우선순위 영향' },
        { label: '현재 리스크', value: '4건', sub: '디자인, QA, 외부 의존성 포함' },
        { label: '다음 리뷰', value: 'D+2', sub: '승인자 피드백 회수 목표' }
    ],
    executive: [
        ['현재 핵심 목표', '리뉴얼 방향성 확정 후 디자인 시안 승인 및 개발 착수 범위를 확정한다.'],
        ['주요 완료 사항', '서비스 컨셉, 사용자 전략, 참고 통계, 향후 진행 예정사항 초안 정리 완료.'],
        ['현재 진행 사항', '디자인 시안 반영, 콘텐츠 필수 데이터 입력 범위, GitHub 작업 단위 정리 필요.'],
        ['다음 액션', '승인자는 디자인 시안과 메인 서비스 항목을 확인하고 개발팀은 승인안 기준으로 작업 범위를 잠근다.']
    ],
    decisions: [
        {
            level: 'high',
            title: '메인 서비스 항목 최종 결정',
            body: '지도, 공지&뉴스, 커뮤니티, 역사 콘텐츠 중 1차 배포 포함 범위 확정 필요.'
        },
        {
            level: 'high',
            title: '디자인 시안 승인',
            body: '승인 지연 시 개발 착수와 QA 일정이 같이 밀릴 수 있음.'
        },
        {
            level: 'medium',
            title: '정보 고급화 범위',
            body: '세무, 법률, 행정 등 고급 정보는 출처·검증·운영 책임 범위 확인 필요.'
        }
    ],
    workflow: [
        ['회의', '리뷰/피드백/결정 후보를 기록한다.'],
        ['AI 회의록 요약', '결정, 미결, 리스크, TODO만 압축한다.'],
        ['TODO 생성', 'MVP1, MVP2, 운영 안정화로 분류한다.'],
        ['GitHub 작업 진행', 'Issue, PR, Commit 기준으로 상태를 남긴다.'],
        ['Push 확인', '최근 변경사항과 작업 완료 가능성을 확인한다.'],
        ['AI 진척률 분석', '진행률, 병목, 일정 영향을 계산한다.'],
        ['Dashboard 갱신', '대표/리더용 의사결정 화면을 갱신한다.']
    ],
    meeting: [
        ['회의 핵심 요약', '서비스 방향은 지도 중심 생활 플랫폼이며, 핵심 사용자는 현지 거주 한인과 주재원/가족형이다.'],
        ['결정 사항', '초기 개발은 MobileWEB 우선, 관광객 통계는 참고자료 탭으로 분리한다.'],
        ['미결 사항', '역사 콘텐츠 구현 범위, 정보 검증 방식, 주요 서비스 항목 최종 포함 범위.'],
        ['TODO', '디자인 시안 반영, 콘텐츠 등록 목록 작성, GitHub Issue 분리, QA 기준 정의.'],
        ['리스크', '승인 지연, 운영 데이터 미확정, 외부 출처 검증 책임 불명확.']
    ],
    github: [
        ['Backlog', '역사 콘텐츠, 정보 고급화, 관광객 통계 확장'],
        ['Ready', '디자인 시안 반영, 공지&뉴스 메뉴 정리'],
        ['In Progress', '리뷰 브리핑 HTML, 참고자료 페이지, 의사결정 표'],
        ['Need Decision', '1차 배포 범위, 승인자 피드백, 운영팀 콘텐츠 책임'],
        ['QA', '모바일 화면, 링크 동작, 참고자료 출처 표시']
    ],
    humans: [
        ['최종 의사결정자', '방향성, 우선순위, 범위 제외/포함, 일정 영향 결정을 수행한다.'],
        ['승인자/대표', '디자인 시안 최종 확인, 조정 피드백, 승인 여부를 확정한다.'],
        ['운영팀', '공지, 지도, 업체, 역사, 뉴스 등 실제 콘텐츠와 출처를 등록한다.'],
        ['개발팀', '승인된 화면과 기능만 개발하고 GitHub 상태를 최신화한다.'],
        ['QA/리뷰 담당', '주요 메뉴 접근, 모바일 화면, 링크, 데이터 표시를 확인한다.'],
        ['AI PMO', '요약, TODO 생성, 진척률 분석, 리스크 감지, 대시보드 갱신을 지원한다.']
    ]
};

function create(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = content;
    return el;
}

function renderKpis() {
    const root = document.getElementById('kpiGrid');
    data.kpis.forEach(item => {
        const card = create('article', 'kpi');
        card.append(create('div', 'kpi-label', item.label));
        card.append(create('div', 'kpi-value', item.value));
        card.append(create('div', 'kpi-sub', item.sub));
        root.append(card);
    });
}

function renderPairs(rootId, items, className) {
    const root = document.getElementById(rootId);
    items.forEach(([title, body]) => {
        const item = create('div', className);
        item.append(create('strong', '', title));
        item.append(create('p', '', body));
        root.append(item);
    });
}

function renderDecisions() {
    const root = document.getElementById('decisionList');
    data.decisions.forEach(item => {
        const row = create('div', `decision-item ${item.level}`);
        row.append(create('strong', '', item.title));
        row.append(create('p', '', item.body));
        root.append(row);
    });
}

function renderWorkflow() {
    const root = document.getElementById('workflow');
    data.workflow.forEach(([title, body], index) => {
        const step = create('div', 'workflow-step');
        step.append(create('span', 'step-num', String(index + 1)));
        step.append(create('h3', '', title));
        step.append(create('p', '', body));
        root.append(step);
    });
}

function renderHumanActions() {
    const root = document.getElementById('humanActions');
    data.humans.forEach(([title, body]) => {
        const item = create('div', 'human-item');
        item.append(create('strong', '', title));
        item.append(create('p', '', body));
        root.append(item);
    });
}

renderKpis();
renderPairs('executiveSummary', data.executive, 'summary-item');
renderDecisions();
renderWorkflow();
renderPairs('meetingOutput', data.meeting, 'meeting-block');
renderPairs('githubBoard', data.github, 'github-item');
renderHumanActions();
