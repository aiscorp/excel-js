import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {
  clickLogin,
  clickLogout,
  createLogin,
  createRecordsTable,
  onLoginFormClick,
  onLogOutClick
} from '@/shared/dashboard.functions'
import {StateProcessor} from '@core/page/StateProcessor'
import {FireBaseStorageClient} from '@/storage/FireBaseStorageClient'
import {Auth} from '@core/auth/Auth'

export class DashboardPage extends Page {
  constructor(param) {
    super(param)
    this.auth = new Auth()
    this.processor = new StateProcessor(
      new FireBaseStorageClient(this.auth), 1000)
    this.storeSub = null
    //
    this.user = ''
    this.newId = ''

    this.onLoginClick = onLoginFormClick.bind(this)
  }

  async getRoot() {
    // get list of tables
    const state = await this.processor.get()

    this.user = await this.auth.getUser()
    this.newId = Date.now().toString(16)

    console.warn('State and auth:', state, this.auth)


    const newExcelHref = await this.auth.authorise() ?
      '#excel/' + this.user + '/' + this.newId : '#'

    this.$root = $.create('div', 'dash-board').html(`
    <!--HEADER-->
      <div class="dash-board__header">
        <h1>My Excel dash board</h1>        
        ${createLogin(this.auth.auth)} 
      </div>
    <!--NEW Buttons-->  
      <div class="dash-board__new">
        <div class="dash-board__view">        
          <a href="${newExcelHref}" 
             class="dash-board__create">
            New <br/> Table...
          </a>
        </div>  
      </div>
    <!--RECORDS table-->  
      ${createRecordsTable(state, this.user)}  
    `)

    return this.$root
  }

  afterRender() {
    this.$login = this.$root.find('#login')
    this.$login.add('click', this.onLoginClick)
  }

  destroy() {
    this.$login.delete('click', this.onLoginClick)
  }
}
