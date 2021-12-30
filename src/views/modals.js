const { NotionQuickNoteModal } = require('./staticViews')

const openNotionQuickNoteModal = async ({ shortcut, ack, client, logger }) => {
    try {
        await ack()

        const result = await client.views.open({
            trigger_id: shortcut.trigger_id,
            view: NotionQuickNoteModal,
        })
        logger.info(result)
    } catch (error) {
        logger.error(error)
    }
}

module.exports = {
    openNotionQuickNoteModal,
}
