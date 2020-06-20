import {ExcelComponent} from '@core/ExcelComponent'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML() {
    return `
      <div class="row">
        <div class="row-info">

        </div>
        <div class="row-data">
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
          <div class="column">
            D
          </div>
          <div class="column">
            E
          </div>
          <div class="column">
            F
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row-info">
          1
        </div>
        <div class="row-data">
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
        </div>
      </div>

      <div class="row">
        <div class="row-info">
          2
        </div>
        <div class="row-data">
          <div class="cel" contenteditable>cell</div>
          <div class="cel selected" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
        </div>
      </div>

      <div class="row">
        <div class="row-info">
          3
        </div>
        <div class="row-data">
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
          <div class="cel" contenteditable>cell</div>
        </div>
      </div>
    `
  }
}
