const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'calentodo',
  password: 'root'
})
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err);
    return
  } else {
    console.log('connected successfully')
  }
  pool.end()
})
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