exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.string('user_id').primary().notNullable().unique()
        table.text('email').unique()
        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('users')
}
