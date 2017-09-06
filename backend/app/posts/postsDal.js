const Post = require('./model')
const { model: User } = require('../users')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
// Replace "test" with your database name.
mongoose.connect(process.env.MONGO_URI || 'mongodb://db:27017/peopledb', {
  useMongoClient: true
})
module.exports = { getAllPosts, addPost }

function getAllPosts () {
  return Post.find().populate('author')
}

function addPost ({ title, content, authorId }) {
  const newPost = new Post({ title, content, author: authorId })
  newPost.save(function (err, post) {
    console.log(err)
    User.findOne({ _id: authorId }).then(function (user) {
      if (!user.posts) {
        user.posts = []
      }
      user.posts.push(post._id)
      user.save(function (err) {
        console.log(err)
      })
    })
  })
}
