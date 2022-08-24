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

  const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id])
  res.send(rows[0])
})

router.get('/:id/share', async (req, res) => {
  var { id } = req.params
  id = parseInt(id)
  console.log('id', id, typeof id)


  const { rows } = await db.query(`SELECT user_id FROM users WHERE user_id = $1`, [id])
  var friendId = rows[0].user_id

  const text = `INSERT INTO friends (uid, friend) VALUES ($1, $2) RETURNING *`
  const values = [id, friendId]
  try {
    const response = await db.query(text, values)

    res.json(response.rows[0]);
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack)
  }
})
