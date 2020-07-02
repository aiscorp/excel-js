import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createLogin, createRecordsTable} from '@/shared/dashboard.functions'
import {StateProcessor} from '@core/page/StateProcessor'
import {FireBaseStorageClient} from '@/storage/FireBaseStorageClient'
import {authFireBase} from '@core/auth/authFireBase'

export class DashboardPage extends Page {
  constructor(param) {
    super(param)
    this.user = this.params || 'guest'
    this.auth = {}

    this.storeSub = null
    this.processor = new StateProcessor(
      // new LocalStorageClient(tableId), 500)
      new FireBaseStorageClient('', this.user), 200)
  }

  async getRoot() {
    // get list of tables
    const state = await this.processor.get()
    // console.log(state)

    // this.auth = await authFireBase('assiscorp@yandex.ru', '021263')
    //   .then(auth => {
    //     console.log(auth)
    //     this.auth = auth
    //   })

    await authFireBase('1aiscorp@yandex.ru', '021263')
      .then(auth => {
        console.log(auth)
        this.auth = auth
      })

    console.log(this.auth)

    const id = Date.now().toString(16)
    return $.create('div', 'dash-board').html(`
      <div class="dash-board__header">
        <h1>My Excel dash board</h1>        
        ${createLogin(this.auth)} 
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
