const ConnectRoles = require('connect-roles')

const user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    const accept = req.headers.accept || ''
    res
      .status(403)
      .send("Access Denied - You don't have permission to: " + action)
  }
})

user.use('access member resources', function (req, res) {
  if (
    req.user.roles.indexOf('member') > -1 ||
      req.user.roles.indexOf('admin') > -1
  ) {
    return true
  }
})

user.use('access special auditor resources', function (req, res) {
  if (req.user.roles.indexOf('auditor') > -1) {
    return true
  }
})

user.use('access admin resources', function (req, res) {
  if (req.user.roles.indexOf('admin') > -1) {
    return true
  }
})

module.exports = user
