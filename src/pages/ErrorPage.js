import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createRecordsTable} from '@/shared/dashboard.functions'

export class ErrorPage extends Page {
  getRoot() {
    return $.create('div', 'dash-board').html(`
      <div class="dash-board__header">
        <h1>Route params <code>'${this.params}'</code> are not valid</h1>  
      </div>
    `)
  }

  afterRender() { }

  init() { }

  destroy() { }
}
