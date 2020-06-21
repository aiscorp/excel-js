import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mousemove']
    })
  }

  onClick(event) {
    console.log(event.target)
  }

  onMousedown(event) {
    console.log(event.target)
  }

  onMousemove(event) {
    console.log('Offset:', event.offsetX, event.offsetY,
      'Delta:', event.movementX, event.movementY)
  }

  toHTML() {
    return createTable()
  }
}
