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
    this.processor = new StateProcessor(
      // new LocalStorageClient(tableId), 500)
      new FireBaseStorageClient(this.auth, this.tableId), 1000)
    this.storeSub = null
  }

  async getRoot() {
    if (this.params) {
      const state = await this.processor.get()

      const store = createStore(rootReducer, normalizeInitialState(state))
      console.log(state, store)
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


