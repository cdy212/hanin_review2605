const mysql = require('mysql2/promise');
const fs = require('fs');

async function getFKs() {
    try {
        const connection = await mysql.createConnection({
            host: '10.5.11.176',
            user: 'korea',
            password: 'koreataiwan1379!',
            database: 'twone',
            port: 13306,
            connectTimeout: 5000
        });
        
        const [rows] = await connection.query(`
            SELECT 
                TABLE_NAME, 
                COLUMN_NAME, 
                REFERENCED_TABLE_NAME, 
                REFERENCED_COLUMN_NAME 
            FROM 
                INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
            WHERE 
                REFERENCED_TABLE_SCHEMA = 'twone'
        `);
        
        fs.writeFileSync('fks_dump.json', JSON.stringify(rows, null, 2));
        console.log("Dumped " + rows.length + " foreign keys.");
        
        await connection.end();
    } catch (err) {
        console.error(err);
    }
}

getFKs();
