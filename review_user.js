const colors = {
    red: '#c11b2f',
    blue: '#2563eb',
    teal: '#0f766e',
    gold: '#b45309',
    green: '#15803d',
    gray: '#9a9794',
    pale: '#f5f3ee'
};

const kpis = [
    {
        label: '대만 내 한국 국적 외국인',
        value: '5,047명',
        sub: 'NIA 2026.3 원자료 기준, 유효 ARC 보유자',
        status: 'official'
    },
    {
        label: '수도권 거주자',
        value: '2,712명',
        sub: '타이베이+신베이+지룽, 전체 53.7%',
        status: 'official'
    },
    {
        label: '북부 산업/과학벨트',
        value: '935명',
        sub: '타오위안+신주현+신주시+먀오리, 전체 18.5%',
        status: 'official'
    },
    {
        label: '한국 유학생 직접 수치',
        value: '2,418명',
        sub: '대만 교육부 113학년도 자료 기준',
        status: 'official'
    }
];

const trendRows = [
    { month: '2023-03', total: 4964, male: 2496, female: 2468, diff: null, rate: null },
    { month: '2024-03', total: 5009, male: 2530, female: 2479, diff: 45, rate: 0.91 },
    { month: '2025-03', total: 4879, male: 2479, female: 2400, diff: -130, rate: -2.60 },
    { month: '2026-03', total: 5047, male: 2561, female: 2486, diff: 168, rate: 3.44 }
];

const cityRows = [
    ['타이베이시', 1586, 731, 855, '31.4%'],
    ['신베이시', 1083, 537, 546, '21.5%'],
    ['타이중시', 633, 327, 306, '12.5%'],
    ['타오위안시', 472, 283, 189, '9.4%'],
    ['가오슝시', 410, 227, 183, '8.1%'],
    ['신주현', 220, 123, 97, '4.4%'],
    ['신주시', 196, 105, 91, '3.9%'],
    ['타이난시', 154, 77, 77, '3.1%'],
    ['먀오리현', 47, 24, 23, '0.9%'],
    ['장화현', 43, 21, 22, '0.9%'],
    ['지룽시', 43, 18, 25, '0.9%'],
    ['화롄현', 39, 19, 20, '0.8%'],
    ['핑둥현', 24, 12, 12, '0.5%'],
    ['이란현', 22, 12, 10, '0.4%'],
    ['자이시', 20, 8, 12, '0.4%'],
    ['난터우현', 18, 14, 4, '0.4%'],
    ['윈린현', 12, 8, 4, '0.2%'],
    ['자이현', 10, 7, 3, '0.2%'],
    ['타이둥현', 10, 6, 4, '0.2%'],
    ['진먼현', 5, 2, 3, '0.1%'],
    ['펑후현', 0, 0, 0, '0.0%'],
    ['롄장현', 0, 0, 0, '0.0%']
].map((row, idx) => ({
    rank: idx + 1,
    city: row[0],
    total: row[1],
    male: row[2],
    female: row[3],
    share: row[4]
}));

const regionRows = [
    ['수도권: 타이베이+신베이+지룽', 2712, '53.7%', '한인회 홈, 행사, 병원, 행정, 교육 정보의 기본 권역'],
    ['북부 산업/과학벨트: 타오위안+신주현+신주시+먀오리', 935, '18.5%', '주재원, 현지취업, 반도체/테크 직군, 가족 정착 정보 중요'],
    ['중부: 타이중+장화+난터우+윈린', 706, '14.0%', '타이중 지역 커뮤니티와 행사 분리 노출 필요'],
    ['남부: 타이난+가오슝+핑둥+자이', 618, '12.3%', '가오슝·타이난 중심 지역 페이지 필요'],
    ['동부/도서: 이란+화롄+타이둥+펑후+진먼+롄장', 76, '1.5%', '오프라인보다 긴급 정보, 온라인 문의, 대표부/핫라인 연결 우선']
].map(([area, count, share, note]) => ({ area, count, share, note }));

const benchmarkRows = [
    ['NIA 2026.3', '2026-03-31 기준, 2026-04-27 게시', '5,047명', '대만 내 유효 ARC를 가진 한국 국적 외국인', '가장 최신의 거주지·성별 분석 기준'],
    ['재외동포청 2025 재외동포현황', '2024-12-31 기준, 2026-03-31 파일', '5,319명', '재외공관 조사 기반 대만 재외동포 추정치', 'NIA보다 넓은 추정치. 한인사회 전체 규모 교차검증'],
    ['외교부 국가/지역 정보', '2023-11월 기준 인용', '약 5,121명', '대만 이민서 기준 교민 수 소개', '과거 기준 참고. 최신 분석 기준으로는 NIA 2026.3 우선']
].map(([source, date, count, definition, reading]) => ({ source, date, count, definition, reading }));

