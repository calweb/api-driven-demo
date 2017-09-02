const ConnectRoles = require('connect-roles')

const user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    const accept = req.headers.accept || ''
    res
      .status(403)
      .send("Access Denied - You don't have permission to: " + action)
  }
})

user.use('access user resources', function (req, res) {
  if (req.role === 'user' || req.role === 'admin') {
    return true
  }
})

user.use('access admin resources', function (req, res) {
  if (req.role === 'admin') {
    return true
  }
})

module.exports = user
