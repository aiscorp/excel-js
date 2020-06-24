class Dom {
  constructor(selector) {
    // string
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  add(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  delete(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  // before: const $type = event.target.dataset.resize
  // after: const $type = $resizer.data.resize
  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  row() {
    return this.data.row
  }

  col() {
    return this.data.col
  }

  id() {
    return {
      row: this.data.row,
      col: this.data.col
    }
  }

  focus() {
    this.$el.focus()
    return this
  }

  // css(styles = {})
  // {
  //   height: '30px,
  //   width: '40px'
  // }
  // before: $parent.$el.style.width = value + 'px'
  // after: $parent.css({width: value + 'px'})
  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles [key]
    })


    // this.$el
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
