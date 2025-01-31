// Set up database
const Knex = require('knex')
let dbConfig = require('./knexfile')
let knex = Knex(dbConfig[process.env.NODE_ENV || 'development'])
let { Model } = require('objection')
Model.knex(knex)

const dbFunctions = require('./dbFunctions')

// Self-calling function
;(async () => {
    // let newUser = await dbFunctions.insertNewUser('U029344320')
    // console.log(newUser)

    let user = await dbFunctions.getUserBySlackId('U029344320')

    // Add a new refresh token
    let newRefreshToken = await dbFunctions.insertNewRefreshToken(
        user.slackUserId,
        'testing-token'
    )
    console.log(newRefreshToken)
    knex.destroy()
})()
