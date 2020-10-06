/* eslint-disable no-invalid-this */
import {isEmail, isPassword} from '@core/auth/auth.functions'
import {$} from '@core/dom'

export function listElement(model, id, user) {
  const date = new Date(model.lastDate)
  return `
    <li class="dash-board__record">
      <a href="#excel/${user}/${id}">${model.title}</a>
      <strong>${date.toLocaleString()}</strong>
    </li>`
}

export function listEmpty() {
  return `
    <li class="dash-board__record">        
      <a href="#">No tables created.</a>      
    </li>`
}

export function createRecordsTable(state, user) {
  const empty = `<ul class="dash-board__list">${listEmpty()}</ul>`
  const keys = state ? Object.keys(state) : []
  const list = `
    <ul class="dash-board__list">
        ${keys.map(k => listElement(state[k], k, user)).join('')}
    </ul>`

  return `
    <div class="dash-board__table">
      <div class="dash-board__list-header">
        <span>Name</span>
        <span>Last date</span>
      </div> 
       ${state !== null && user ? list : empty}
    </div>
  `
}

export function createLogin(auth) {
  const form = `      
      <div id="login-form" class="login-form">
          <h3>Please login:</h3>
          <p>Email:</p>
          <input id="email" type="email" class="email"/>
          <p>Password:</p>
          <input id="password" type="password" class="password"/>
          <button class="auth" id="login"
            data-action="login">Login</button> 
          <button class="register"
            data-action="register">Register</button>       
    </div>`

  const infoForm = `
    <div id="login-form" class="login-form">
        <button class="logout-button"
                data-action="logout">
            <i class="material-icons"
               data-action="logout">login</i>
            &nbsp;&nbsp; Logout
        </button> 
        <button class="logout-button"
                data-action="logout">
            <i class="material-icons"
               data-action="logout">clear</i>
            &nbsp;&nbsp; Delete account</button> 
    </div>`

  const accountBtn = `
      <div class="account" data-action="account">
          <i class="material-icons"
              data-action="account">account_circle</i>
      </div>`

  const login = `
    <div id="login" class="login">
      <div class="user">
          <p class="user-name">${auth.email}</p>
          ${accountBtn}    
      </div>
      ${infoForm}
    </div>`

  const noLogin = `
    <div id="login" class="login">
      <div class="user">          
          ${accountBtn}      
      </div>      
      ${form} 
    </div>`

  return isEmail(auth.email) ? login : noLogin
}

export function onLoginFormClick(event) {
  event.stopPropagation()
  const $target = $(event.target)
  const action = $target.data.action

  // LOGIN & Register click
  if (action === 'login' || action === 'register') {

    const $email = this.$login.find('#email')
    const $password = this.$login.find('#password')

    let result
    // Login click()
    if (action === 'login') {
      // result =
        this.auth.authenticate($email.text(), $password.text())
          .then(result => {
            console.log(result)
            window.location.reload()
          })

      // Register click()
    } else {
      result =
        this.auth.singUp($email.text(), $password.text())
      window.location.reload()
    }

  }

  // LOGOUT click
  if ($target.data.action === 'logout') {
    this.auth.logout()
    window.location.reload()
  }

  // Account form
  if ($target.data.action === 'account') {
    this.$login.find('#login-form')
      .addClass('active')

    document.addEventListener('click', deleteActive)
  }
}

const deleteActive = (e) => {
  document.removeEventListener('click', deleteActive)
  $(document).find('#login-form')
    .removeClass('active')
}
