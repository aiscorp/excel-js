import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }
  getRoot() {
    // const $root = document.createElement('div')
    // $root.classList.add('excel')
    // $ from dom.js helps to make it shorter
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      // const $el = document.createElement('div')
      // $el.classList.add(Component.className)
      const $el = $.create('div', Component.className)

      const component = new Component($el)
      // $el.innerHTML = component.toHTML()
      $el.html(component.toHTML())
      $root.append($el)
      // $root.insertAdjacentHTML('beforeend', component.toHTML())
      // console.log(component.toHTML())
      return component
    })
    // console.log(this.components)
    return $root
  }


  render() {
    // Node method insertAdjacentHTML()
    // afterbegin, afterend, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)

    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }
}
