import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createRecordsTable} from '@/shared/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const id = Date.now().toString(16)
    return $.create('div', 'dash-board').html(`
      <div class="dash-board__header">
        <h1>My Excel dash board</h1>
  
      </div>
      <div class="dash-board__new">
        <div class="dash-board__view">        
          <a href="#excel/${id}" class="dash-board__create">
            New <br/> Table...
          </a>
        </div>  
      </div>
      ${createRecordsTable()}  
    `)
  }

  afterRender() {
    return ''
  }

  destroy() {}
}
