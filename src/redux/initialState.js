import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {}, // [row:col]: data
  currentStyles: defaultStyles,
  currentText: ''
}

export const initialState = storage('excel-state') ?
  storage('excel-state') : defaultState
