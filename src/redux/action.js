import * as types from '@/redux/types'

// tableResize action creator
export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data
  }
}

//
export function tableTextChange(value) {
  return {
    type: types.TABLE_TEXT_CHANGE,
    data: value
  }
}

//
export function tableStyleChange(data) {
  return {
    type: types.TABLE_STYLE_CHANGES,
    data
  }
}

// value, ids
export function tableStyleApply(data) {
  return {
    type: types.TABLE_STYLE_APPLY,
    data
  }
}

//
export function titleChange(value) {
  return {
    type: types.TITLE_CHANGE,
    data: value
  }
}

//
export function updateDate() {
  return {
    type: types.UPDATE_DATE
  }
}
