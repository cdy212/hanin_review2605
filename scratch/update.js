const fs = require('fs');

const path = 'c:\\\\Users\\\\dante\\\\Desktop\\\\2026_new_project\\\\대표님\\\\한인회리뷰_260526\\\\260519_review.html';
let content = fs.readFileSync(path, 'utf8');

// Replace PM tasks
content = content.replace(
    /<label[\s\S]*?class="[^"]*task-pm[\s\S]*?<\/label>/g,
    function(match) {
        // extract text
        const textMatch = match.match(/<span[^>]*>([\s\S]*?)<\/span>/);
        const text = textMatch ? textMatch[1].trim() : '';
        return `<div class="flex items-start space-x-3 p-2 rounded hover:bg-white transition">
                                    <select onchange="updateProgress('pm')" class="task-pm shrink-0 mt-0.5 text-[11px] py-0.5 px-1 border border-indigo-200 rounded text-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer bg-white">
                                        <option value="none">대기</option>
                                        <option value="progress">진행중</option>
                                        <option value="done">완료</option>
                                    </select>
                                    <span class="text-xs text-slate-800 font-bold mt-0.5">${text}</span>
                                </div>`;
    }
);

// Replace Dev tasks
content = content.replace(
    /<label[\s\S]*?class="[^"]*task-dev[\s\S]*?<\/label>/g,
    function(match) {
        const textMatch = match.match(/<span[^>]*>([\s\S]*?)<\/span>/);
        const text = textMatch ? textMatch[1].trim() : '';
        return `<div class="flex items-start space-x-3 p-1.5 rounded hover:bg-slate-50 transition">
                                        <select onchange="updateProgress('dev')" class="task-dev shrink-0 mt-0.5 text-[10px] py-0.5 px-1 border border-slate-300 rounded text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer bg-white">
                                            <option value="none">대기</option>
                                            <option value="progress">진행중</option>
                                            <option value="done">완료</option>
                                        </select>
                                        <span class="text-[11px] text-slate-600 font-medium mt-0.5">${text}</span>
                                    </div>`;
    }
);

// Add Web Push item
const webPushHTML = `
                            <!-- [ 푸시 / 알림 ] -->
                            <div>
                                <h4
                                    class="text-[11px] font-bold text-slate-500 mb-1 border-b border-slate-100 pb-1 flex items-center">
                                    <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5"></span> [ 푸시 / 알림 ]</h4>
                                <div class="space-y-1 pl-1">
                                    <div class="flex items-start space-x-3 p-1.5 rounded hover:bg-slate-50 transition">
                                        <select onchange="updateProgress('dev')" class="task-dev shrink-0 mt-0.5 text-[10px] py-0.5 px-1 border border-slate-300 rounded text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer bg-white">
                                            <option value="none">대기</option>
                                            <option value="progress">진행중</option>
                                            <option value="done">완료</option>
                                        </select>
                                        <span class="text-[11px] text-slate-600 font-medium mt-0.5">[웹 푸시] Web Push 알림 도입 검토 (※ iOS는 보안 이슈로 웹앱을 수동 설치해야 지원 가능)</span>
                                    </div>
                                </div>
                            </div>
`;

// Insert Web Push after 어드민 block
content = content.replace(
    /<!-- \[ 어드민 \] -->[\s\S]*?<\/div>\n                            <\/div>/,
    match => match + "\n" + webPushHTML
);

// Update JavaScript logic for updateProgress
content = content.replace(
    /function updateProgress\(type\) \{[\s\S]*?\}\s*\n\s*\/\/\s*Initialize counts/g,
    `function updateProgress(type) {
            const tasks = document.querySelectorAll('.task-' + type);
            
            // 변경된 상태를 localStorage에 저장
            const states = [];
            tasks.forEach(task => states.push(task.value));
            localStorage.setItem('tasks_' + type, JSON.stringify(states));

            const progress = states.filter(v => v === 'progress').length;
            const completed = states.filter(v => v === 'done').length;
            const countSpan = document.getElementById('count-' + type);

            if (type === 'pm') {
                countSpan.textContent = \`진행중 \${progress} · 완료 \${completed} / \${tasks.length}\`;
                if (completed === tasks.length) {
                    countSpan.className = "text-[11px] bg-indigo-100 text-indigo-800 px-2 rounded-full font-bold animate-pulse";
                } else {
                    countSpan.className = "text-[11px] bg-indigo-50 text-indigo-700 px-2 rounded-full font-semibold";
                }
            } else if (type === 'dev') {
                countSpan.textContent = \`진행중 \${progress} · 완료 \${completed} / \${tasks.length}\`;
                if (completed === tasks.length) {
                    countSpan.className = "text-[11px] bg-emerald-100 text-emerald-800 px-2 rounded-full font-bold animate-pulse";
                } else {
                    countSpan.className = "text-[11px] bg-emerald-50 text-emerald-700 px-2 rounded-full font-semibold";
                }
            }
        }

        // Initialize counts`
);

// Update JavaScript logic for window.onload
content = content.replace(
    /window\.onload = function \(\) \{[\s\S]*?updateProgress\(type\);\n            \}\);\n        \}/,
    `window.onload = function () {
            // 저장된 체크박스 상태 로드
            ['pm', 'dev'].forEach(type => {
                const saved = localStorage.getItem('tasks_' + type);
                if (saved) {
                    try {
                        const states = JSON.parse(saved);
                        const tasks = document.querySelectorAll('.task-' + type);
                        tasks.forEach((task, index) => {
                            if (index < states.length) {
                                let val = states[index];
                                // 호환성 처리: 기존 true/false 불리언 데이터를 문자열로 변환
                                if (val === true) val = 'done';
                                else if (val === false) val = 'none';
                                task.value = val;
                            }
                        });
                    } catch(e) {}
                }
                updateProgress(type);
            });
        }`
);

fs.writeFileSync(path, content, 'utf8');
console.log("File updated successfully.");
