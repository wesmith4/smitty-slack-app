const GoogleAuthToken = require('./models/GoogleAuthToken')
const NotionDatabase = require('./models/NotionDatabase')
const User = require('./models/User')

const getUserBySlackId = async (slack_user_id) => {
    let user = await User.query().findOne({ slack_user_id: slack_user_id })
    if (!user) {
        user = await insertNewUser(slack_user_id)
    }
    return user || null
}

const insertNewUser = async (slack_user_id, email = null) => {
    let payload = {
        slack_user_id: slack_user_id,
    }
    if (email) {
        payload['email'] = email
    }
    let user = await User.query().insert(payload)
    return user
}

const addEmailToUser = async (slack_user_id, email) => {
    let user = await User.query().findOne({ slack_user_id: slack_user_id })
    if (user) {
        let updatedUser = await user.$query().patchAndFetch({ email: email })
        return updatedUser
    }
    return null
}

const getGoogleRefreshTokenBySlackUserId = async (slack_user_id) => {
    let user = await User.query().findOne({ slack_user_id: slack_user_id })
    let token = await user.$relatedQuery('google_auth_token').first()
    return token.encryptedRefreshToken.token || null
}

const insertNewRefreshToken = async (
    slack_user_id,
    encrypted_refresh_token
) => {
    try {
        let user = await User.query().findOne({ slack_user_id: slack_user_id })
        if (!user) {
            user = await insertNewUser(slack_user_id)
        }
        let token = await user.$relatedQuery('google_auth_token').insert({
            encrypted_refresh_token: encrypted_refresh_token,
        })
        return token
    } catch (err) {
        console.log(err)
        return null
    }
}

const relateNotionDatabaseToUser = async (user_id, notion_database_id) => {
    let user = await User.query().findOne({ user_id: user_id })
    let notionDatabase = await NotionDatabase.query().findOne({
        database_id: notion_database_id,
    })
    try {
        let user = await user
            .$relatedQuery('notion_database')
            .relate(notionDatabase)
        return user
    } catch (err) {
        console.error(err)
    }
}

const getNotionDatabases = async () => {
    let databases = await NotionDatabase.query()
    console.log(databases)
    return databases
}

const insertNewNotionDatabase = async (database_id, name) => {
    let notionDatabase = await NotionDatabase.query().insert({
        database_id: database_id,
        name: name,
    })
    return notionDatabase
}

const getLastUserViewId = async (slack_user_id) => {
    let user = await User.query().findOne({ slack_user_id: slack_user_id })
    let viewId = await user
        .$relatedQuery('view_ids')
        .orderBy('created_at', 'desc')
        .first()
    return viewId.viewId
}

module.exports = {
    getUserBySlackId,
    insertNewUser,
    getGoogleRefreshTokenBySlackUserId,
    insertNewRefreshToken,
    getNotionDatabases,
    insertNewNotionDatabase,
    relateNotionDatabaseToUser,
    addEmailToUser,
    getLastUserViewId,
}
