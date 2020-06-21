import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }
  getRoot() {
    // $ from dom.js helps to make it shorter
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }


  render() {
    // alternative method insertAdjacentHTML()
    // afterbegin, afterend, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)

    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }
}
