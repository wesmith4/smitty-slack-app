// Set up database
const Knex = require('knex')
let dbConfig = require('./knexfile')
let knex = Knex(dbConfig[process.env.NODE_ENV || 'development'])
let { Model } = require('objection')
Model.knex(knex)

const dbFunctions = require('./dbFunctions')

const execute = async () => {
    try {
        let user = await dbFunctions.insertNewUser('U1254398767')
        console.log(user)
    } catch (err) {
        console.error(err)
    }
}

execute()
