import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/tabel/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    })
  }

  onClick(event) {
    if (event.target.dataset.resize) {
      console.log('Resize finished', event.target.dataset.resize)
    }
  }

  onMouseup(event) {

    if (event.target.dataset.resize) {
      console.log('Resize finished', event.target.dataset.resize)
    }
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('Resize started', event.target.dataset.resize)
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const $type = event.target.dataset.resize
      const coords = $parent.getCoords()

      document.onmousemove = e => {
        if ($type === 'col') {
          const deltaX = e.pageX - coords.right
          $parent.$el.style.width = (coords.width + deltaX) + 'px'
        } else if ($type === 'row') {
          const deltaY = e.clientY - coords.bottom
          $parent.$el.style.height = (coords.height + deltaY) + 'px'
        }
      }

      document.onmouseup = e => {
        document.onmousemove = null
      }
    }
  }

  onMousemove(event) {
    // console.log('Offset:', event.offsetX, event.offsetY,
    //   'Delta:', event.movementX, event.movementY)
  }

  toHTML() {
    return createTable()
  }
}
