import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {}, // [row:col]: data
  stylesState: {}, // [row:col]: data
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) : defaultState
