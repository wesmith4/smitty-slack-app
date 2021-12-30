if (!(process.env.NODE_ENV === 'production')) {
    require('dotenv').config()
}
const { Client } = require('pg')

const getUsers = async () => {
    const getUsersQuery = `SELECT * FROM users;`

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
    client.connect()
    try {
        let results = await client.query(getUsersQuery)
        for (let row of results.rows) {
            console.log(JSON.stringify(row))
        }
        client.end()
    } catch (err) {
        client.end()
        throw err
    }
}

const getEncryptedTokenBySlackUserId = async (slackUserId) => {
    const getTokenQuery = `
  SELECT encrypted_refresh_token
  FROM google_auth_tokens
  WHERE slack_user_id = "${slackUserId}";
  `

    console.log('Query: ', getTokenQuery)
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
    client.connect()
    try {
        let results = await client.query(getTokenQuery)
        client.end()
        let token = results.rows[0].encrypted_refresh_token
        return token
    } catch (err) {
        client.end()
        throw err
    }
}

const addUserGoogleToken = async (slackUserId, encryptedToken) => {
    const addUserGoogleTokenQuery = `
  INSERT INTO google_auth_tokens (slack_user_id, encrypted_refresh_token,created_on)
  VALUES (${slackUserId}, ${encryptedToken},CURRENT_TIMESTAMP)`
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
    client.connect()
    try {
        let results = await client.query(addUserGoogleTokenQuery)
        client.end()
        return results
    } catch (err) {
        client.end()
        throw err
    }
}

module.exports = {
    getUsers,
    getEncryptedTokenBySlackUserId,
    addUserGoogleToken,
}
