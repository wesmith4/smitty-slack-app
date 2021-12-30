const CryptoJS = require('crypto-js')
const script = require('@googleapis/script')
const { getEncryptedTokenBySlackUserId } = require('./db')
const { authButtonPayload } = require('./src/payloads/payloads')
const { URL } = require('url')

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

const googleAuthHandler = async (req, res) => {
    console.log('Req: ', Object.keys(req.url))

    const url = new URL(req.url, req.headers.host)
    console.log('URL Search Params: ', url.searchParams)

    const code = query.code
    const { user_id, response_url, team_id, app_id } = JSON.parse(
        decodeURIComponent(query.state)
    )
    const redirectURL = `slack://app?team=${team_id}&id=${app_id}&tab=home`

    try {
        const result = await oauth2Client.getToken(code)
        const refresh_token = result.tokens.refresh_token
        let encrypted_token = CryptoJS.AES.encrypt(
            refresh_token,
            process.env.ENCRYPTION_KEY
        ).toString()

        let results = await addUserGoogleToken(user_id, encrypted_token)
        res.statusCode(301).setHeader('Location', redirectURL)
        res.end()
        return
    } catch (err) {
        console.error(err)
        res.statusCode(502).end('Error: ' + err)
    }
}

module.exports = {
    authenticateUser,
    scriptClient,
    googleAuthHandler,
    oauth2Client,
}
