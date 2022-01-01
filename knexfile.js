module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost:5432/smitty_slack_app_dev',
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    test: {
        client: 'pg',
        connection: 'postgres://localhost:5432/smitty_slack_app_test',
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    production: {
        client: 'pg',
        connection: `${process.env.DATABASE_URL}?ssl=true`,
        migrations: {
            tableName: 'knex_migrations',
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
}
