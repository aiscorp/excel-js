import './scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/tabel/Table'
import {createStore} from '@core/createStore'
import {storage} from '@core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'

// const store = createStore(rootReducer, {
//   tableTitle: 'My new Table.nxl',
//   colState: {},
//   rowState: {}
// })
// const store = createStore(rootReducer, storage('excel-state'))
const store = createStore(rootReducer, initialState)

store.subscribe( state => {
  console.log('App State: ', state)
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
