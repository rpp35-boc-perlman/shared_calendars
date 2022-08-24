const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'calentodo',
  password: 'root'
})
module.exports = {
  query: (text, params) => pool.query(text, params),
}
// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'calentodo',
//   password: 'root'
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.log(err);
//     return
//   } else {
//     console.log('connected successfully')
//   }
//   client.end()
// })