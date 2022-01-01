exports.up = function (knex) {
    return knex.schema.createTable('google_auth_tokens', (table) => {
        table.increments('id').primary()
        table
            .string('user_id')
            .notNullable()
            .references('user_id')
            .inTable('users')
        table.string('encrypted_refresh_token').notNullable()
        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('google_auth_tokens')
}
