// vanilla js until we framework it up
console.log('its working!!! ')
const baseUrl = 'http://localhost:8000/api';

(function () {
  const loginForm = document.querySelector('#loginForm')

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const emailInput = event.target.querySelector('input[name="email"]')
    const passwordInput = event.target.querySelector('input[name="password"]')
    const creds = { email: emailInput.value, password: passwordInput.value }

    login(creds).then(function (res) {
      console.log('its logging int!!', res)
      setToken(res.token)
      emailInput.value = ''
      passwordInput.value = ''
      event.target.classList = ''
    })
  })

  const getUsrBtn = document.querySelector('button[name="showUsers"]')
  getUsrBtn.addEventListener('click', function (event) {
    event.preventDefault()
    const usersDom = document.querySelector('#users')
    getUsers().then(function (usrs) {
      usersDom.innerHTML = createManyUsersHTML(usrs)
    })
  })
})()

// auth methods
function login (creds) {
  return fetch(`${baseUrl}/auth/login`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(creds)
  })
    .then(response => response.json())
    .catch(err => console.log(err))
}

function logout () {
  removeToken()
  window.location.path = '/'
}

function createUserHTML (userObj) {
  return `
   <div>
    <h3>${userObj.name}</h3>
    <img src="${userObj.picture}" />
    </div>
  `
}
function createManyUsersHTML (usersArr) {
  let html = ''
  usersArr.forEach(function (usr) {
    html += createUserHTML(usr)
  })
  return html
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
