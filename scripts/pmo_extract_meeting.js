const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const meetingDir = path.join(rootDir, 'cowork_plan', '회의');
const pmoDir = path.join(rootDir, 'pmo');

const statusScores = {
  Backlog: 0,
  Ready: 20,
  'In Progress': 45,
  Review: 65,
  QA: 80,
  Done: 100,
  Blocked: 10,
  'Need Decision': 10
};

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function writeDataBundle({ state, applyPlan, reviewPlan, meetings }) {
  const bundlePath = path.join(pmoDir, 'pmo_data.js');
  const payload = [
    `window.PMO_STATE = ${JSON.stringify(state, null, 2)};`,
    `window.PMO_APPLY_PLAN = ${JSON.stringify(applyPlan, null, 2)};`,
    `window.PMO_REVIEW_PLAN = ${JSON.stringify(reviewPlan, null, 2)};`,
    `window.PMO_MEETINGS = ${JSON.stringify(meetings, null, 2)};`
  ].join('\n\n');

  fs.mkdirSync(path.dirname(bundlePath), { recursive: true });
  fs.writeFileSync(bundlePath, `${payload}\n`, 'utf8');
}

function listMeetings() {
  if (!fs.existsSync(meetingDir)) return [];
  return fs.readdirSync(meetingDir)
    .filter(file => /\.md$/i.test(file))
    .sort()
    .reverse();
}

function titleFromMeeting(file, text) {
  const firstLine = text.split(/\r?\n/).find(line => line.trim());
  return firstLine ? firstLine.trim() : file.replace(/\.md$/i, '');
}

function deriveDate(file) {
  const match = file.match(/(\d{2})(\d{2})(\d{2})/);
  if (!match) return '';
  return `20${match[1]}-${match[2]}-${match[3]}`;
}

function updateMeetingIndex(files) {
  const meetings = files.map(file => {
    const text = fs.readFileSync(path.join(meetingDir, file), 'utf8');
    return {
      file,
      title: titleFromMeeting(file, text),
      date: deriveDate(file),
      content: text
    };
  });
  writeJson(
    path.join(meetingDir, 'meetings.json'),
    meetings.map(({ content, ...meeting }) => meeting)
  );
  return meetings;
}

function extractDecisionLines(text) {
  return text.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.includes('[결정 필요 사안]'));
}

function extractCheckLines(text) {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const start = lines.findIndex(line => line.includes('확인 필요 사안'));
  if (start === -1) return [];
  return lines.slice(start + 1).filter(line => !/^\d+\./.test(line));
}

function buildState(existingState, meetingFiles, latestText) {
  const decisionLines = extractDecisionLines(latestText);
  const checkLines = extractCheckLines(latestText);
  const decisionCount = decisionLines.length || existingState.decisions.length;
  const checkCount = checkLines.length || 4;
  const hasOpinionMeeting = meetingFiles.some(file => file.includes('한인회'));
  const chips = [
    { label: `결정 필요 ${decisionCount}건`, tone: 'urgent' },
    { label: `확인 필요 ${checkCount}건` },
    { label: existingState.kpis[0]?.value ? `진행률 ${existingState.kpis[0].value}` : '진행률 확인 필요' }
  ];

  if (hasOpinionMeeting) {
    chips.push({ label: '한인회 의견 검토 필요', tone: 'urgent' });
  }

  chips.push({ label: '승인 전 초안' });

  const state = {
    ...existingState,
    meta: {
      ...existingState.meta,
      chips,
      approvalState: 'draft',
      lastGeneratedAt: new Date().toISOString()
    },
    meetingDirectoryUrl: 'cowork_plan/회의/',
    meetingIndexUrl: 'cowork_plan/회의/meetings.json',
    reviewPlanUrl: existingState.reviewPlanUrl || 'pmo/review_plan_260515.json'
  };
  return state;
}

function buildApplyPlan(existingPlan, state, latestMeetingFile) {
  const existingItemsById = new Map((existingPlan.items || []).map(item => [item.id, item]));
  const items = state.todos
    .filter(todo => todo.targetRepo && todo.targetRepo !== 'review')
    .map(todo => {
      const existing = existingItemsById.get(todo.id) || {};
      return {
        id: todo.id,
        sourceMeeting: existing.sourceMeeting || latestMeetingFile || 'auto',
        title: existing.title || `[${todo.p}][${todo.targetRepo.toUpperCase()}] ${todo.title}`,
        targetRepo: todo.targetRepo,
        priority: todo.p,
        type: 'todo',
        owner: todo.owner,
        status: existing.status || 'draft',
        body: todo.body,
        acceptanceCriteria: existing.acceptanceCriteria || []
      };
    });

  return {
    ...existingPlan,
    approvalState: existingPlan.reviewGate?.status === 'pending'
      ? 'blocked_pending_review'
      : 'draft',
    reviewGate: existingPlan.reviewGate,
    items
  };
}

function main() {
  const meetingFiles = listMeetings();
  const meetingRecords = updateMeetingIndex(meetingFiles);

  const statePath = path.join(pmoDir, 'state.json');
  const applyPath = path.join(pmoDir, 'apply_plan.json');
  const reviewPlanPath = path.join(pmoDir, 'review_plan_260515.json');
  const state = readJson(statePath, {});
  const applyPlan = readJson(applyPath, {});
  const reviewPlan = readJson(reviewPlanPath, null);
  const latestText = meetingFiles[0]
    ? fs.readFileSync(path.join(meetingDir, meetingFiles[0]), 'utf8')
    : '';

  const nextState = buildState(state, meetingFiles, latestText);
  const nextApplyPlan = buildApplyPlan(applyPlan, nextState, meetingFiles[0]);

  writeJson(statePath, nextState);
  writeJson(applyPath, nextApplyPlan);
  writeDataBundle({
    state: nextState,
    applyPlan: nextApplyPlan,
    reviewPlan,
    meetings: meetingRecords
  });

  console.log(`PMO updated: ${meetingFiles.length} meeting file(s), ${nextApplyPlan.items.length} apply item(s).`);
  console.log('Data bundle: pmo/pmo_data.js');
  console.log(`Progress scoring: ${JSON.stringify(statusScores)}`);
}

main();
