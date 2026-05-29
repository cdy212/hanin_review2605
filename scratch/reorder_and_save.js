const fs = require('fs');

const htmlPath = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/erd.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// --- 1. Re-layout Tables ---
const extractArray = (regex) => {
    const match = htmlContent.match(regex);
    if (!match) return [];
    let str = match[0].replace(/const \w+ = /, '').replace(/;$/, '');
    return new Function('return ' + str)();
};

let tables = extractArray(/const tables = \[([\s\S]*?)\];/);

// Group tables by tag/theme for layout
let layoutGrid = {
    'USER': { x: 80, y: 90, dx: 320, dy: 250, count: 0 },
    'POST': { x: 500, y: 90, dx: 320, dy: 250, count: 0 },
    'GEO':  { x: 80, y: 700, dx: 320, dy: 250, count: 0 },
    'COUPON': { x: 500, y: 700, dx: 320, dy: 250, count: 0 },
    'UTIL': { x: 920, y: 90, dx: 320, dy: 250, count: 0 },
    'NEW':  { x: 920, y: 400, dx: 320, dy: 250, count: 0 }
};

for (let t of tables) {
    let grid = layoutGrid[t.tag] || layoutGrid['NEW'];
    let row = Math.floor(grid.count / 2); // 2 tables per row max for a group
    let col = grid.count % 2;
    
    // adjust logic to pack tighter vertically for many tables
    if (t.tag === 'POST' || t.tag === 'USER') {
        row = Math.floor(grid.count / 1); // 1 column for some groups looks better if they have long lists
        col = 0;
    }
    
    t.x = grid.x + (col * grid.dx);
    t.y = grid.y + (row * grid.dy);
    grid.count++;
}

const stringifyArray = (arr, varName) => {
    let str = `const ${varName} = [\n`;
    for (let item of arr) {
        str += '  ' + JSON.stringify(item) + ',\n';
    }
    str += '];';
    return str;
};

htmlContent = htmlContent.replace(/const tables = \[([\s\S]*?)\];/, stringifyArray(tables, 'tables'));

// --- 2. Add LocalStorage logic ---

// Inject load script before rendering tables
const loadLogic = `
    /* Load saved positions from localStorage */
    const savedPos = JSON.parse(localStorage.getItem('erd_positions') || '{}');
    tables.forEach(t => {
        if (savedPos[t.id]) {
            t.x = savedPos[t.id].x;
            t.y = savedPos[t.id].y;
        }
    });
`;

if (!htmlContent.includes("localStorage.getItem('erd_positions')")) {
    htmlContent = htmlContent.replace('tables.forEach(t => {', loadLogic + '\n    tables.forEach(t => {');
}

// Inject save function and hook it
const saveLogic = `
    function savePositions() {
        const pos = {};
        tables.forEach(t => {
            const el = document.getElementById('tbl-' + t.id);
            if (el) {
                pos[t.id] = {
                    x: parseInt(el.style.left) || 0,
                    y: parseInt(el.style.top) || 0
                };
            }
        });
        localStorage.setItem('erd_positions', JSON.stringify(pos));
    }
`;

if (!htmlContent.includes("function savePositions()")) {
    htmlContent = htmlContent.replace('/* ═══════════════════════════════════════════════════════\n       DRAG\n    ═══════════════════════════════════════════════════════ */', 
        '/* ═══════════════════════════════════════════════════════\n       DRAG\n    ═══════════════════════════════════════════════════════ */\n' + saveLogic);
}

// Add savePositions() to mouseup events
// For makeDraggable
htmlContent = htmlContent.replace(/if \(drag\) \{ drag = false; el\.style\.zIndex = 3; \}/g, 'if (drag) { drag = false; el.style.zIndex = 3; savePositions(); }');

// For makeGroupDraggable
htmlContent = htmlContent.replace(/if \(drag\) \{ \n            drag = false; \n            initialPositions.forEach\(item => \{ item.el.style.zIndex = 3; \}\);\n        \}/g, 
    'if (drag) { \n            drag = false; \n            initialPositions.forEach(item => { item.el.style.zIndex = 3; });\n            savePositions();\n        }');


fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log("Updated ERD with layout and localStorage.");
