const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});


client.connect();
client.query(getUsersQuery,(err,res)=>{
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const getUsers = async () => {
  const getUsersQuery = `SELECT * FROM users;`;

  client.connect();
  try {
    let results = await client.query(getUsersQuery);
    for (let row of results.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  } catch (err) {
    client.end();
    throw err;
  }
}

const getEncryptedTokenBySlackUserId = async (slackUserId) => {
  const getTokenQuery = sql`
  SELECT encrypted_refresh_token
  FROM google_auth_tokens
  WHERE slack_user_id = ${slackUserId};
  `
  client.connect();
  try {
    let results = await client.query(getTokenQuery);
    client.end();
    let token = results.rows[0].encrypted_refresh_token;
    return token;
  } catch (err) {
    client.end();
    throw err;
  }
}


module.exports = {
  getUsers,
  getEncryptedTokenBySlackUserId
}

