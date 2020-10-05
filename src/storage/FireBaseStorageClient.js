export class FireBaseStorageClient {
  constructor(auth, key, dbUrl ) {
    this.auth = auth
    this.key = key
    this.name = this.storageName(this.key)
    this.dbUrl = dbUrl ?? 'https://excel-js-aisc.firebaseio.com/'
  }

  save(state) {
    this.storage(this.key, state)
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
        `${this.dbUrl}${await this.storageName(key)}?auth=${await this.token()}`
      const response = await fetch(requestUrl)
      //
      console.log('storage.GET', requestUrl, response)
      return response.json()
    }
    // Setter
    const requestUrl =
      `${this.dbUrl}${await this.storageName(key)}?auth=${await this.token()}`
    const requestOpt = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }
    const response = await fetch(requestUrl, requestOpt)
    console.log('storage.SET', response)
    // !? add return for errors
  }

  async storageName(key) {
    const user = await this.auth.getUser()
    const name = !key ?
      user + '.json' :
      user + '/' + key + '.json'
    console.log(`Key:${key}, User:${user}, storageName:${name}`)
    return name
  }

  async token() {
    return await this.auth.getToken()
  }
}
