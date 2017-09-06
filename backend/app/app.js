const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { routes: userRoutes } = require('./users')
const { routes: authRoutes } = require('./auth')
const { routes: postRoutes } = require('./posts')

const app = express()
app.set('port', process.env.PORT || 8000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const env = process.env.NODE_ENV && process.env.NODE_ENV === 'dev'
  ? 'dev'
  : 'combined'
app.use(morgan(env))

app.get('/', (req, res) => {
  console.log('user in root route!!', req.user)
  res
    .status(200)
    .json({ status: 'ok', message: 'Welcome to the Api Driven Demo!' })
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)

app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`)
})
