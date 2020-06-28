import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {}, // [row:col]: data
  stylesState: {}, // [row:col]: data
  currentStyles: defaultStyles,
  currentText: ''
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) : defaultState
