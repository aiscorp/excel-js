import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:textChange', text => {
      this.$formula.text(text)
    })
  }

  onInput(event) {
    // const input = event.target.textContent.trim()
    // this.$emit('formula:input', input)
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = [
      'Enter', 'Tab'
    ]

    const {key} = event

    if (keys.includes(key)) {
      event.preventDefault()

      this.$emit('formula:done', key)
    }
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" 
        contenteditable spellcheck="false"></div>    
    `
  }
}
