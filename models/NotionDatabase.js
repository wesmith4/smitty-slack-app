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

    static get relationMappings() {
        const User = require('./User')
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'notion_databases.id',
                    to: 'users.default_notion_database_id',
                },
            },
        }
    }
}

module.exports = NotionDatabase
