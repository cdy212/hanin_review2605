const fs = require('fs');

const htmlPath = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/erd.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const schema = JSON.parse(fs.readFileSync('c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/scratch/schema_dump.json', 'utf8'));
const twone = schema['twone'];

// 1. Extract tables array string from HTML
const tablesRegex = /const tables = \[([\s\S]*?)\];/;
const match = htmlContent.match(tablesRegex);
if (!match) {
    console.error("Could not find tables array in HTML");
    process.exit(1);
}

// Evaluate existing tables array to keep layout and labels
let existingTablesStr = match[0].replace('const tables = ', '').replace(/;$/, '');

// A safer way to parse the existing tables is using eval or Function
let existingTables = [];
try {
    existingTables = new Function('return ' + existingTablesStr)();
} catch (e) {
    console.error("Error parsing existing tables:", e);
    process.exit(1);
}

// 2. Update existing tables and find new tables
let newTables = [];
let existingTableIds = existingTables.map(t => t.id);

// We will keep track of layout coords
let maxX = 80;
let maxY = 90;

for (let t of existingTables) {
    if (t.x > maxX) maxX = t.x;
    if (t.y > maxY) maxY = t.y;
    
    const liveTable = twone[t.id];
    if (liveTable) {
        // Update fields
        let fields = [];
        for (const col of liveTable) {
            let key = '';
            let pk = false, fk = false, uq = false;
            
            if (col.Key === 'PRI') { key = 'PK'; pk = true; }
            else if (col.Key === 'MUL') { key = 'FK'; fk = true; }
            else if (col.Key === 'UNI') { key = 'UQ'; uq = true; }
            
            let type = col.Type.toUpperCase();
            let nn = col.Null === 'NO';
            
            fields.push({
                key: key,
                name: col.Field,
                type: type,
                pk: pk,
                fk: fk,
                uq: uq,
                nn: nn
            });
        }
        t.fields = fields;
    }
}

// Find brand new tables
for (const tableName in twone) {
    if (!existingTableIds.includes(tableName)) {
        const liveTable = twone[tableName];
        
        let fields = [];
        for (const col of liveTable) {
            let key = '';
            let pk = false, fk = false, uq = false;
            
            if (col.Key === 'PRI') { key = 'PK'; pk = true; }
            else if (col.Key === 'MUL') { key = 'FK'; fk = true; }
            else if (col.Key === 'UNI') { key = 'UQ'; uq = true; }
            
            let type = col.Type.toUpperCase();
            let nn = col.Null === 'NO';
            
            fields.push({
                key: key,
                name: col.Field,
                type: type,
                pk: pk,
                fk: fk,
                uq: uq,
                nn: nn
            });
        }
        
        // Auto position new tables
        maxX += 300;
        if (maxX > 1500) {
            maxX = 80;
            maxY += 350;
        }
        
        let theme = 'gray', tag = 'NEW';
        if (tableName.includes('user')) { theme = 'blue'; tag = 'USER'; }
        else if (tableName.includes('region') || tableName.includes('geo')) { theme = 'green'; tag = 'GEO'; }
        else if (tableName.includes('post') || tableName.includes('board') || tableName.includes('notice')) { theme = 'orange'; tag = 'POST'; }
        
        newTables.push({
            id: tableName,
            name: tableName,
            label: tableName + ' (New)',
            theme: theme,
            tag: tag,
            x: maxX,
            y: maxY,
            fields: fields
        });
    }
}

const mergedTables = existingTables.concat(newTables);

// Generate formatted string
let newTablesStr = "const tables = [\n";
for (const t of mergedTables) {
    newTablesStr += "  {\n";
    newTablesStr += `    id: '${t.id}', name: '${t.name}', label: '${t.label}',\n`;
    newTablesStr += `    theme: '${t.theme}', tag: '${t.tag}', x: ${t.x}, y: ${t.y},\n`;
    newTablesStr += `    fields: [\n`;
    for (const f of t.fields) {
        newTablesStr += `      { key: '${f.key}', name: '${f.name}', type: '${f.type}', pk: ${f.pk ? 'true' : 'false'}, fk: ${f.fk ? 'true' : 'false'}, uq: ${f.uq ? 'true' : 'false'}, nn: ${f.nn ? 'true' : 'false'} },\n`;
    }
    newTablesStr += `    ]\n`;
    newTablesStr += "  },\n";
}
newTablesStr += "];";

const updatedHtml = htmlContent.replace(tablesRegex, newTablesStr);
fs.writeFileSync(htmlPath, updatedHtml, 'utf8');

console.log("Merged schema successfully! Total tables: " + mergedTables.length);
