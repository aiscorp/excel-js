import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'
import {resizeHandler} from '@/components/tabel/table.resize'
import {
  findByCoords, isCellClick, isResize, nextSelector, stateToStyle, styleToState
} from '@/components/tabel/table.functions'
import {TableSelection} from '@/components/tabel/TableSelection'
import {selectHandler} from '@/components/tabel/table.select'
import * as actions from '@/redux/action'
import {defaultStyles} from '@/constants'


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

    this.$on('toolbar:stateChange', state => {
      this.selection.applyStyles(stateToStyle(state))
      // !!! NEED TO Future refactor - 50/50%
      this.$dispatch(actions.tableStyleChange(state))
    })
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
      // !!!!!!!!!!  selectCell($cell) ISN'T WORKING HEAR - NEED TO CORRECT
      this.$emit('table:textChange', this.selection.current.text())
      //
      const state = styleToState(this.selection.current
        .getStyles(Object.keys(defaultStyles)))
      this.$dispatch(actions.tableStyleChange(state))
      //
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

  /*
   * functions helpers
   */
  updateCellInStore() {
    this.$dispatch(actions.tableTextChange({
      id: this.selection.current.id(),
      value: this.selection.current.text()
    }))
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:textChange', $cell.text())

    const state = styleToState($cell.getStyles(Object.keys(defaultStyles)))
    this.$dispatch(actions.tableStyleChange(state))
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


