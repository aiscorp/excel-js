import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/tabel/Table'
import {createStore} from '@core/createStore'
import {debounce, storage} from '@core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {ErrorPage} from '@/pages/ErrorPage'


export class ExcelPage extends Page {
  getRoot() {
    console.log(this.params)
    if (this.params && this.params.length > 8) {
      const params = this.params // ? this.params : Date.now().toString(16)
      const state = storage(storageName(params))
      const store = createStore(rootReducer, normalizeInitialState(state))

      const stateListener = debounce(state => {
        storage(storageName(params), state)
      }, 500)

      store.subscribe(stateListener)

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
    // console.log(this.excel instanceof ErrorPage)
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}

function storageName(param) {
  return 'excel:' + param
}
