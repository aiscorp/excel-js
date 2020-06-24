export class Emitter {
  constructor() {
    this.listeners = {}
  }

  /*
   * emit(event:string, ...args)
   * subscribers notification
   * table.emit('table:select', {row:1, col:5})
   */
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  /*
   * subscribe(event:string, function callback())
   * subscribing on event
   * formula.subscribe('table:select', funcname)
   */
  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)

    // fn for unsubscribe
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== callback)
    }
  }
}
