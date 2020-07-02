
export class FireBaseStorageClient {
  constructor(param = '', user = 'guest', dbUrl = '') {
    this.name = this.storageName(param, user)
    // this.dbUrl = dbUrl
    // this.dbUrl = dbUrl !== '' ? dbUrl : 'https://excel-js-aisc.firebaseio.com/'
    this.dbUrl = dbUrl !== '' ?
      dbUrl : 'https://excel-js-aisc.firebaseio.com/'
  }

   save(state) {
     this.storage(this.name, state)
    return Promise.resolve()
  }

   get() {
    return new Promise(resolve => {
      const state = this.storage(this.name)

      setTimeout(() => {
        resolve(state)
      }, 300)
    })
  }

   async storage(key, data = null) {
    if (!data) {
      // Getter
      const response = await fetch(this.dbUrl + key)
      console.log(response, this.dbUrl + key)
      return response.json()
    }
     // Setter
     const response = await fetch(this.dbUrl + key, {
       method: 'PUT',
       body: JSON.stringify(data),
       headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': 'http://localhost:3000'
       }
     })
  }

  storageName(param, user) {
    const storageName = param === '' ?
      user + '.json' : user + '/' + param + '.json'
    console.log(storageName)
    return storageName
  }
}
