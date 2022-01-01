exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
        table
            .integer('default_notion_database_id')
            .references('id')
            .inTable('notion_databases')
    })
}

exports.down = function (knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('default_notion_database_id')
    })
}
