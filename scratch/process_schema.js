const fs = require('fs');
const schema = JSON.parse(fs.readFileSync('schema_dump.json', 'utf8'));

const twone = schema['twone'];
let tablesArray = [];
let x = 80, y = 90;

for (const tableName in twone) {
    const columns = twone[tableName];
    
    let fields = [];
    for (const col of columns) {
        let key = '';
        let pk = false, fk = false, uq = false;
        
        if (col.Key === 'PRI') { key = 'PK'; pk = true; }
        else if (col.Key === 'MUL') { key = 'FK'; fk = true; } // simplistic assumption
        else if (col.Key === 'UNI') { key = 'UQ'; uq = true; }
        
        // Extract type cleanly
        let type = col.Type.toUpperCase();
        
        // Is Not Null?
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
    
    // Assign themes arbitrarily or based on name
    let theme = 'gray', tag = 'UTIL';
    if (tableName.includes('user')) { theme = 'blue'; tag = 'USER'; }
    else if (tableName.includes('region')) { theme = 'green'; tag = 'GEO'; }
    else if (tableName.includes('post') || tableName.includes('board')) { theme = 'orange'; tag = 'POST'; }
    
    tablesArray.push({
        id: tableName,
        name: tableName,
        label: tableName, // You might need manual translations here
        theme: theme,
        tag: tag,
        x: x,
        y: y,
        fields: fields
    });
    
    x += 300;
    if (x > 1200) {
        x = 80;
        y += 350;
    }
}

// Write the replacement JS logic to a file
fs.writeFileSync('erd_tables.json', JSON.stringify(tablesArray, null, 2), 'utf8');
console.log("Extracted " + tablesArray.length + " tables.");
