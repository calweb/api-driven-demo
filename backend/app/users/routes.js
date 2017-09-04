const router = require('express').Router()
const User = require('./model')
const {
  getAllUsers,
  getUser,
  getUserByUsername,
  getUserByEmail,
  addUser,
  deleteUser
} = require('./usersDal')

router
  .route('/')
  .get(async ({ query }, res) => {
    const { email, username } = query
    if (email || username) {
      const [ user ] = email
        ? (await getUserByEmail(email))
        : (await getUserByUsername(username))
      return res.status(200).json(user)
    }
    const people = await getAllUsers()
    res.status(200).json(people)
  })
  .post(async ({ body }, res) => {
    const result = await addUser(body)
    res.json(result)
  })

router
  .route('/:userId')
  .get(async ({ params }, res) => {
    const [ user ] = await getUser(params.userId)
    res.status(200).json(user)
  })
  .delete(async ({ params }, res) => {
    const result = await deleteUser(params.userId)
    res.json(result)
  })

module.exports = router
