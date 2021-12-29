const verifyUrl = async ({ event, ack, respond }) => {
    await ack()
    await respond({ challenge: event.challenge })
}

const renderAppHome = async ({ event, client, logger }) => {
    try {
        const result = await client.views.publish({
            user_id: event.user,
            view: {
                type: 'home',
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text:
                                '*Welcome home, <@' +
                                event.user +
                                '>! :house:,*',
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: 'This is a simple app that demonstrates the basics of using the App Scripts API.',
                        },
                    },
                ],
            },
        })
        logger.info(result)
        console.log(result)
    } catch (error) {
        logger.error(error)
    }
}

module.exports = {
    verifyUrl,
    renderAppHome,
}