const segmentRows = [
    {
        segment: '장기 거주자',
        count: '5,047명',
        status: '공식 수치',
        evidence: 'NIA 2026.3 Foreign Residents by Nationality. 대만 내 유효 ARC를 가진 한국 국적 외국인.',
        method: '추론 아님. 공개 원자료의 KOREA 남/여 및 거주지별 합산.',
        needs: '긴급 연락망, 대표부, 병원, 행사, 생활정보, 지역별 정보.'
    },
    {
        segment: '주재원·현지취업·가족 동반',
        count: '추정 체크필요',
        status: '추정 체크필요',
        evidence: '체류 목적별 한국인 공개표 미확인. 북부 산업/과학벨트 935명, 타이베이·신베이·타오위안·신주 집중.',
        method: '거주지 집중도와 북부 산업/과학벨트 권역 해석을 기반으로 한 운영용 세그먼트 가설.',
        needs: '주거, 학교, 소아의료, 은행, 세금, 행정, 가족 정착 허브.'
    },
    {
        segment: '유학생·어학연수생',
        count: '추정 체크필요',
        status: '추정 체크필요',
        evidence: 'Study in Taiwan 2025/26 국가별 Top 10에 한국이 없음. 한국 유학생은 10위 중국 본토 4,113명보다 적음.',
        method: '직접 수치 미확인. Top 10 제외 사실로 상한만 제한 가능한 상태.',
        needs: '학교, ARC, 은행, 통신, 아르바이트, 학교생활, 교통, 커뮤니티.'
    },
    {
        segment: '사업자·전문직',
        count: '추정 체크필요',
        status: '추정 체크필요',
        evidence: '지역 총량만 확인 가능. 업체 디렉토리와 경제 네트워크 수요가 대표 콘텐츠로 정리됨.',
        method: '공식 직업/사업자 수치가 없어 한인회 업체 등록, 공개동의, 증빙 데이터로 검증 필요.',
        needs: '업체 등록, 세금, 네트워킹, 법률/부동산, 전문가 승인 콘텐츠, 업체 디렉토리.'
    },
    {
        segment: '관광객·단기 체류자',
        count: 'NIA 5,047명에 미포함',
        status: '부가 정보',
        evidence: '단기 체류자·관광객·출장자·외교/예우 비자 대상자는 NIA 장기 거주자 표에 포함되지 않음.',
        method: '장기 거주자 핵심 모수와 분리. 사용자층 분석에서는 부가 사용자로만 표시.',
        needs: '긴급 연락망, 대표부, 병원, 업체, 행정기관 등 단기 접근 정보.'
    }
];

const sourceRows = [
    ['공식 원자료', 'NIA 2026.3 Foreign Residents by Nationality', 'https://www.immigration.gov.tw/5475/5478/141478/141380/411940/cp_news', '확인됨'],
    ['공식 원자료', 'NIA 2025.3 Foreign Residents by Nationality', 'https://www.immigration.gov.tw/5475/5478/141478/141380/390899/cp_news', '확인됨'],
    ['공식 원자료', 'NIA 2024.3 Foreign Residents by Nationality', 'https://www.immigration.gov.tw/5475/5478/141478/141380/367759/cp_news', '확인됨'],
    ['공식 원자료', 'NIA 2023.3 Foreign Residents by Nationality', 'https://www.immigration.gov.tw/5475/5478/141478/141380/345832/cp_news', '확인됨'],
    ['공식 통계', '재외동포청 2025 재외동포현황 PDF', 'https://www.oka.go.kr/upload/contents/files/okastatus_2025_20260331.pdf', '확인됨'],
    ['교육 통계', 'Study in Taiwan Key Numbers', 'https://www.studyintaiwan.org/why-taiwan/key-numbers/chart1', '확인됨']
].map(([type, title, url, status]) => ({ type, title, url, status }));

function formatNumber(value) {
    return Number(value).toLocaleString('ko-KR');
}

function statusClass(value) {
    if (value === '공식 수치') return 'official';
    if (value === '부가 정보') return 'limit';
    return 'infer';
}

function statusBadge(label, type = statusClass(label)) {
    return `<span class="status ${type}">${label}</span>`;
}

function renderKpis() {
    document.getElementById('kpiCards').innerHTML = kpis.map(item => `
        <article class="card">
            <div class="kpi-label">${item.label}</div>
            <div class="kpi-value">${item.value}</div>
            <div class="kpi-sub">${item.sub}</div>
            <div class="pill-row">${statusBadge(item.status === 'official' ? '공식 수치' : '추정 체크필요', item.status === 'official' ? 'official' : 'infer')}</div>
        </article>
    `).join('');
}

