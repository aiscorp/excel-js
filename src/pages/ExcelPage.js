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
import {LocalStorageClient} from '@/storage/LocalStorageClient'
import {FireBaseStorageClient} from '@/storage/FireBaseStorageClient'
//

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    const tableId = this.params

    this.storeSub = null
    this.processor = new StateProcessor(
      // new LocalStorageClient(tableId), 500)
      new FireBaseStorageClient(tableId), 200)
  }

  async getRoot() {
    if (this.params && this.params.length > 8) {

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


