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
            required: ['user_id', 'encrypted_refresh_token'],
            properties: {
                user_id: { type: 'string' },
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
                    to: 'users.user_id',
                },
            },
        }
    }
}
