/**
 * Returns a submittable object to create a new page in a database.
 * @param  {object} pageData
 * @param  {string} database_id
 */
const newDatabasePageObject = (pageData, database_id) => {
    return {
        parent: {
            database_id: database_id,
        },
        properties: {
            title: {
                title: [
                    {
                        text: {
                            content: pageData.title || 'New Page from Slack',
                        },
                    },
                ],
            },
        },
        children: [
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    text: [
                        {
                            type: 'text',
                            text: {
                                content:
                                    pageData.text || 'First paragraph text',
                            },
                        },
                    ],
                },
            },
        ],
    }
}

module.exports = {
    newDatabasePageObject,
}
