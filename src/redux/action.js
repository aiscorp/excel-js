import * as types from '@/redux/types'

// tableResize action creator
export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data
  }
}

// tableResize action creator
export function tableTextChange(data) {
  return {
    type: types.TABLE_TEXT_CHANGE,
    data
  }
}
