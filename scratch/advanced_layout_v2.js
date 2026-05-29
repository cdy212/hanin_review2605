const fs = require('fs');

const htmlPath = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/erd.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// --- 1. Layout logic ---
const extractArray = (regex) => {
    const match = htmlContent.match(regex);
    if (!match) return [];
    let str = match[0].replace(/const \w+ = /, '').replace(/;$/, '');
    return new Function('return ' + str)();
};

let tables = extractArray(/const tables = \[([\s\S]*?)\];/);
let relations = extractArray(/const relations = \[([\s\S]*?)\];/);

let degreeMap = {};
tables.forEach(t => degreeMap[t.id] = 0);
relations.forEach(r => {
    if (degreeMap[r.from] !== undefined) degreeMap[r.from]++;
    if (degreeMap[r.to] !== undefined) degreeMap[r.to]++;
});

let groupsMap = {};
tables.forEach(t => {
    let g = t.tag || 'NEW';
    if (!groupsMap[g]) groupsMap[g] = [];
    groupsMap[g].push(t);
});

let groupScores = {};
for (let g in groupsMap) {
    groupsMap[g].sort((a, b) => degreeMap[b.id] - degreeMap[a.id]); // Sort by degree desc
    groupScores[g] = groupsMap[g].reduce((sum, t) => sum + degreeMap[t.id], 0);
}
let mainGroup = Object.keys(groupScores).sort((a, b) => groupScores[b] - groupScores[a])[0];

const TABLE_W = 340;
const TABLE_H = 300;
const GROUP_PADDING = 150;

// Order: 1:Left, 2:Right, 3:Top, 4:Bottom, 5:TL, 6:TR, 7:BL, 8:BR, etc.
const placementOffsets = [
    [0, 0],   // 0: Center
    [-1, 0],  // 1: Left
    [1, 0],   // 2: Right
    [0, -1],  // 3: Top
    [0, 1],   // 4: Bottom
    [-1, -1], // 5: Top-Left
    [1, -1],  // 6: Top-Right
    [-1, 1],  // 7: Bottom-Left
    [1, 1],   // 8: Bottom-Right
    [-2, 0],  // 9: Far-Left
    [2, 0],   // 10: Far-Right
    [0, -2],  // 11: Far-Top
    [0, 2],   // 12: Far-Bottom
    [-2, -1], [2, -1], [-2, 1], [2, 1]
];

let groupBounds = {};

for (let g in groupsMap) {
    let groupTables = groupsMap[g];
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    
    groupTables.forEach((t, i) => {
        let offset = placementOffsets[i] || [0, 0]; // fallback
        t.gx = offset[0] * TABLE_W;
        t.gy = offset[1] * TABLE_H;
        
        if (t.gx < minX) minX = t.gx;
        if (t.gx > maxX) maxX = t.gx;
        if (t.gy < minY) minY = t.gy;
        if (t.gy > maxY) maxY = t.gy;
    });
    
    groupBounds[g] = {
        minX, maxX, minY, maxY,
        w: (maxX - minX) + TABLE_W,
        h: (maxY - minY) + TABLE_H
    };
}

let cx = 2000;
let cy = 2000;

let gKeys = Object.keys(groupsMap).filter(k => k !== mainGroup);
let mainBounds = groupBounds[mainGroup];

groupsMap[mainGroup].forEach(t => {
    t.x = cx + t.gx - (mainBounds.minX + mainBounds.maxX)/2;
    t.y = cy + t.gy - (mainBounds.minY + mainBounds.maxY)/2;
});

// Calculate radius dynamically based on main group size
let radius = Math.max(mainBounds.w, mainBounds.h) / 2 + GROUP_PADDING + 400;
let angleStep = (2 * Math.PI) / (gKeys.length || 1);

