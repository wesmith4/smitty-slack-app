const { Model, snakeCaseMappers } = require('objection')

class GoogleAuthToken extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers()
    }

    static get tableName() {
        return 'google_auth_tokens'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['encrypted_refresh_token'],
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                encrypted_refresh_token: { type: 'string' },
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
                    from: 'google_auth_tokens.user_id',
                    to: 'users.id',
                },
            },
        }
    }
}

module.exports = GoogleAuthToken
