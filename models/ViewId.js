const { Model, snakeCaseMappers } = require('objection')

class ViewId extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers()
    }

    static get tableName() {
        return 'view_ids'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['view_id'],
            properties: {
                id: { type: 'integer' },
                view_id: { type: 'string' },
                user_id: { type: 'integer' },
                created_at: { type: 'string' },
            },
        }
    }

    static get relationMappings() {
        const User = require('./User')
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'view_ids.user_id',
                    to: 'users.id',
                },
            },
        }
    }
}

module.exports = ViewId
