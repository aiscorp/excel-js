import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createRecordsTable} from '@/shared/dashboard.functions'
import {StateProcessor} from '@core/page/StateProcessor'
import {FireBaseStorageClient} from '@/storage/FireBaseStorageClient'

export class DashboardPage extends Page {
  constructor(param) {
    super(param)
    this.user = this.params || 'guest'

    this.storeSub = null
    this.processor = new StateProcessor(
      // new LocalStorageClient(tableId), 500)
      new FireBaseStorageClient('', this.user), 200)
  }

  async getRoot() {
    // get list of tables
    const state = await this.processor.get()
    console.log(state)

    const id = Date.now().toString(16)
    return $.create('div', 'dash-board').html(`
      <div class="dash-board__header">
        <h1>My Excel dash board</h1>
  
      </div>
      <div class="dash-board__new">
        <div class="dash-board__view">        
          <a href="#excel/${this.user}/${id}" class="dash-board__create">
            New <br/> Table...
          </a>
        </div>  
      </div>
      ${createRecordsTable(state, this.user)}  
    `)
  }

  afterRender() {
    return ''
  }

  destroy() {}
}
