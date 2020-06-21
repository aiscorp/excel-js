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

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)


      document.onmousemove = e => {
        if ($type === 'col') {
          const deltaX = e.pageX - coords.right
          const value = coords.width + deltaX

          $parent.$el.style.width = value + 'px'
          // cells.forEach(element => element.style.width = value + 'px')
        } else if ($type === 'row') {
          const deltaY = e.clientY - coords.bottom
          const value = coords.height + deltaY

          $parent.$el.style.height = value + 'px'
        }
      }

      document.onmouseup = e => {
        document.onmousemove = null

        if ($type === 'col') {
          cells.forEach(element =>
            element.style.width = $parent.$el.style.width)
        } else if ($type === 'row') {

        }
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
