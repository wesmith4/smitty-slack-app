const NotionQuickNoteModal = (dbOptions) => {
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
                type: 'input',
                element: {
                    type: 'static_select',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Select a database',
                    },
                    options: dbOptions,
                    action_id: 'notion-database-selected',
                },
                label: {
                    type: 'plain_text',
                    text: 'Select a database',
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
