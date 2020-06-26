import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'
import {resizeHandler} from '@/components/tabel/table.resize'
import {findByCoords, isCellClick, isResize, nextSelector
} from '@/components/tabel/table.functions'
import {TableSelection} from '@/components/tabel/TableSelection'
import {selectHandler} from '@/components/tabel/table.select'
import {TABLE_RESIZE} from '@/redux/types'
import * as actions from '@/redux/action'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selection
      .select(findByCoords(this.$root, {row: 1, col: 1}))
    this.$emit('table:textChange', this.selection.current.text())

    this.$on('formula:input', input => {
      this.selection.current.text(input)
      this.updateCellInStore()
    })

    this.$on('formula:done', key => {
      const $nextCell = findByCoords(this.$root,
        nextSelector(key, this.selection.current.id()))
      this.selectCell($nextCell)
      this.updateCellInStore()
    })

    // this.$subscribe(state => {
    //   console.log('TableState', state)
    // })
  }

  toHTML() {
    return createTable(this.store.getState())
  }

  /* EVENT
   * ---- onMouseDown -----
   * */
  onMousedown(event) {
    // Resize cols and rows
    if (isResize(event)) {
      this.resizeTable(event)
      //
      // Selection cells
    } else if (isCellClick(event)) {
      selectHandler(this.$root, event, this.selection)

      this.$emit('table:textChange', this.selection.current.text())

      this.updateCellInStore()
    }
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
      const $nextCell = findByCoords(this.$root,
        nextSelector(key, this.selection.current.id()))
      this.selectCell($nextCell)
    }
    this.updateCellInStore()
  }

  /* EVENT
   * ---- onKeyDown -----
   * */
  onInput(event) {
    // this.$emit('table:textChange', this.selection.current.text())
    this.updateCellInStore()
  }

  // functions helpers
  updateCellInStore() {
    this.$dispatch(actions.tableTextChange({
      id: this.selection.current.id(),
      value: this.selection.current.text()
    }))
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:textChange', $cell.text())
    this.$dispatch({type: 'table:textChange'})
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error:', e)
    }
  }
}


