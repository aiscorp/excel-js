/* eslint-disable no-invalid-this */
import {storage} from '@core/utils'
import {isEmail, isPassword} from '@core/auth/auth.functions'
import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export function listElement(model, id, user) {
  // NEED TO REFACTOR TO USE StateProcessor
  const date = new Date(model.lastDate)

  return `
    <li class="dash-board__record">
      <a href="#excel/${user}/${id}">${model.title}</a>
      <strong>${date.toLocaleString()}</strong>
    </li>
  `
}

export function listEmpty() {
  return `
    <li class="dash-board__record">        
      <a href="#">No tables created.</a>      
    </li>
  `
}

// export function listElement(k) {
//   // NEED TO REFACTOR TO USE StateProcessor
//   const model = storage(k)
//   const id = k.split(':')[1]
//   const date = new Date(model.lastDate)
//
//   return `
//     <li class="dash-board__record">
//       <a href="#excel/${id}">${model.title}</a>
//       <strong>${date.toLocaleString()}</strong>
//     </li>
//   `
// }

// function getAllKeys() {
//   const keys = []
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i)
//     if (!key.includes('excel:')) {
//       continue
//     }
//     keys.push(key)
//   }
//   return keys
// }

// export function createRecordsTable(state) {
//   const empty = `<ul class="dash-board__list">${listEmpty()}</ul>`
//   const keys = getAllKeysDB(state)
//
//   if (!keys.length) {
//     return empty
//   }
//
//   return `
//     <div class="dash-board__table">
//       <div class="dash-board__list-header">
//         <span>Name</span>
//         <span>Last date</span>
//       </div>
//       <ul class="dash-board__list">
//         ${keys.map(k => listElement(k)).join('')}
//       </ul>
//     </div>
//   `
// }

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
      <form id="login-form" class="login-form">
          <h3>Please login:</h3>
          <p>Email:</p>
          <input id="email" type="email" class="email"/>
          <p>Password:</p>
          <input id="password" type="password" class="password"/>
          <button class="auth" id="login"
            data-action="login">Login</button> 
          <button class="register"
            data-action="register">Register</button>       
    </form>`

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

export async function onLoginFormClick(event) {
  // event.preventDefault()
  event.stopPropagation()
  const $target = $(event.target)
  const action = $target.data.action
  console.log($target)

  // LOGIN & Register
  if (action === 'login' || action === 'register') {
    const $email = this.$login.find('#email')
    const $password = this.$login.find('#password')

    if (!isEmail($email.text())) {
      console.log('Email wrong')
    } else if (!isPassword($password.text())) {
      console.log('Password wrong')
    } else {
      let result
      if (action === 'login') {
        result =
          await this.auth.authenticate($email.text(), $password.text())
      } else {
        result =
          await this.auth.singUp($email.text(), $password.text())
      }

      if (result) {
        window.location.reload()
        // ActiveRoute.navigate('/#login')
      } else {
        console.log('Authenticate error', result)
      }
    }
    console.log($email.text(), $password.text())
  }

  // LOGOUT
  if ($target.data.action === 'logout') {
    await this.auth.logout()
    window.location.reload()
    // ActiveRoute.navigate('/#logout')
  }

  // LOGOUT
  if ($target.data.action === 'account') {
    this.$login.find('#login-form')
      .addClass('active')

    document.addEventListener('click', deleteActive)
    // ActiveRoute.navigate('/#logout')
  }
}

const deleteActive = (e) => {
  document.removeEventListener('click', deleteActive)
  $(document).find('#login-form')
    .removeClass('active')
}
