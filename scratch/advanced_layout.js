const fs = require('fs');

const htmlPath = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/erd.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract tables and relations
const extractArray = (regex) => {
    const match = htmlContent.match(regex);
    if (!match) return [];
    let str = match[0].replace(/const \w+ = /, '').replace(/;$/, '');
    return new Function('return ' + str)();
};

let tables = extractArray(/const tables = \[([\s\S]*?)\];/);
let relations = extractArray(/const relations = \[([\s\S]*?)\];/);

// 1. Calculate degrees (relationships)
let degreeMap = {};
tables.forEach(t => degreeMap[t.id] = 0);
relations.forEach(r => {
    if (degreeMap[r.from] !== undefined) degreeMap[r.from]++;
    if (degreeMap[r.to] !== undefined) degreeMap[r.to]++;
});

// 2. Grouping
let groupsMap = {};
tables.forEach(t => {
    let g = t.tag || 'NEW';
    if (!groupsMap[g]) groupsMap[g] = [];
    groupsMap[g].push(t);
});

// Find the most important table in each group
let groupScores = {};
for (let g in groupsMap) {
    groupsMap[g].sort((a, b) => degreeMap[b.id] - degreeMap[a.id]); // Sort by degree desc
    groupScores[g] = groupsMap[g].reduce((sum, t) => sum + degreeMap[t.id], 0);
}

// Find main group
let mainGroup = Object.keys(groupScores).sort((a, b) => groupScores[b] - groupScores[a])[0];

// 3. Layout constants
const TABLE_W = 280;
const TABLE_H = 250;
const GROUP_PADDING = 150;

// 4. Layout logic
let groupBounds = {}; // to store w, h of each group

for (let g in groupsMap) {
    let groupTables = groupsMap[g];
    let num = groupTables.length;
    
    // Within group: center the most important, others around it in a circle or simple grid
    // For simplicity: grid layout with important one at top-left, or circular
    // Since tables are rectangular, a grid is safer to prevent overlaps.
    
    let cols = Math.ceil(Math.sqrt(num));
    let rows = Math.ceil(num / cols);
    
    // The first table (most important) gets 0,0
    groupTables.forEach((t, i) => {
        let r = Math.floor(i / cols);
        let c = i % cols;
        // Centralize logic: if there's only 1 important, put it in middle? 
        // A simple grid is fine.
        t.gx = c * TABLE_W;
        t.gy = r * TABLE_H;
    });
    
    groupBounds[g] = {
        w: cols * TABLE_W,
        h: rows * TABLE_H
    };
}

// Layout groups globally
let gKeys = Object.keys(groupsMap).filter(k => k !== mainGroup);

// Place main group at center
let cx = 1500;
let cy = 1000;
let mainBounds = groupBounds[mainGroup];

groupsMap[mainGroup].forEach(t => {
    t.x = cx - (mainBounds.w/2) + t.gx;
    t.y = cy - (mainBounds.h/2) + t.gy;
});

// Place other groups in a circle around the main group
let radius = Math.max(mainBounds.w, mainBounds.h) / 2 + GROUP_PADDING + 400; 
let angleStep = (2 * Math.PI) / gKeys.length;

gKeys.forEach((g, i) => {
    let angle = i * angleStep;
    let gx = cx + radius * Math.cos(angle);
    let gy = cy + radius * Math.sin(angle);
    
    let bounds = groupBounds[g];
    groupsMap[g].forEach(t => {
        t.x = Math.round(gx - (bounds.w/2) + t.gx);
        t.y = Math.round(gy - (bounds.h/2) + t.gy);
    });
});

// 5. Update HTML
const stringifyArray = (arr, varName) => {
    let str = `const ${varName} = [\n`;
    for (let item of arr) {
        str += '  ' + JSON.stringify(item) + ',\n';
    }
    str += '];';
    return str;
};

htmlContent = htmlContent.replace(/const tables = \[([\s\S]*?)\];/, stringifyArray(tables, 'tables'));

// 6. Add a "Reset Layout" button to the UI so user can clear localStorage
if (!htmlContent.includes('id="resetLayout"')) {
    htmlContent = htmlContent.replace('<button class="ctrl-btn" id="resetView" title="초기화">⊙</button>',
        '<button class="ctrl-btn" id="resetView" title="초기화">⊙</button>\n    <button class="ctrl-btn" id="resetLayout" title="레이아웃 초기화" style="font-size:14px; margin-top:15px;">⟲</button>');
        
    const resetScript = `
    document.getElementById('resetLayout').addEventListener('click', () => {
        if(confirm('저장된 테이블 위치를 초기화하고 자동 배치로 되돌리시겠습니까?')) {
            localStorage.removeItem('erd_positions');
            location.reload();
        }
    });
`;
    htmlContent = htmlContent.replace("document.getElementById('resetView').addEventListener('click', () => { scale = 0.72; panX = 50; panY = 28; applyTransform(); });",
        "document.getElementById('resetView').addEventListener('click', () => { scale = 0.72; panX = 50; panY = 28; applyTransform(); });\n" + resetScript);
}

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log("Updated layout with smart positioning and added Reset Layout button.");
