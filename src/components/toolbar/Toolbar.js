import {ExcelComponent} from '@core/ExcelComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click', 'dblclick'],
      ...options
    })
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      console.log($target.data.type, $target.data.action)
    }
  }

  onDblclick(event) {
    console.log('Double!')
  }

  toHTML() {
    return createToolbar()
  }
}
