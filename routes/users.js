const Router = require('express-promise-router')
const db = require('../db')
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
// export our router to be mounted by the parent application
module.exports = router
router.get('/:id', async (req, res) => {
  var { id } = req.params
  id = parseInt(id)
  console.log('id', id, typeof id)

  var { rows } = await db.query(`SELECT friend FROM friends WHERE uid = $1`, [id])

  var friends = [id];
  for (var i = 0; i < rows.length; i++) {
    friends.push(rows[i].friend)
  }
  console.log('friends', friends)

  var { rows } = await db.query(`SELECT user_id, user_email FROM users WHERE user_id = ANY($1::int[])`, [friends])
  var users = rows;

  var { rows } = await db.query(`SELECT * FROM todos WHERE user_id = ANY($1::int[])`, [friends])
  var todos = rows

  for (var row of rows) {
    var id = row.user_id;
    for (var user of users) {
      if (id === user.user_id) {
        if ('todos' in user) {
          user.todos.push(row);
        } else {
          user.todos = [];
          user.todos.push(row)
        }
      }
    }
  }

  var result = {
    users: users,

  }
  res.json(result)


})

router.post('/:id/share', async (req, res) => {
  var { id } = req.params
  console.log(req.body ,req.params, id)
  const email = req.body["user_email"]
  console.log(email)

  id = parseInt(id)
  console.log('id', id, typeof id)

  var { rows } = await db.query(`SELECT user_id FROM users WHERE user_email = $1`, [email])
  var friendId = rows[0].user_id
  console.log('friendid', friendId, typeof friendId)


  var { rows }  = await db.query(`SELECT * FROM friends where uid = $1 and friend = $2`, [friendId, id])
  console.log(rows, 'friends rows')
  if (rows.length === 0) {
    const text = `INSERT INTO friends (uid, friend) VALUES ($1, $2) RETURNING *`
    const values = [friendId, id]
    try {
      const response = await db.query(text, values)

      res.json(response.rows[0]);
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack)
    }

  } else {
    res.json('nope')

  }
})
