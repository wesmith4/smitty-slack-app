const { getAvailableNotionDatabases } = require('../../dbconfig')
const { NotionQuickNoteModal } = require('./staticViews')

const openNotionQuickNoteModal = async ({ shortcut, ack, client, logger }) => {
    try {
        await ack()
        let dbOptions = await getAvailableNotionDatabases()

        const result = await client.views.open({
            trigger_id: shortcut.trigger_id,
            view: NotionQuickNoteModal(dbOptions),
        })
        logger.info(result)
    } catch (error) {
        logger.error(error)
    }
}

module.exports = {
    openNotionQuickNoteModal,
}
