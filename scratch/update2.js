const fs = require('fs');
const path = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/260519_review.html';
let content = fs.readFileSync(path, 'utf8');

const newJS = `
        function updateProgress(type) {
            const tasks = document.querySelectorAll('.task-' + type);
            
            // 변경된 상태를 localStorage에 저장
            const states = [];
            tasks.forEach(task => {
                const val = task.value;
                states.push(val);
                
                // 디자인 처리
                const span = task.nextElementSibling;
                const container = task.closest('.flex');
                
                if (type === 'pm') {
                    if (val === 'done') {
                        span.className = "text-xs text-slate-400 font-bold line-through mt-0.5 transition-all";
                        container.style.opacity = "0.5";
                    } else if (val === 'progress') {
                        span.className = "text-xs text-indigo-700 font-extrabold bg-indigo-100 px-1.5 py-0.5 rounded mt-0.5 transition-all shadow-sm";
                        container.style.opacity = "1";
                    } else {
                        span.className = "text-xs text-slate-800 font-bold mt-0.5 transition-all";
                        container.style.opacity = "1";
                    }
                } else { // dev
                    if (val === 'done') {
                        span.className = "text-[11px] text-slate-400 font-medium line-through mt-0.5 transition-all";
                        container.style.opacity = "0.5";
                    } else if (val === 'progress') {
                        span.className = "text-[11px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded mt-0.5 transition-all shadow-sm";
                        container.style.opacity = "1";
                    } else {
                        span.className = "text-[11px] text-slate-600 font-medium mt-0.5 transition-all";
                        container.style.opacity = "1";
                    }
                }
                
                // 정렬을 위한 순서 데이터 부여
                if (val === 'progress') container.setAttribute('data-order', '1');
                else if (val === 'none') container.setAttribute('data-order', '2');
                else if (val === 'done') container.setAttribute('data-order', '3');
            });

            localStorage.setItem('tasks_' + type, JSON.stringify(states));

            // 카운트 업데이트
            const progress = states.filter(v => v === 'progress').length;
            const completed = states.filter(v => v === 'done').length;
            const none = states.filter(v => v === 'none').length;
            const countSpan = document.getElementById('count-' + type);

            if (type === 'pm') {
                countSpan.innerHTML = '<span class="text-slate-500">대기 ' + none + '</span> <span class="mx-1 font-normal text-slate-300">|</span> <span class="text-indigo-600">진행중 ' + progress + '</span> <span class="mx-1 font-normal text-slate-300">|</span> <span class="text-indigo-900">완료 ' + completed + '</span>';
                countSpan.className = "text-[11px] bg-white px-2.5 py-1.5 rounded-md font-bold border border-indigo-200 shadow-sm";
            } else if (type === 'dev') {
                countSpan.innerHTML = '<span class="text-slate-500">대기 ' + none + '</span> <span class="mx-1 font-normal text-slate-300">|</span> <span class="text-emerald-600">진행중 ' + progress + '</span> <span class="mx-1 font-normal text-slate-300">|</span> <span class="text-emerald-900">완료 ' + completed + '</span>';
                countSpan.className = "text-[11px] bg-white px-2.5 py-1.5 rounded-md font-bold border border-emerald-200 shadow-sm";
            }

            // 정렬 처리 (DOM 요소 재배치)
            const parentSet = new Set();
            tasks.forEach(t => parentSet.add(t.closest('.flex').parentElement));
            
            parentSet.forEach(parent => {
                const items = Array.from(parent.querySelectorAll(':scope > .flex'));
                items.sort((a, b) => {
                    const orderA = parseInt(a.getAttribute('data-order') || '2');
                    const orderB = parseInt(b.getAttribute('data-order') || '2');
                    return orderA - orderB;
                });
                items.forEach(item => parent.appendChild(item));
            });
        }

        window.onload = function () {
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
                                // 호환성 처리
                                if (val === true) val = 'done';
                                else if (val === false) val = 'none';
                                task.value = val;
                            }
                        });
                    } catch(e) {}
                }
                updateProgress(type);
            });
        }`;

content = content.replace(/function updateProgress\(type\) \{[\s\S]*\}\s*<\/script>/, newJS + '\n    </script>');

fs.writeFileSync(path, content, 'utf8');
console.log("File updated successfully.");
