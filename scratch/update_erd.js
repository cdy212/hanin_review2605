const fs = require('fs');

const htmlPath = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/erd.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const fks = JSON.parse(fs.readFileSync('c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/scratch/fks_dump.json', 'utf8'));

// 1. Add Coupon Theme CSS to HTML if not present
let newHtml = htmlContent;
if (!newHtml.includes('.theme-pink')) {
    const pinkThemeCSS = `
    /* ── 테마: 쿠폰 그룹 → pink ── */
    .theme-pink .table-header {
      background: #fdf2f8;
      border-bottom-color: #fbcfe8;
    }

    .theme-pink .table-name {
      color: #be185d;
    }

    .theme-pink .table-tag {
      background: #fce7f3;
      color: #db2777;
      border: 1px solid #f9a8d4;
    }
    `;
    // Insert before </style>
    newHtml = newHtml.replace('</style>', pinkThemeCSS + '\n  </style>');
}
if (!newHtml.includes('쿠폰 관리')) {
    const couponLegend = `
    <div class="legend-item">
      <div class="legend-dot" style="background:#db2777;border-radius:50%;"></div> 쿠폰 관리
    </div>`;
    newHtml = newHtml.replace('<div class="legend-item">\n      <div class="legend-dot" style="background:#57606a;border-radius:50%;"></div> 공통\n    </div>', '<div class="legend-item">\n      <div class="legend-dot" style="background:#57606a;border-radius:50%;"></div> 공통\n    </div>' + couponLegend);
}


// 2. Parse existing tables, groups, relations
const extractArray = (regex) => {
    const match = newHtml.match(regex);
    if (!match) return [];
    let str = match[0].replace(/const \w+ = /, '').replace(/;$/, '');
    return new Function('return ' + str)();
};

let tables = extractArray(/const tables = \[([\s\S]*?)\];/);
let groups = extractArray(/const groups = \[([\s\S]*?)\];/);
let relations = extractArray(/const relations = \[([\s\S]*?)\];/);

// 3. Find coupon tables and update theme
let couponTables = [];
for (let t of tables) {
    if (t.name.toLowerCase().includes('coupon')) {
        t.theme = 'pink';
        t.tag = 'COUPON';
        couponTables.push(t.name);
    }
}

// Add coupon group
if (!groups.find(g => g.id === 'coupon')) {
    groups.push({
        id: 'coupon',
        name: '쿠폰 관리',
        nameEn: 'Coupon Management',
        color: '#db2777',
        bgColor: 'rgba(219,39,119,0.045)',
        borderColor: 'rgba(219,39,119,0.25)',
        barColor: '#db2777',
        members: couponTables
    });
} else {
    groups.find(g => g.id === 'coupon').members = couponTables;
}

// 4. Update Relations
// Keep existing explicit relations or rebuild from scratch?
// Let's rebuild all based on FKs, plus any self-relations.
let newRelations = [];
let addedRelations = new Set();

for (let fk of fks) {
    // Only if both tables exist in our ERD
    const fromTable = tables.find(t => t.name === fk.TABLE_NAME);
    const toTable = tables.find(t => t.name === fk.REFERENCED_TABLE_NAME);
    if (fromTable && toTable) {
        let type = 'many-one';
        let label = 'N:1';
        
        // If the FK column is also a PK, it's 1:1. If it's a junction table (e.g., both cols are PK/FK), it's M:N
        // But for simplicity, we just draw N:1 and let the graph show it.
        // Let's check if the table name implies a Many-to-Many junction (e.g. user_roles)
        if (fromTable.name.includes('_') && fromTable.fields.length <= 4) {
             // likely M:N join table
             // we still draw N:1 from the join table to the parent tables.
        }
        
        // self reference
        if (fk.TABLE_NAME === fk.REFERENCED_TABLE_NAME) {
            type = 'self';
            label = 'self';
        }

        const key = `${fk.TABLE_NAME}->${fk.REFERENCED_TABLE_NAME}`;
        if (!addedRelations.has(key)) {
            newRelations.push({
                from: fk.TABLE_NAME,
                to: fk.REFERENCED_TABLE_NAME,
                type: type,
                label: label
            });
            addedRelations.add(key);
        }
    }
}

// Ensure old relations not found in DB FKs are kept? Let's just keep them all and merge.
for (let r of relations) {
    const key = `${r.from}->${r.to}`;
    if (!addedRelations.has(key)) {
        newRelations.push(r);
        addedRelations.add(key);
    }
}

// Output back
const stringifyArray = (arr, varName) => {
    let str = `const ${varName} = [\n`;
    for (let item of arr) {
        str += '  ' + JSON.stringify(item) + ',\n';
    }
    str += '];';
    // Clean up quotes on keys for readability if desired, but JSON stringify works.
    return str;
};

newHtml = newHtml.replace(/const groups = \[([\s\S]*?)\];/, stringifyArray(groups, 'groups'));
newHtml = newHtml.replace(/const tables = \[([\s\S]*?)\];/, stringifyArray(tables, 'tables'));
newHtml = newHtml.replace(/const relations = \[([\s\S]*?)\];/, stringifyArray(newRelations, 'relations'));

fs.writeFileSync(htmlPath, newHtml, 'utf8');
console.log("Updated ERD with coupon group and " + newRelations.length + " relations.");
