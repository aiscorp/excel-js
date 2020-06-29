import {clone, storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {}, // [row:col]: data
  stylesState: {}, // [row:col]: data
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
  lastDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
  // lastDate: {}
})

// export const initialState = storage('excel-state') ?
//   normalize(storage('excel-state')) : defaultState

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
