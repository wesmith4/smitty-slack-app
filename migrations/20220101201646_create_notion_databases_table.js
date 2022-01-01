exports.up = function (knex) {
    return knex.schema.createTable('notion_databases', (table) => {
        table.increments('id').primary()
        table.string('database_id').notNullable().unique()
        table.string('title')
        table
            .timestamp('created_at', { precision: 6 })
            .defaultTo(knex.fn.now(6))
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('notion_databases')
}
