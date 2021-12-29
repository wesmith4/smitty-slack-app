/**
 * @param  {string} authUrl
 */
const authButtonPayload = (authUrl) => {
    return {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'You need to authenticate with Google to use this command.',
                },
                accessory: {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Authenticate',
                    },
                    action_id: 'authenticate-button',
                    url: authUrl,
                },
            },
        ],
    }
}

module.exports = {
    authButtonPayload,
}
