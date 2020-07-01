
export class LocalStorageClient {
  constructor(name) {
    this.name = this.storageName(name)

  }

  save(state) {
    this.storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    // return Promise.resolve(state)
    return new Promise(resolve => {
      const state = this.storage(this.name)

      setTimeout(() => {
        resolve(state)
      }, 2000)
    })
  }

  // storage GET/SET
  storage(key, data = null) {
    if (!data) {
      return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  storageName(param) {
    console.log('storageName:', 'excel:' + param)
    return 'excel:' + param
  }
}
