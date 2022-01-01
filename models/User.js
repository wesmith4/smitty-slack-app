const { Model, snakeCaseMappers } = require('objection')

class User extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers()
    }

    static get tableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['slack_user_id'],
            properties: {
                slack_user_id: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string' },
            },
        }
    }

    static get relationMappings() {
        const GoogleAuthToken = require('./GoogleAuthToken')
        const NotionDatabase = require('./NotionDatabase')
        const ViewId = require('./ViewId')
        return {
            google_auth_token: {
                relation: Model.HasOneRelation,
                modelClass: GoogleAuthToken,
                join: {
                    from: 'users.id',
                    to: 'google_auth_tokens.user_id',
                },
            },
            notion_database: {
                relation: Model.HasOneRelation,
                modelClass: NotionDatabase,
                join: {
                    from: 'users.default_notion_database_id',
                    to: 'notion_databases.id',
                },
            },
            view_ids: {
                relation: Model.HasManyRelation,
                modelClass: ViewId,
                join: {
                    from: 'users.id',
                    to: 'view_ids.user_id',
                },
            },
        }
    }
}

module.exports = User
