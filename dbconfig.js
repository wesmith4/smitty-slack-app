if (!(process.env.NODE_ENV === 'production')) {
    require('dotenv').config()
}
const { Client } = require('pg')
const notion = require('./lib/notion/notion')
const getNewDBClient = () => {
    return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
}

const createNotionDatabaseTable = async () => {
    let client = getNewDBClient()
    client.connect()
    try {
        let results = await client.query(
            `CREATE TABLE IF NOT EXISTS notion_databases (
        id SERIAL PRIMARY KEY,
        notion_database_id VARCHAR(255) UNIQUE NOT NULL,
        title TEXT,
        created_on TIMESTAMP NOT NULL
      );`
        )
        client.end()
    } catch (err) {
        client.end()
        throw err
    }
}

const addNotionDatabase = async (database_id) => {
    let client = getNewDBClient()
    client.connect()
    try {
        const dbInfo = await notion.getDatabaseInfo(database_id)
        let dbName = dbInfo.title[0].plain_text
        let results = await client.query(
            `INSERT INTO notion_databases (notion_database_id, title, created_on) VALUES ('${database_id}', '${dbName}', CURRENT_TIMESTAMP)`
        )
        client.end()
    } catch (err) {
        client.end()
        throw err
    }
}

const updateNotionDatabase = async (database_id) => {
    let client = getNewDBClient()
    client.connect()
    try {
        const dbInfo = await notion.getDatabaseInfo(database_id)
        let dbName = dbInfo.title[0].plain_text
        let results = await client.query(
            `UPDATE notion_databases SET title = '${dbName}' WHERE notion_database_id = '${database_id}'`
        )
        client.end()
    } catch (err) {
        client.end()
        throw err
    }
}

const getAvailableNotionDatabases = async () => {
    let client = getNewDBClient()
    client.connect()
    try {
        let results = await client.query(
            `SELECT * FROM notion_databases WHERE title IS NOT NULL`
        )
        client.end()
        let dbOptions = results.rows.map((row) => {
            return {
                text: {
                    type: 'plain_text',
                    text: `${row.title}`,
                },
                value: row.notion_database_id,
            }
        })
        console.log(dbOptions)
        return dbOptions
    } catch (err) {
        client.end()
        throw err
    }
}

// createNotionDatabaseTable()
// addNotionDatabase(process.env.NOTION_DATABASE_ID)
getAvailableNotionDatabases()

module.exports = {
    createNotionDatabaseTable,
    addNotionDatabase,
    getAvailableNotionDatabases,
    updateNotionDatabase,
}
