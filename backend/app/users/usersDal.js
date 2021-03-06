const mongoose = require('mongoose')
const User = require('./model')
mongoose.Promise = require('bluebird')
// Replace "test" with your database name.
mongoose.connect(process.env.MONGO_URI || 'mongodb://db:27017/peopledb', {
  useMongoClient: true
})

function getAllUsers () {
  return User.find()
}

function getUser (personId) {
  return User.findById(personId).populate('posts')
}

function getUserByUsername (username) {
  return User.find({ username: username }).exec().catch(function (err) {
    console.log('ERROR!!!!!', err)
  })
}
function getUserByEmail (email) {
  return User.findByEmail(email)
}

function addUser (newUser) {
  const person = new User(newUser)
  person.save(function (err) {
    console.log(err)
  })
  return Promise.resolve('success')
}
function deleteUser (personId) {
  return User.deleteOne({ _id: personId }).exec()
}

module.exports = {
  getAllUsers,
  getUser,
  getUserByUsername,
  getUserByEmail,
  addUser,
  deleteUser
}
