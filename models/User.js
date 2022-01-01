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
            required: ['user_id'],
            properties: {
                user_id: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string' },
            },
        }
    }

    static get relationMappings() {
        const GoogleAuthToken = require('./GoogleAuthToken')
        return {
            google_auth_token: {
                relation: Model.HasOneRelation,
                modelClass: GoogleAuthToken,
                join: {
                    from: 'users.user_id',
                    to: 'google_auth_tokens.user_id',
                },
            },
        }
    }
}

module.exports = User
