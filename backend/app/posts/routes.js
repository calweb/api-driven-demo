const router = require('express').Router()
const { ensureAuthenticated } = require('../auth')
const postsDal = require('./postsDal')

router.route('/').get(async function (req, res) {
  const posts = await postsDal.getAllPosts()

  res.status(200).json(posts)
}).post(ensureAuthenticated, function (req, res) {
  req.body.authorId = req.user.sub
  postsDal.addPost(req.body)
  res.json({ status: 'ok', post: req.body })
})

// router.route('/:postId').get().put().delete()
module.exports = router
