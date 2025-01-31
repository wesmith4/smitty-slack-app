if (!(process.env.NODE_ENV === 'production')) {
    require('dotenv').config()
}
const { Client } = require('@notionhq/client')
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})
const { newDatabasePageObject } = require('./notion-block-utils')

const notionDatabaseId = process.env.NOTION_DATABASE_ID

/**
 * @param  {string} title
 * @param  {string} firstParagraphText
 * @param  {string} databaseId=notionDatabaseId
 */
async function addPageToDatabase(
    title,
    firstParagraphText,
    databaseId = notionDatabaseId
) {
    try {
        const response = await notion.pages.create(
            newDatabasePageObject(
                {
                    title: title,
                    text: firstParagraphText,
                },
                databaseId
            )
        )
        console.log(response)
        console.log('Success! Entry added to Notion.')
        // open(response.url)
        return response
    } catch (err) {
        console.error(err.body)
    }
}

async function getPagesFromDatabase(
    filterObject = {},
    sortsArray = [],
    databaseId = notionDatabaseId
) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter:
                Object.keys(filterObject).length > 0 ? filterObject : undefined,
            sorts: sortsArray.length > 0 ? sortsArray : undefined,
        })
        console.log(response)
        return response.results
    } catch (err) {
        console.error(err.body)
    }
}

async function getDatabaseInfo(database_id = notionDatabaseId) {
    try {
        const response = await notion.databases.retrieve({
            database_id: database_id,
        })
        console.log(response)
        console.log(response.title[0])
        return response
    } catch (err) {
        console.error(err.body)
    }
}

module.exports = {
    addPageToDatabase,
    getPagesFromDatabase,
    getDatabaseInfo,
}

// getDatabaseInfo()
// getPagesFromDatabase()