function renderTable(targetId, columns, rows) {
    const header = columns.map(col => `<th class="${col.num ? 'num' : ''}">${col.label}</th>`).join('');
    const body = rows.map(row => `<tr>${columns.map(col => {
        const value = typeof col.value === 'function' ? col.value(row) : row[col.key];
        return `<td class="${col.num ? 'num' : ''}">${value}</td>`;
    }).join('')}</tr>`).join('');
    document.getElementById(targetId).innerHTML = `<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderTables() {
    renderCityTable(false);

    renderTable('sourceTable', [
        { label: '타입', key: 'type' },
        { label: '제목', key: 'title', value: row => `<a href="${row.url}" target="_blank" rel="noopener">${row.title}</a>` },
        { label: '상태', key: 'status', value: row => statusBadge(row.status, 'official') }
    ], sourceRows);
}

function renderCityTable(showAll) {
    const rows = showAll ? cityRows : cityRows.slice(0, 10);
    renderTable('cityTable', [
        { label: '순위', key: 'rank', num: true },
        { label: '거주지', key: 'city' },
        { label: '한국 국적 외국인', key: 'total', num: true, value: row => formatNumber(row.total) },
        { label: '남', key: 'male', num: true, value: row => formatNumber(row.male) },
        { label: '여', key: 'female', num: true, value: row => formatNumber(row.female) },
        { label: '비중', key: 'share', num: true }
    ], rows);
}

function renderCharts() {
    Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
    Chart.defaults.color = '#66615c';

    const regionLabelsPlugin = {
        id: 'regionLabelsPlugin',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                    const count = regionRows[index].count;
                    const share = regionRows[index].share;
                    ctx.fillStyle = '#171717';
                    ctx.font = 'bold 12px "Noto Sans KR"';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(`${formatNumber(count)}명 (${share})`, bar.x, bar.y - 6);
                });
            });
        }
    };

    new Chart(document.getElementById('regionChart'), {
        type: 'bar',
        data: {
            labels: regionRows.map(row => row.area.split(':')[0]),
            datasets: [{ label: '인원', data: regionRows.map(row => row.count), backgroundColor: [colors.red, colors.blue, colors.teal, colors.gold, colors.gray], borderRadius: 6, barThickness: 45 }]
        },
        options: {
            layout: { padding: { top: 24 } },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        afterLabel: context => regionRows[context.dataIndex].share
                    }
                }
            },
            scales: { 
                y: { ticks: { callback: value => formatNumber(value) }, grid: { drawBorder: false } },
                x: { grid: { display: false }, ticks: { font: { weight: 'bold' }, color: '#171717' } }
            }
        },
        plugins: [regionLabelsPlugin]
    });

    const topCities = cityRows.slice(0, 8);
    
    const cityLabelsPlugin = {
        id: 'cityLabelsPlugin',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                    const count = topCities[index].total;
                    const share = topCities[index].share;
                    ctx.fillStyle = '#171717';
                    ctx.font = 'bold 12px "Noto Sans KR"';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(`${formatNumber(count)}명 (${share})`, bar.x, bar.y - 6);
                });
            });
        }
    };

    new Chart(document.getElementById('cityChart'), {
        type: 'bar',
        data: {
            labels: topCities.map(row => row.city),
            datasets: [{ label: '한국 국적 외국인', data: topCities.map(row => row.total), backgroundColor: [colors.red, colors.blue, colors.teal, colors.gold, colors.green, colors.gray, '#d97706', '#0ea5e9'], borderRadius: 6, barThickness: 35 }]
        },
        options: {
            layout: { padding: { top: 24 } },
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { ticks: { callback: value => formatNumber(value) }, grid: { drawBorder: false } },
                x: { grid: { display: false }, ticks: { font: { weight: 'bold' }, color: '#171717' } }
            }
        },
        plugins: [cityLabelsPlugin]
    });
}

renderKpis();
renderTables();
renderCharts();

document.querySelectorAll('.fold-card .section-title').forEach(title => {
    title.addEventListener('click', () => {
        title.closest('.fold-card').classList.toggle('open');
    });
});

const cityToggle = document.getElementById('toggleCityRows');
if (cityToggle) {
    let cityRowsExpanded = false;
    cityToggle.addEventListener('click', event => {
        event.stopPropagation();
        cityRowsExpanded = !cityRowsExpanded;
        renderCityTable(cityRowsExpanded);
        cityToggle.textContent = cityRowsExpanded ? '상위 10개만 보기' : '전체 거주지 펼치기';
    });
}
