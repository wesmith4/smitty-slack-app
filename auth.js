const CryptoJS = require('crypto-js')
const script = require('@googleapis/script')
const { getEncryptedTokenBySlackUserId } = require('./db')
const { authButtonPayload } = require('./src/payloads/payloads')

const oauth2Client = new script.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    forceRefreshOnFailure: true,
})

const scopes = [
    'https://www.googleapis.com/auth/script.projects',
    'https://www.googleapis.com/auth/drive',
    'profile',
]

const scriptClient = script.script({ version: 'v1' })

// Authenticate User function
const authenticateUser = async ({ payload, client, context, next }) => {
    const userId = payload.user_id
    context.user_id = userId

    try {
        let encryptedToken = await getEncryptedTokenBySlackUserId(userId)
        if (encryptedToken) {
            // Decrypt the token
            let bytes = CryptoJS.AES.decrypt(
                encryptedToken,
                process.env.ENCRYPTION_KEY
            )
            let decryptedRefreshToken = bytes.toString(CryptoJS.enc.Utf8)
            oauth2Client.setCredentials({
                refresh_token: decryptedRefreshToken,
            })
            context.auth = oauth2Client
        }
    } catch (err) {
        console.log(err)
        context.auth = null
        let authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' '),
            state: encodeURIComponent(
                JSON.stringify({
                    user_id: context.user_id,
                    response_url: payload.response_url,
                    team_id: payload.team_id,
                    app_id: payload.api_app_id,
                })
            ),
        })
        context['authButtonPayload'] = authButtonPayload(authUrl)
    }
    await next()
}

module.exports = {
    authenticateUser,
    scriptClient,
}
