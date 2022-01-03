if (!(process.env.NODE_ENV === 'production')) {
    require('dotenv').config()
}

const { App } = require('@slack/bolt')
const { authenticateUser, googleAuthHandler } = require('./auth')

// Set up database
const Knex = require('knex')
let dbConfig = require('./knexfile')
let knex = Knex(dbConfig[process.env.NODE_ENV])
let { Model } = require('objection')
Model.knex(knex)

// Require Listeners
const messageListeners = require('./src/listeners/messageListeners')
const eventListeners = require('./src/listeners/eventListeners')
const viewListeners = require('./src/listeners/viewListeners')
const actionListeners = require('./src/listeners/actionListeners')
const shortcutListeners = require('./src/listeners/shortcutListeners')
const commandListeners = require('./src/listeners/commandListeners')

const modals = require('./src/views/modals')

// Initializes your app with your bot token and app token
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    customRoutes: [
        {
            path: '/oauth2callback',
            method: ['GET'],
            handler: googleAuthHandler,
        },
    ],
    port: process.env.PORT || 3000,
})

// Listens for events
app.event('url_verification', eventListeners.verifyUrl)
app.event('app_home_opened', eventListeners.renderAppHome)

// Action listeners
app.action('authenticate-button', actionListeners.simpleAcknowledge)

// Listens to incoming messages that contain "hello"
app.message('world', messageListeners.respondToHello)

// Listens to incoming commands
app.command('/echo-2', commandListeners.echo)
app.command('/folders-2', authenticateUser, commandListeners.getFolders)

// Listens for shortcut triggers
app.shortcut('notion-quick-note-2', modals.openNotionQuickNoteModal)

// Listens for view submits/closes
app.view(
    'quick-note-modal-submitted-2',
    viewListeners.notionRespondToModalSubmission
)

app.action('button_click', actionListeners.simpleAcknowledge)
;(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000)

    console.log('⚡️ Bolt app is running!')
})()
