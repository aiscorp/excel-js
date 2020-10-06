import {ErrorPage} from '@/pages/ErrorPage'
import {Page} from '@core/page/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/tabel/Table'
//
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {StateProcessor} from '@core/page/StateProcessor'
import {FireBaseStorageClient} from '@/storage/FireBaseStorageClient'
import {Auth} from '@core/auth/Auth'
//

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.user = this.params[1]
    this.tableId = this.params[2]
    this.auth = new Auth()
    this.storeSub = null
  }

  async getRoot() {
    if (this.params) {
      const isAuth = await this.auth.authorise()

      this.processor = new StateProcessor(
        new FireBaseStorageClient(this.auth, this.tableId), 1000)

      await this.processor.get()
        .then(data => this.state = data)

      const store = createStore(rootReducer, normalizeInitialState(this.state))
      console.log(this.state, store)
      this.storeSub = store.subscribe(this.processor.listen)

      this.excel = new Excel({
        components: [Header, Toolbar, Formula, Table],
        store
      })
    } else {
      this.excel = new ErrorPage(this.params)
    }

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}


