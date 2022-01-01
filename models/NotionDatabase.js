const { Model, snakeCaseMappers } = require('objection')

class NotionDatabase extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers()
    }

    static get tableName() {
        return 'notion_databases'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['database_id', 'name'],
            properties: {
                id: { type: 'integer' },
                database_id: { type: 'string' },
                name: { type: 'string' },
                created_at: { type: 'string' },
            },
        }
    }
}

module.exports = NotionDatabase
