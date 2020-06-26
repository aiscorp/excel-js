import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.store = options.store
    this.emitter = options.emitter
    this.unsubs = []
    this.storeSub = null

    this.prepare()
  }

  // this calls before init()
  prepare() {

  }

  // base html()
  toHTML() {
    return ''
  }

  // subscribers notification
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // subscribing on event
  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback)
    this.unsubs.push(unsub)
  }

  // Store.dispatch(action)
  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(callback) {
    this.storeSub = this.store.subscribe(callback)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    // removing component
    this.removeDOMListeners()
    // removing subscribers
    this.unsubs.forEach(u => u())

    this.storeSub.unsubscribe()
  }
}
