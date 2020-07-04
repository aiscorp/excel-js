import {storage} from '@core/utils'
import {isEmail} from '@core/auth/auth.functions'

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

function getAllKeysDB(state) {
  return state ? Object.keys(state) : []
}

export function createRecordsTable(state, user) {
  const empty = `<ul class="dash-board__list">${listEmpty()}</ul>`
  const keys = getAllKeysDB(state)
  const list = `
    <ul class="dash-board__list">
        ${keys.map(k => listElement(state[k], k, user)).join('')}
    </ul>  
  `

  return `
    <div class="dash-board__table">
      <div class="dash-board__list-header">
        <span>Name</span>
        <span>Last date</span>
      </div> 
       ${keys.length ? list : empty}
    </div>
  `
}

export function createLogin(auth) {
  const form = `
      <div class="login-form">
          <h3>Please login:</h3>
          <p>Email:</p>
          <input type="text" class="email"/>
          <p>Password:</p>
          <input type="text" class="password"/>
          <button class="auth" id="login"
            data-action="login">Login</button> 
          <button class="register"
            data-action="register">Register</button> 
      </div>`

  const logoutBtn = `
      <div class="logout-button" data-action="logout">
          <i class="material-icons"
              data-action="logout">login</i>
      </div>`

  const login = `
    <div class="login">
      <div class="user">
          <p class="user-name">${auth.email}</p>
          ${logoutBtn}    
      </div>
    </div>`

  const noLogin = `
    <div class="login">
      <div class="user">
          <p class="user-name">Login...</p>      
      </div>      
      ${form} 
    </div>`

  return isEmail(auth.email) ? login : noLogin
}

export function clickLogin(e) {
  e.preventDefault()
  console.log('clickLogin()')
}

export function clickLogout(e) {
  e.preventDefault()
  console.log('clickLogout()')
  // eslint-disable-next-line no-invalid-this
  this.logout()
}
