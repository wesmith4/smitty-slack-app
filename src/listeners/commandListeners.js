const { scriptClient } = require('../../auth')
const { foldersListWithButtons } = require('../payloads/payloads')

const echo = async ({ command, ack, context, respond }) => {
    await ack()
    await respond(`${command.text}`)
}

const getFolders = async ({ command, ack, client, context, respond }) => {
    await ack()

    if (!context.auth) {
        await respond(context.authButtonPayload)
        return
    }

    let result = await scriptClient.scripts.run({
        auth: context.auth,
        scriptId: process.env.SCRIPT_ID,
        resource: {
            function: 'getFolders',
        },
    })
    await respond(foldersListWithButtons(result.data.response.result))
    return
}

module.exports = {
    echo,
    getFolders,
}
