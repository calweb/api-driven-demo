// GET api/users/ -- return array of users
// POST api/users  -- creat a new user
//
// GET api/users/:id -- return a single user object
// PUT/PATCH api/users/:id -- update a single user
// DELETE api/users/:id -- delete a user resource
//
//
// GET api/users/:userId/posts -- returns array of posts
// POST api/users/:userId/posts -- create a new post
//
// GET api/users/:userId/posts/:postId - return a single post
// PUT/PATCH api/users/:userId/posts/:postId - update a single post
// DELETE api/users/:userId/posts/:postId - delete a single post
//
// GET api/users/:userId/posts/:postId/comments/:commentId
//
// POST api/posts/:postId/comments -- add comment
// GET api/posts/:postId/comments -- get all comment
//
// GET api/posts?limit=20
//
//
// // antipattern
// GET api/posts/create
// PUT api/posts/:postId/edit

const router = require('express').Router()
const User = require('./model')
const { roles } = require('../auth')
const {
  getAllUsers,
  getUser,
  getUserByUsername,
  getUserByEmail,
  addUser,
  deleteUser
} = require('./usersDal')
const { ensureAuthenticated } = require('../auth')

router.route('/').all(ensureAuthenticated).get(async ({ query }, res) => {
  const { email, username } = query
  if (email || username) {
    const [ user ] = email
      ? (await getUserByEmail(email))
      : (await getUserByUsername(username))
    return res.status(200).json(user)
  }
  const people = await getAllUsers()
  res.status(200).json(people)
}).post(roles.can('access admin resources'), async ({ body }, res) => {
  const result = await addUser(body)
  res.json(result)
})

router
  .route('/:userId')
  .all(ensureAuthenticated)
  .get(async ({ params }, res) => {
    console.log('params', params)
    const user = await getUser(params.userId)
    res.status(200).json(user)
  })
  .delete(roles.can('access admin resources'), async ({ params }, res) => {
    const result = await deleteUser(params.userId)
    res.json(result)
  })

module.exports = router
