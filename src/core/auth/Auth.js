// Authentication by email and password by google firebase service
// Auth refresh data stored in localstorage, data token in memory
//
import {API_KEY} from '@/constants'
import {storage} from '@core/utils'

export class Auth {
  constructor() {
    this.auth = {
      isAuthenticate: false,
      email: '',
      user: '',
      idToken: '',
      refreshToken: '',
      expiresIn: ''
    }
    this.ready = false
  }

  singUp(email, password) {
    const singInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    const request = {
      method: 'POST',
      body: JSON.stringify({
        email, password, returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (this.auth.isAuthenticate === true) {
      return false
    }

    return fetch(singInUrl, request)
      .then(response => response.json())
      .then(data => {
        if (data.idToken) {
          this.auth = {
            isAuthenticate: true,
            email: data.email,
            user: data.email.split('@')[0],
            idToken: data.idToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn
          }
        }
        this.saveAuthToStorage(this.auth)
        return data.idToken ?
          true :
          {code: data.error.code, message: data.error.message}
      })
  }

  authenticate(email, password) {
    const singInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    const request = {
      method: 'POST', // method: 'POST',
      body: JSON.stringify({
        email, password, returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = fetch(singInUrl, request)
      .then(response => response.json())
      .then(data => {
        if (data.idToken) {
          this.auth = {
            isAuthenticate: true,
            email: data.email,
            user: data.email.split('@')[0],
            idToken: data.idToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn
          }
        }
        this.saveAuthToStorage(this.auth)
        return data.idToken ?
          true :
          {code: data.error.code, message: data.error.message}
      })
    return res
  }

  refreshToken() {
    const refreshUrl = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`
    const request = {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: this.auth.refreshToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch(refreshUrl, request)
      .then(response => response.json())
      .then(data => {
        if (data['id_token']) {
          this.auth = {
            isAuthenticate: true,
            email: this.auth.email,
            user: this.auth.email.split('@')[0],
            idToken: data['id_token'],
            refreshToken: data['refresh_token'],
            expiresIn: data['expires_in']
          }
        }
        this.saveAuthToStorage(this.auth)
        return data['id_token'] ?
          true :
          {code: data.error.code, message: data.error.message}
      })
  }

  deleteAccount() {
    const refreshUrl = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`
    const request = {
      method: 'POST',
      body: JSON.stringify({
        idToken: this.auth.idToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch(refreshUrl, request)
      .then(response => {
        this.logout()
        return response.ok
      })
  }

  logout(e) {
    this.auth = {
      isAuthenticate: false
    }
    this.ready = false
    this.saveAuthToStorage(this.auth)
  }

  async authorise() {
    if (this.ready === false) {
      await this.loadAuthFromStorage()
        .then(r => {
          this.ready = true
        })
      return this.auth.isAuthenticate
    }
    return this.auth.isAuthenticate
  }

  getToken() {
    if (!this.authorise()) {
      return false
    }
    return this.auth.idToken
  }

  getUser() {
    if (!this.authorise()) {
      return false
    }
    return this.auth.user
  }

  getEmail() {
    if (!this.authorise()) {
      return false
    }
    return this.auth.email
  }

  async loadAuthFromStorage() {
    const storeAuth = storage('auth')
    if (storeAuth !== null && storeAuth.isAuthenticate === true) {
      this.auth = storeAuth
      await this.refreshToken()
        .then(() => {
          this.refreshTokenInExpires()
        })
    }
  }

  saveAuthToStorage(auth) {
    const authToStore = {...auth, idToken: ''}
    return storage('auth', authToStore)
  }

  refreshTokenInExpires() {
    if (this.auth.isAuthenticate === true) {
      setTimeout(() => {
        this.refreshToken()
          .then(() => this.refreshTokenInExpires())
      }, (this.auth.expiresIn - 60) * 500) // ~29min
    }
  }
}
