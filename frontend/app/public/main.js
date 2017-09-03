// vanilla js until we framework it up

const baseUrl = 'http://localhost:8000/api'

// auth methods
function login (creds) {
  return fetch(`${baseUrl}/api/auth/login`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(creds)
  })
}

function logout () {
  removeToken()
  window.location.path = '/'
}

// user methods
function getUsers () {
  return fetch(`${baseUrl}/users`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

function getUser (userId) {
  return fetch(`${baseUrl}/users/${userId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

function addUser (newUser) {
  return fetch(`${baseUrl}/users`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    method: 'POST',
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
function updateUser (updatedUser) {
  return fetch(`${baseUrl}/users/${updatedUser._id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    method: 'PUT',
    body: JSON.stringify(updatedUser)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
function removeUser (userId) {
  return fetch(`${baseUrl}/users/${userId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    method: 'DELETE'
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

// token methods
function getToken () {
  const token = window.localStorage.getItem('token')
  if (token) {
    return token
  } else {
    console.log('something went wrong')
  }
}
function setToken (token) {
  window.localStorage.setItem('token', token)
  return token
}
function removeToken () {
  window.localStorage.removeItem('token')
}
