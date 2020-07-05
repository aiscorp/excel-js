export class FireBaseStorageClient {
  constructor(auth, dbUrl = '') {
    this.auth = auth
    this.name = this.storageName('')
    this.dbUrl = dbUrl !== '' ?
      dbUrl : 'https://excel-js-aisc.firebaseio.com/'
  }

  save(state) {
    this.storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => {
      const state = this.storage()

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
        `${this.dbUrl}${this.storageName(key)}?auth=${await this.token()}`
      const response = await fetch(requestUrl)
      //
      console.log('storage.GET', requestUrl, response)
      return response.json()
    }
    // Setter
    const requestUrl =
      `${this.dbUrl}${this.storageName(key)}?auth=${await this.token()}`
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

  storageName(key) {
    // name='xxxx' in xxxx@email.com
    const name = this.auth.auth.email.split('@')[0]
    return key === '' ?
      name + '.json' :
      name + '/' + key + '.json'
  }

  async token() {
    return await this.auth.getToken()
  }
}
