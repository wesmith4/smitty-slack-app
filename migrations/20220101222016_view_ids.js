exports.up = function (knex) {
    return knex.schema.createTable('view_ids', (table) => {
        table.increments('id').primary()
        table.string('view_id').notNullable()
        table.integer('user_id').references('id').inTable('users').notNullable()
        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('view_ids')
}
