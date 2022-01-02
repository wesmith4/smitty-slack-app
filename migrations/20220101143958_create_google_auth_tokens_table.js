exports.up = function (knex) {
    return knex.schema.createTable('google_auth_tokens', (table) => {
        table.increments('id').primary()
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.string('encrypted_refresh_token').notNullable()
        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('google_auth_tokens')
}
