import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:textChange', $cell => {
      this.$formula.text($cell.data.value)
       console.log('FORMULA: table:textChange: ', $cell)
      // this.$formula.text(text)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
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
