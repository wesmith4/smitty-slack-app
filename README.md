# Smitty Slack App

This is a Slack app built with the Bolt-js library and deployed to a Heroku app. It uses the Google Scripts API and the Notion JavaScript SDK to read and write data to each of those services.

The app uses a hobby-dev Heroku postgres database to store encrypted OAuth2 refresh tokens for use with the Google API.

You will need to copy the `.env.sample` file to `.env` and fill in the values for all of the environment variables in order to connect to the needed services.

## Usage of the Google Scripts API

This app makes a request to the Google Scripts API to run a function called `getFolders` defined in a Google Apps Script project defined by the `SCRIPT_ID` environment variable, which should actually be set to the _deployment id_ of the script (deployed as an API Executable), rather than the actual script id.
