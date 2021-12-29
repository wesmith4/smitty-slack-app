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

const textWithUrlButton = (text, url, buttonText) => {
    return {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `*<${url}|${text}>*`,
        },
    }
}

const foldersListWithButtons = (folders) => {
    let payload = {
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Folders in Google Drive :open_file_folder:',
                    emoji: true,
                },
            },
        ],
    }
    folders.forEach((folder) => {
        payload.blocks.push(textWithUrlButton(folder.name, folder.url, 'Open'))
    })
    return payload
}

module.exports = {
    foldersListWithButtons,
    authButtonPayload,
}
