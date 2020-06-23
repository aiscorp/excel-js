import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'
import {resizeHandler} from '@/components/tabel/table.resize'
import {isResize} from '@/components/tabel/table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  /* EVENT
  * ---- onMouseDown -----
  * */
  onMousedown(event) {
    if (isResize(event)) {
      resizeHandler(this.$root, event)
    }
  }


  toHTML() {
    return createTable()
  }
}
