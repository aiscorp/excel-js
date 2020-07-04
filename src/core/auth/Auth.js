// Authentication by email and password by google firebase service
// Auth data stored in localstorage
import {API_KEY} from '@/constants'
import {storage} from '@core/utils'

export class Auth {
  constructor() {
    this.auth = {
      isAuthenticate: false,
      email: '',
      idToken: '',
      refreshToken: '',
      expiresIn: ''
    }

    this.ready = false

    // return this.loadAuthFromStorage()
  }

  async singUp(email, password) {
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

    return await fetch(singInUrl, request)
      .then(response => response.json())
      .then(data => {
        if (data.idToken) {
          this.auth = {
            isAuthenticate: true,
            email: data.email,
            idToken: data.idToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn
          }
        }
        this.saveAuthToStorage(this.auth)
        // console.log('singUp()', data)
        return data.idToken ?
          true :
          {code: data.error.code, message: data.error.message}
      })
  }

  async authenticate(email, password) {
    const singInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    const request = {
      method: 'POST',
      body: JSON.stringify({
        email, password, returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return await fetch(singInUrl, request)
      .then(response => response.json())
      .then(data => {
        if (data.idToken) {
          this.auth = {
            isAuthenticate: true,
            email: data.email,
            idToken: data.idToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn
          }
        }
        this.saveAuthToStorage(this.auth)
        console.log('authenticate', data)
        return data.idToken ?
          true :
          {code: data.error.code, message: data.error.message}
      })
  }

  async refreshToken() {
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

    return await fetch(refreshUrl, request)
      .then(response => response.json())
      .then(data => {
        if (data['id_token']) {
          this.auth = {
            isAuthenticate: true,
            email: this.auth.email, // ! need to save
            idToken: data['id_token'],
            refreshToken: data['refresh_token'],
            expiresIn: data['expires_in']
          }
        }
        this.saveAuthToStorage(this.auth)
        console.log('refreshToken(this.auth)', data)
        return data['id_token'] ?
          true :
          {code: data.error.code, message: data.error.message}
      })
  }

  async deleteAccount() {
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

    return await fetch(refreshUrl, request)
      .then(response => {
        this.logout()
        console.log('deleteAccount()', response)
        return response.ok
      })
  }

  logout(e) {
    this.auth = {
      isAuthenticate: false
    }
    this.saveAuthToStorage(this.auth)
  }

  async authorise() {
    if (this.ready === false) {
      await this.loadAuthFromStorage()
        .then(r => {
          this.ready = true
          return this.auth.isAuthenticate
        })
    }
    return this.auth.isAuthenticate
  }

  async getToken() {
    if (!await this.authorise()) {
      return false
    }
    return this.auth.idToken
  }

  async loadAuthFromStorage() {
    const storeAuth = storage('auth')
    if (storeAuth !== null) {
      this.auth = storeAuth
      await this.refreshToken() // refresh for first time
        .then(() => {
          this.refreshTokenInExpires()
          // refresh every 7min (59min in prod)
        })
    }
    // console.log('loadAuthFromStorage()', this.auth)
  }

  saveAuthToStorage(auth) {
    const authToStore = {...auth, idToken: ''}
    return storage('auth', authToStore)
  }

  refreshTokenInExpires() {
    if (this.auth.isAuthenticate === true) {
      setTimeout(() => {
        console.log('refreshTokenInExpires()')
        this.refreshToken()
          .then(() => this.refreshTokenInExpires())
      }, (this.auth.expiresIn - 60) * 100)
    }
    // for debug = *100, for prod = *1000
  }
}
