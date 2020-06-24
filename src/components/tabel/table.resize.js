import {$} from '@core/dom'

export function resizeHandler($root, event) {
  console.log('Resize started', event.target.dataset.resize)
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const type = $resizer.data.resize
  const parentCoords = $parent.getCoords()

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

  // ---- onMouseMove ----
  document.onmousemove = e => {
    // COLS
    if (type === 'col') {
      const resizerX = parentCoords.width + e.pageX - parentCoords.right
      $resizer.css({left: resizerX + 'px', opacity: 1})
      //
      // ROWS
    } else if (type === 'row') {
      const resizerY = parentCoords.height + e.clientY - parentCoords.bottom

      $resizer.css({top: resizerY + 'px', opacity: 1})
    }
  }

  // ---- onMouseUp ----
  document.onmouseup = e => {
    // deleting "onmousemove" event
    document.onmousemove = null
    document.onmouseup = null

    // for cols and rows resizing after mouseUp
    // COLS
    if (type === 'col') {
      const value = parentCoords.width + e.pageX - parentCoords.right

      $parent.css({width: value + 'px'})
      $resizer.css({left: '', opacity: ''})

      cells.forEach(element =>
        element.style.width = $parent.$el.style.width)
      //
      // ROWS
    } else if (type === 'row') {
      const value = parentCoords.height + e.clientY - parentCoords.bottom

      $parent.css({height: value + 'px'})
      $resizer.css({top: '', opacity: ''})
    }
  }
}
