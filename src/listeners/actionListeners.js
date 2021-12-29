const simpleAcknowledge = async ({ack}) => {
  await ack()
}

module.exports = {
  simpleAcknowledge
}