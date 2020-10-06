export class FireBaseStorageClient {
  constructor(auth, key, dbUrl) {
    this.auth = auth
    this.key = key
    this.name = this.storageName(this.key)
    this.dbUrl = dbUrl ?? 'https://excel-js-aisc.firebaseio.com/'
  }

  save(state) {
    const r = this.storage(this.key, state)
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => {
      const state = this.storage(this.key)

      setTimeout(() => {
        resolve(state)
      }, 300)
      // 300 - need to optimize?
    })
  }

  async storage(key = '', data = null) {
    if (!data) {
      // Getter
      const requestUrl =
        `${this.dbUrl}${this.storageName(key)}?auth=${this.token()}`
      console.log('async storage() requestUrl:', requestUrl)
      const response = await fetch(requestUrl)
      //
      return response.json()
    }
    // Setter
    const requestUrl =
      `${this.dbUrl}${this.storageName(key)}?auth=${this.token()}`
    const requestOpt = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }
    const response = await fetch(requestUrl, requestOpt)
  }

  storageName(key) {
    const user = this.auth.getUser()
    const name = !key ?
      user + '.json' :
      user + '/' + key + '.json'
    return name
  }

  token() {
    return this.auth.getToken()
  }
}
