import {API_KEY} from '@/constants'

// auth with email and password
export async function authFireBase(email, password) {
  // eslint-disable-next-line max-len
  const singInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  const request = {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return await fetch(singInUrl, request)
    .then(response => response.json())
    .then(data => {
      return data.idToken ?
        {idToken: data.idToken, email: data.email} :
        {code: data.error.code, message: data.error.message}
    })
}
