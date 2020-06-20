import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('$root must be provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    // console.log(this.listeners, this.$root)
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      console.log(this['onInput'])
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} 
          is not implemented in ${name} Component`)
      }
      // $ realisation of this.$root.addEventListener(eventType, callback)
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {

  }
}

// Private method
// getMethodName(eventName)
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
