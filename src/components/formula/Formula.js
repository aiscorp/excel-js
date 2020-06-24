import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options
    })
  }

  onInput(event) {
    const input = event.target.textContent.trim()
    this.emitter.emit('formula:input', input)
    // console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {

  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>    
    `
  }
}
