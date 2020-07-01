export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('getRoot() should be implemented')
  }

  afterRender() {
    return ''
  }

  destroy() {}
}
