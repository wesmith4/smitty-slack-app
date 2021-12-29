const staticHomeView = {
    type: 'home',
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: 'Welcome to Slack! :wave:',
            },
        },
        {
            type: 'divider',
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Quick start*',
            },
        },
    ],
}

module.exports = {
    staticHomeView,
}
