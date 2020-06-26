import './scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/tabel/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@core/utils'

// const store = createStore(rootReducer, {
//   tableTitle: 'My new Table.nxl',
//   colState: {},
//   rowState: {}
// })

const store = createStore(rootReducer, storage('excel-state'))

store.subscribe( state => {
  console.log('App State: ', state)
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