gKeys.forEach((g, i) => {
    let angle = i * angleStep;
    let gx = cx + radius * Math.cos(angle);
    let gy = cy + radius * Math.sin(angle);
    
    let bounds = groupBounds[g];
    groupsMap[g].forEach(t => {
        t.x = Math.round(gx + t.gx - (bounds.minX + bounds.maxX)/2);
        t.y = Math.round(gy + t.gy - (bounds.minY + bounds.maxY)/2);
    });
});

const stringifyArray = (arr, varName) => {
    let str = `const ${varName} = [\n`;
    for (let item of arr) {
        str += '  ' + JSON.stringify(item) + ',\n';
    }
    str += '];';
    return str;
};

htmlContent = htmlContent.replace(/const tables = \[([\s\S]*?)\];/, stringifyArray(tables, 'tables'));


// --- 2. Version Control UI ---
if (!htmlContent.includes('id="versionSelect"')) {
    const versionUI = `
    <div style="margin-top: 10px; display:flex; flex-direction:column; gap:6px;">
        <button class="ctrl-btn" id="manualSave" title="수동 버전 저장" style="font-size:14px; width:40px; height:40px;">💾</button>
        <select id="versionSelect" style="width: 40px; height: 26px; font-size:10px; text-align:center; cursor:pointer;" title="저장된 버전 불러오기">
            <option value="">V</option>
        </select>
    </div>
    `;
    
    // Add UI under reset Layout
    htmlContent = htmlContent.replace(
        '<button class="ctrl-btn" id="resetLayout" title="레이아웃 초기화" style="font-size:14px; margin-top:15px;">⟲</button>',
        '<button class="ctrl-btn" id="resetLayout" title="자동 배치로 초기화 (현재 자동저장 삭제)" style="font-size:14px; margin-top:15px;">⟲</button>' + versionUI
    );
    
    const versionScript = `
    /* Version Control Logic */
    function loadVersions() {
        const select = document.getElementById('versionSelect');
        const versions = JSON.parse(localStorage.getItem('erd_versions') || '{}');
        select.innerHTML = '<option value="">V</option>';
        for(let v in versions) {
            let opt = document.createElement('option');
            opt.value = v;
            opt.textContent = v;
            select.appendChild(opt);
        }
    }
    
    document.getElementById('manualSave').addEventListener('click', () => {
        const vName = prompt('저장할 버전 이름을 입력하세요 (예: v1.0_정리완료)');
        if(!vName) return;
        
        const pos = {};
        tables.forEach(t => {
            const el = document.getElementById('tbl-' + t.id);
            if (el) {
                pos[t.id] = { x: parseInt(el.style.left) || 0, y: parseInt(el.style.top) || 0 };
            }
        });
        
        const versions = JSON.parse(localStorage.getItem('erd_versions') || '{}');
        versions[vName] = pos;
        localStorage.setItem('erd_versions', JSON.stringify(versions));
        alert('[' + vName + '] 버전이 저장되었습니다.');
        loadVersions();
    });
    
    document.getElementById('versionSelect').addEventListener('change', (e) => {
        const vName = e.target.value;
        if(!vName) return;
        if(!confirm('[' + vName + '] 버전을 불러오시겠습니까? 현재 자동 저장된 화면은 덮어씌워집니다.')) {
            e.target.value = '';
            return;
        }
        
        const versions = JSON.parse(localStorage.getItem('erd_versions') || '{}');
        const savedPos = versions[vName];
        if(savedPos) {
            tables.forEach(t => {
                if (savedPos[t.id]) {
                    const el = document.getElementById('tbl-' + t.id);
                    if(el) {
                        el.style.left = savedPos[t.id].x + 'px';
                        el.style.top = savedPos[t.id].y + 'px';
                    }
                }
            });
            updateGroupBounds();
            drawLines();
            savePositions(); // Update auto-save with loaded version
            alert('[' + vName + '] 버전을 성공적으로 불러왔습니다.');
        }
        e.target.value = '';
    });
    
    // Init versions list
    loadVersions();
    `;
    
    htmlContent = htmlContent.replace('</script>', versionScript + '\n  </script>');
}

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log("Updated layout to cross-pattern and added Version Control.");
