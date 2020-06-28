export class TableSelection {
  static className = 'selected'

  constructor(props) {
    // super(props)
    this.group = []
    this.current = null
  }

  // $el
  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  selectByCoords($root, row, col) {
    const $cell = $root.find(`.cell[data-col="${col}"][data-row="${row}"]`)
    this.select($cell)
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group

    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyles(styles) {
    this.group.forEach($el => $el.css(styles))
    this.current.focus()
  }
}
