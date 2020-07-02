import {clone} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const init = 'null'

const defaultState = {
  colState: {init},
  rowState: {init},
  cellState: {init}, // [row:col]: data
  stylesState: {init}, // [row:col]: data
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
  lastDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  // colState: {},
  // rowState: {},
  // cellState: {},
  // stylesState: {},
  lastDate: '',
  currentStyles: defaultStyles,
  currentText: ''
})

// export const initialState = storage('excel-state') ?
//   normalize(storage('excel-state')) : defaultState

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
