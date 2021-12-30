const notion = require('../../lib/notion/notion')

const notionRespondToModalSubmission = async ({
    ack,
    body,
    view,
    client,
    logger,
}) => {
    await ack()

    const user = body['user']['id']

    let titleInput =
        view['state']['values']['notion-input-title']['notion-input-title'][
            'value'
        ]
    let paragraphInput =
        view['state']['values']['notion-input-paragraph'][
            'notion-input-paragraph'
        ]['value']

    try {
        let result = await notion.addPageToDatabase(titleInput, paragraphInput)

        // Send a message to the user
        await client.chat.postMessage({
            channel: user,
            text: `Success! Entry added to Notion.\n\n${result.url}`,
        })
    } catch (err) {
        console.error(err)
        await client.chat.postMessage({
            channel: user,
            text: `Error: ${err.message}`,
        })
    }
}

module.exports = {
    notionRespondToModalSubmission,
}
