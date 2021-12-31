const NotionQuickNoteModal = async (dbOptions) => {
    return {
        type: 'modal',
        callback_id: 'quick-note-modal-submitted-2',
        title: {
            type: 'plain_text',
            text: 'Notion Quick Note',
        },
        submit: {
            type: 'plain_text',
            text: 'Submit',
        },
        close: {
            type: 'plain_text',
            text: 'Cancel',
        },
        blocks: [
            {
                type: 'section',
                block_id: 'quick-note-modal-select-block',
                text: {
                    type: 'mrkdwn',
                    text: 'Select a Notion database:',
                },
                accessory: {
                    action_id: 'quick-note-modal-select-database',
                    type: 'static_select',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Select a database',
                    },
                    options: dbOptions,
                    // initial_option: dbOptions[0],
                },
            },
            {
                type: 'input',
                block_id: 'notion-input-title',
                element: {
                    type: 'plain_text_input',
                    action_id: 'notion-input-title',
                },
                label: {
                    type: 'plain_text',
                    text: 'Page Title',
                    emoji: true,
                },
            },
            {
                type: 'input',
                block_id: 'notion-input-paragraph',
                element: {
                    type: 'plain_text_input',
                    multiline: true,
                    action_id: 'notion-input-paragraph',
                },
                label: {
                    type: 'plain_text',
                    text: 'First Paragraph',
                    emoji: true,
                },
            },
        ],
    }
}

module.exports = {
    NotionQuickNoteModal,
}
