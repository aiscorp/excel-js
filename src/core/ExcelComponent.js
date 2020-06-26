import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store

    this.unsubs = []

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

  // this method gets changes only for subscribed states
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    // removing component
    this.removeDOMListeners()
    // removing subscribers
    this.unsubs.forEach(u => u())
  }
}
