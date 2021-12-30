const respondToHello = async ({ message, say }) => {
    await say({
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Hey there, <@${message.user}>!`,
                },
            },
        ],
        text: `Hey there, <@${message.user}>!`,
    })
}

module.exports = {
    respondToHello,
}
