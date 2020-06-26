import {storage} from '@core/utils'

const defaultState = {
  colState: {},
  rowState: {}
}

export const initialState = storage('excel-state') ?
  storage('excel-state') : defaultState
