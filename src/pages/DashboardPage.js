import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {
  createLogin, createRecordsTable,
  onLoginFormClick
} from '@/shared/dashboard.functions'
import {StateProcessor} from '@core/page/StateProcessor'
import {FireBaseStorageClient} from '@/storage/FireBaseStorageClient'
import {Auth} from '@core/auth/Auth'

export class DashboardPage extends Page {
  constructor(param) {
    super(param)
    this.auth = new Auth()
    this.storeSub = null
    //
    this.onLoginClick = onLoginFormClick.bind(this)
  }

  async getRoot() {
    // get list of tables
    const isAuth = await this.auth.authorise()

    if (isAuth) {
      // User has previous active authorisation in local storage
      this.processor = new StateProcessor(
        new FireBaseStorageClient(this.auth), 1000)
      await this.processor.get()
        .then(data => this.state = data)
      console.log('state', this.state)
    }

    this.user = await this.auth.getUser()
    this.newId = Date.now().toString(16)

    const newExcelHref = isAuth ?
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
      ${createRecordsTable(this.state, this.user)}  
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
