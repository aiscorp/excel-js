import * as types from '@/redux/types'

export function rootReducer(state, action) {
  let prevState
  let type
  let id
  switch (action.type) {
    case types.TABLE_RESIZE:
      type = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[type] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [type]: prevState} // id:value

    case types.TABLE_TEXT_CHANGE:
      id = action.data.id.row + ':' + action.data.id.col
      prevState = state.cellState || {}
      prevState[id] = action.data.value
      return {...state, currentText: action.data.value, cellState: prevState}

    default:
      return state
  }
}
