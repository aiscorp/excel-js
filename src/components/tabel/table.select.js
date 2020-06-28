import {$} from '@core/dom'
import {isGroupSelection, matrix} from '@/components/tabel/table.functions'

export function selectHandler($root, event, selection) {
  const $target = $(event.target)

  // group selection
  if (event.shiftKey) {
    const $cells = matrix($target, selection.current)
      .map(aac => $root
        .find(`.cell[data-col="${aac.col}"][data-row="${aac.row}"]`))

    selection.selectGroup($cells)
    //
  } else {
    // single selection
    selection.select($(event.target))
  }

  // ---- onMouseUp ----
  document.onmouseup = e => {
    const $current = $(e.target)
    // deleting mouse events
    document.onmousemove = null
    document.onmouseup = null

    if (isGroupSelection($current, $target)) {
      const $cells = matrix($current, selection.current)
        .map(aac => $root
          .find(`.cell[data-col="${aac.col}"][data-row="${aac.row}"]`))

      selection.selectGroup($cells)
    }
  }
}
