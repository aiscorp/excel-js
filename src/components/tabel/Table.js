import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'
import {resizeHandler} from '@/components/tabel/table.resize'
import {isCellClick, isResize, matrix} from '@/components/tabel/table.functions'
import {TableSelection} from '@/components/tabel/TableSelection'
import {$} from '@core/dom'
import {selectHandler} from '@/components/tabel/table.select'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()


    const $cell = this.$root.find('.cell[data-col="5"][data-row="3"]')
    this.selection.select($cell)

    this.selection.selectByCoords(this.$root, 1, 1)
  }

  toHTML() {
    return createTable()
  }

  /* EVENT
   * ---- onMouseDown -----
   * */
  onMousedown(event) {
    // Resize cols and rows
    if (isResize(event)) {
      resizeHandler(this.$root, event)
      //
      // Selection cells
    } else if (isCellClick(event)) {
      selectHandler(this.$root, event, this.selection)
    }
    console.log(event)
  }
}
