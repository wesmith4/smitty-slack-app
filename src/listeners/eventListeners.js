const verifyUrl = async ({ event, ack, respond }) => {
  await ack()
  await respond({ challenge: event.challenge })
}

module.exports = {
  verifyUrl
}