import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'
import {resizeHandler} from '@/components/tabel/table.resize'
import {
  findByCoords, isCellClick,
   isResize, nextSelector
} from '@/components/tabel/table.functions'
import {TableSelection} from '@/components/tabel/TableSelection'
import {selectHandler} from '@/components/tabel/table.select'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
        ...options
    })
    this.unsubs = []
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selection
      .select(findByCoords(this.$root, {row: 1, col: 1}))

    const unsub = this.emitter.subscribe('formula:input', input => {
      this.selection.current.text(input)
      console.log('Table from Formula', input)
    })
    this.unsubs.push(unsub)
  }

  destroy() {
    super.destroy()
    this.unsubs.forEach(u => u())
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

  /* EVENT
   * ---- onKeyDown -----
   * */
  onKeydown(event) {
    const keys = [
      'Enter', 'Tab',
      'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const $nextCell = findByCoords(this.$root, nextSelector(key, this.selection.current.id()))
      this.selection.select($nextCell)
      console.log(key)
    }
  }

}


