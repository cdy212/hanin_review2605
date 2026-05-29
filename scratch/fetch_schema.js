const mysql = require('mysql2/promise');
const fs = require('fs');

async function getSchema() {
    console.log("Connecting to database...");
    try {
        const connection = await mysql.createConnection({
            host: '10.5.11.176',
            user: 'korea',
            password: 'koreataiwan1379!',
            port: 13306,
            connectTimeout: 5000
        });
        
        console.log("Connected successfully!");
        const [dbs] = await connection.query('SHOW DATABASES');
        const userDbs = dbs.map(d => d.Database).filter(db => !['information_schema', 'mysql', 'performance_schema', 'sys'].includes(db));
        
        console.log("User databases:", userDbs);
        
        let schemaData = {};
        
        for (const db of userDbs) {
            await connection.query(`USE \`${db}\``);
            const [tables] = await connection.query('SHOW TABLES');
            schemaData[db] = {};
            
            for (const t of tables) {
                const tableName = Object.values(t)[0];
                const [columns] = await connection.query(`SHOW FULL COLUMNS FROM \`${tableName}\``);
                schemaData[db][tableName] = columns;
            }
        }
        
        await connection.end();
        
        fs.writeFileSync('schema_dump.json', JSON.stringify(schemaData, null, 2));
        console.log("Schema dumped to schema_dump.json");
    } catch (err) {
        console.error("Database connection/query error:");
        console.error(err);
    }
}

getSchema();
