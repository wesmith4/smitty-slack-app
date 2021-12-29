if (!(process.env.NODE_ENV === 'production')) {
    require('dotenv').config()
}

const { App } = require('@slack/bolt')

// Require Listeners
const messageListeners = require('./src/listeners/messageListeners')
const eventListeners = require('./src/listeners/eventListeners')
const viewListeners = require('./src/listeners/viewListeners')
const actionListeners = require('./src/listeners/actionListeners')
const shortcutListeners = require('./src/listeners/shortcutListeners')
const commandListeners = require('./src/listeners/commandListeners')

// Require Views
const homeViews = require('./src/views/homeViews')
const modals = require('./src/views/modals')

/* 
This sample slack application uses SocketMode
For the companion getting started setup guide, 
see: https://slack.dev/bolt-js/tutorial/getting-started 
*/

// Initializes your app with your bot token and app token
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    // socketMode: true,
    // appToken: process.env.SLACK_APP_TOKEN
    port: process.env.PORT || 3000,
})

app.event('url_verification', eventListeners.verifyUrl)
app.event('app_home_opened', eventListeners.appHomeOpened)

// Listens to incoming messages that contain "hello"
app.message('hello', messageListeners.respondToHello)

app.action('button_click', actionListeners.simpleAcknowledge)
;(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000)

    console.log('⚡️ Bolt app is running!')
})()
