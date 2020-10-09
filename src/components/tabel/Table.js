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
import {$} from '@core/dom'
import {parse} from '@core/parse'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'dblclick'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    // select first el
    this.selection
      .select(findByCoords(this.$root, {row: 1, col: 1}))
    this.$emit('table:textChange', this.selection.current)
    // select it on toolbar
    const state = styleToState(this.selection.current
      .getStyles(Object.keys(defaultStyles)))
    this.$dispatch(actions.tableStyleChange(state))


    // formula input
    this.$on('formula:input', input => {
      console.log('TABLE: formula:input: ', input)
      // parse formulas
      this.selection.current
        .attr('data-value', input)
        .text(parse(input))
      this.updateCellInStore()
    })

    this.$on('formula:done', key => {
      console.log('TABLE: formula:done: ', key)
      const $nextCell = findByCoords(this.$root,
        nextSelector(key, this.selection.current.id()))
      this.selectCell($nextCell)
      this.updateCellInStore()
    })

    this.$on('toolbar:stateChange', state => {
      console.log('TABLE: toolbar:stateChange: ', state)
      this.selection.applyStyles(stateToStyle(state))
      // ???
      this.$dispatch(actions.tableStyleChange(state))
      //
      this.$dispatch(actions.tableStyleApply({
        value: state,
        ids: this.selection.selectedIds
      }))
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
      this.$emit('table:textChange', this.selection.current)
      //
      const state = styleToState(this.selection.current
        .getStyles(Object.keys(defaultStyles)))
      this.$dispatch(actions.tableStyleChange(state))
      //
      this.updateCellInStore()
    }
  }

  onDblclick(event) {
    const $cell = $(event.target)

    $cell.attr('contenteditable') === 'true' ?
      $cell.attr('contenteditable', 'false') :
      $cell.attr('contenteditable', 'true')
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
    this.$emit('table:textChange', $cell)

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


